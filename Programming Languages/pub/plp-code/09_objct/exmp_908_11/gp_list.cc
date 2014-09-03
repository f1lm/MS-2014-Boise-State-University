// C++ code from Examples 9.8 through 9.11

#include <iostream>
using std::cout;
using std::flush;

class list_err {
    public:
    const char *description;
    list_err(const char *s) {description = s;}
};

class gp_list_node {
    gp_list_node* prev;
    gp_list_node* next;
    gp_list_node* head_node;
public:
    gp_list_node() : prev(this), next(this), head_node(this) {
    }
    gp_list_node* predecessor() {
        if (prev == this || prev == head_node) return 0;
        return prev;
    }
    gp_list_node* successor() {
        if (next == this || next == head_node) return 0;
        return next;
    }
    bool singleton() {
        return (prev == this);
    }
    void insert_before(gp_list_node* new_node) {
        if (!new_node->singleton()) {
            throw new list_err("attempt to insert node already on list");
        }
        prev->next = new_node;
        new_node->prev = prev;
        new_node->next = this;
        prev = new_node;
        new_node->head_node = head_node;
    }
    void remove() {
        if (singleton())
            throw new list_err("attempt to remove node not currently on list");
        prev->next = next;
        next->prev = prev;
        prev = next = head_node = this;         // point to self
    }
    ~gp_list_node() {                           // destructor
        if (!singleton())
            throw new list_err("attempt to delete node still on list");
    }
};

class list {
    gp_list_node head_node;
public:
    // no explicit constructor required
    int empty() {
        return head_node.singleton();
    }
    gp_list_node* head() {
        return head_node.successor();
    }
    void append(gp_list_node *new_node) {
        head_node.insert_before(new_node);
    }
    ~list() {                           // destructor
        if (!head_node.singleton())
            throw new list_err("attempt to delete non-empty list");
    }
};

class queue : private list {            // derive from list
public:
    // no specialized constructor or destructor required
    using list::empty;
    using list::head;
    void enqueue(gp_list_node* new_node) {
        append(new_node);
    }
    gp_list_node* dequeue() {
        if (empty())
            throw new list_err("attempt to dequeue from empty queue");
        gp_list_node* p = head();
        p->remove();
        return p;
    }
};

class int_list_node : public gp_list_node {
public:
    int val;                // the actual data in a node
    int_list_node() {
        val = 0;
    }
    int_list_node(int v) {
        val = v;
    }
//  // complete rewrite:
//  void remove() {
//      if (!singleton()) {
//          prev->next = next;
//          next->prev = prev;
//          prev = next = head_node = this;
//      }
//  }
    // use existing but catch error:
    void remove() {
        try {
            gp_list_node::remove();
        } catch(list_err*) {
            ;   // do nothing
        }
    }
    int_list_node* predecessor() {
        return (int_list_node*) gp_list_node::predecessor();
    }
    int_list_node* successor() {
        return (int_list_node*) gp_list_node::successor();
    }
};

void test() {
    list L;
    int_list_node *p;

    for (int i = 0; i < 4; i++) {
        p = new int_list_node(i);
        L.append(p);
    }

    p = (int_list_node*) (L.head());
    for (int i = 0; i < 4; i++) {
        cout << p << ' ' << p->val << ' ' << p->successor() << '\n';
        p = (int_list_node*) (p->successor());
    }

    p = (int_list_node*) L.head();
    while (p) {
        cout << p->val << '\n';
        int_list_node *q = (int_list_node*) p->successor();
        p->remove();
        delete p;
        p = q;
    }

    queue Q;

    for (int i = 0; i < 4; i++) {
        p = new int_list_node(i);
        Q.enqueue(p);
    }

    cout << "queue:\n";
    while (1) {
        p = (int_list_node*) Q.dequeue();
        cout << p->val << ' ' << Q.empty() << '\n' << flush;
        delete p;
    }
}

int main() {
    try {
        test();
    } catch(list_err* e) {
        cout << e->description << '\n';
    }
}
