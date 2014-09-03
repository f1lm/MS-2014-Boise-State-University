// Examples 9.54 and 9.55

#include <iostream>
using std::cout;
using std::hex;

class gp_list_node {
    gp_list_node* prev;
    gp_list_node* next;
public:
    void* self;
    gp_list_node(void *s) : self(s) {
        prev = next = 0;
        cout << "called gp_list_node constructor\n";
    }
    int empty();
    void debug_print() {
        cout << "debug_print called for list_node 0x" << hex << self << "\n";
    };
    gp_list_node* predecessor();
    gp_list_node* successor();
    void insert_before(gp_list_node* new_node);
    void insert_after(gp_list_node* new_node);
    void remove();
};

class person {
    char *name;
public:
    person(char *n) : name(n) {
        cout << "called person constructor\n";
    }
    void debug_print() {
        cout << "debug_print called for person " << name << "\n";
    }
};

class person_interface : public person {
public:
    person_interface(char *n) : person(n) {
        cout << "called person_interface constructor\n";
    }
    virtual void debug_print_person() = 0;
    void debug_print() { debug_print_person(); }
        // overrides person::debug_print
};

class list_node_interface : public gp_list_node {
public:
    list_node_interface(void *s) : gp_list_node(s) {
        cout << "called list_node_interface constructor\n";
    }
    virtual void debug_print_list_node() = 0;
    void debug_print() { debug_print_list_node(); }
        // overrides gp_list_node::debug_print
};

class student : public person_interface, public list_node_interface {
    double gpa;
public:
    student(double g, char* n) :
            person_interface(n), list_node_interface(this), gpa(g) {
        cout << "called student constructor\n";
    }
    void debug_print_person();
    void debug_print_list_node();
    void debug_print() {
        debug_print_person();
        debug_print_list_node();
    }
};

void student::debug_print_person() {
    person::debug_print();
}

void student::debug_print_list_node() {
    gp_list_node::debug_print();
}

int main() {
    student s(3.5, "jane doe");
    cout << (void *) &s << "\n";
    s.debug_print();
}
