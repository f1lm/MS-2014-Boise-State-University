// C++ code from Examples 9.1 through 9.7

#include <iostream>
using std::cout;
using std::flush;

class list_err {
    public:
    const char *description;
    list_err(const char *s) {description = s;}
};

class list_node {
    list_node* prev;
    list_node* next;
    list_node* head_node;
public:
    int val;                                // the actual data in a node
    list_node() {                           // constructor
        prev = next = head_node = this;     // point to self
        val = 0;                            // default value
    }
    list_node* predecessor() {
        if (prev == this || prev == head_node) return 0;
        return prev;
    }
    list_node* successor() {
        if (next == this || next == head_node) return 0;
        return next;
    }
    int singleton() {
        return (prev == this);
    }
    void insert_before(list_node* new_node) {
        if (!new_node->singleton())
            throw new list_err("attempt to insert node already on list");
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
        prev = next = head_node = this;     // point to self
    }
    ~list_node() {                          // destructor
        if (!singleton())
            throw new list_err("attempt to delete node still on list");
    }
};

class list {
    list_node header;
public:
    // no explicit constructor required;
    // implicit construction of 'header' suffices
    int empty() {
        return header.singleton();
    }
    list_node* head() {
        return header.successor();
    }
    void append(list_node *new_node) {
        header.insert_before(new_node);
    }
    ~list() {                  // destructor
        if (!header.singleton())
            throw new list_err("attempt to delete non-empty list");
    }
};

class queue : public list {                 // derive from list
public:
    // no specialized constructor or destructor required
    void enqueue(list_node* new_node) {
        append(new_node);
    }
    list_node* dequeue() {
        if (empty())
            throw new list_err("attempt to dequeue from empty queue");
        list_node* p = head();
        p->remove();
        return p;
    }
};

void test() {
    list my_list;
    list_node *p;

    for (int i = 0; i < 4; i++) {
        p = new list_node();
        p->val = i;
        my_list.append(p);
    }

    p = my_list.head();
    for (int i = 0; i < 4; i++) {
        cout << p << ' ' << p->val << ' ' << p->successor() << '\n';
        p = p->successor();
    }

    p = my_list.head();
    while (p) {
        cout << p->val << '\n';
        list_node *q = p->successor();
        p->remove();
        delete p;
        p = q;
    }

    queue Q;

    for (int i = 0; i < 4; i++) {
        p = new list_node();
        p->val = i;
        Q.enqueue(p);
    }

    cout << "queue:\n";
    while (1) {
        p = Q.dequeue();
        cout << p->val << '\n' << flush;
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
