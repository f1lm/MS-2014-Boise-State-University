// Examples 9.44 and 9.45

#include <iostream>
using std::cout;

class list_err {
    public:
    const char *description;
    list_err(const char *s) {description = s;}
};

template<class V>
class list_node {
    list_node<V>* prev;
    list_node<V>* next;
    list_node<V>* head_node;
public:
    V val;
    list_node() : prev(this), next(this), head_node(this) {
    }
    list_node<V>* predecessor() {
        if (prev == this || prev == head_node) return 0;
        return prev;
    }
    list_node<V>* successor() {
        if (next == this || next == head_node) return 0;
        return next;
    }
    int singleton() {
        return (prev == this);
    }
    void insert_before(list_node<V>* new_node) {
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
        prev = next = head_node = this;     // point to self
    }
    ~list_node() {                          // destructor
        if (!singleton())
            throw new list_err("attempt to delete node still on list");
    }
};

template<class V>
class list {
    list_node<V> header;
public:
    // no explicit constructor required
    int empty() {
        return (header.singleton());
    }
    list_node<V>* head() {
        return header.successor();
    }
    void append(list_node<V> *new_node) {
        header.insert_before(new_node);
    }
    ~list() {                               // destructor
        if (!header.singleton())
            throw new list_err("attempt to delete non-empty list");
    }
};

typedef list_node<int> int_list_node;
typedef list<int> int_list;

void test() {
    int_list numbers;
    int_list_node *p;

    for (int i = 0; i < 4; i++) {
        p = new int_list_node();
        p->val = i;
        numbers.append(p);
    }

    p = (int_list_node*) (numbers.head());
    for (int i = 0; i < 4; i++) {
        cout << p << ' ' << p->val << ' ' << p->successor() << '\n';
        p = p->successor();                 // no cast required!
    }

    p = (int_list_node*) numbers.head();
    while (p) {
        cout << p->val << '\n';
        int_list_node *q = p->successor();  // no cast required!
        p->remove();
        delete p;
        p = q;
    }
}

int main() {
    try {
        test();
    } catch (list_err* e) {
        cout << e->description << '\n';
    }
}
