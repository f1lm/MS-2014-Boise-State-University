// Exercise 8.24

#include <list>
using std::list;

class foo {
    int a;  // placeholder
};
class bar : public foo {
    int b;  // placeholder
};

static void print_all(list<foo*> &L) {
    ;       // placeholder
}

int main() {
    list<foo*> LF;
    list<bar*> LB;

    print_all(LF);        // works fine
    print_all(LB);        // static semantic error
}
