// Examples 9.56 and 9.57

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
};

class student : public virtual person, public gp_list_node {
    double gpa;
public:
    student(double g, char* n) :
            person(n), gp_list_node(this), gpa(g) {
        cout << "called student constructor\n";
    }
};

enum rank_t {asst, assoc, full};

class professor : public virtual person, public gp_list_node {
    rank_t rank;
public:
    professor(rank_t r, char* n) :
            person(n), gp_list_node(this), rank(r) {
        cout << "called professor constructor\n";
    }
};

class student_prof : public student, public professor {
public:
    student_prof(double g, rank_t r, char* n) :
            person(n), student(g, n), professor(r, n) {
            // student and professor constructors will NOT call person
            // constructor
        cout << "called student_prof constructor\n";
    }
};

int main() {
    student_prof sp(3.5, assoc, "jane doe");
}
