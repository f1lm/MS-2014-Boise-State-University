// Example 9.30

#include <iostream>
using std::cout;
#include <string.h>

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

class name_list_node : public gp_list_node {
public:
    char *name;
    name_list_node() {
        name = 0;
    }
    name_list_node(const char *n) {
        name = new char[strlen(n)+1];
        strcpy(name, n);
    }
    ~name_list_node() {
        if (name != 0) {
            cout << "deleting " << name << "\n";
            delete[] name;
        }
    }
};

void test() {
    list L;
    name_list_node *p;

    p = new name_list_node("one");
    L.append(p);
    p = new name_list_node("two");
    L.append(p);
    p = new name_list_node("three");
    L.append(p);
    p = new name_list_node("four");
    L.append(p);

    p = (name_list_node*) (L.head());
    for (int i = 0; i < 4; i++) {
        cout << p << ' ' << p->name << ' ' << p->successor() << '\n';
        p = (name_list_node*) (p->successor());
            // can't use dynamic_cast because list_node has no virtual methods
    }

    p = (name_list_node*) L.head();
    while (p) {
        cout << p->name << '\n';
        name_list_node *q = (name_list_node*) p->successor();
        p->remove();
        delete p;
        p = q;
    }
}

int main() {
    try {
        test();
    } catch(list_err* e) {
        cout << e->description << '\n';
    }
}
