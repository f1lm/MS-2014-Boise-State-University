// Example 3.16

#include <iostream>
using std::cout;

typedef int element;
static const int stack_size = 100;

class stack {
    element s[stack_size];
    int top;

    void error() { exit(1); }

public:
    stack() : top(0) { }

    void push(element e) {
        if (top == stack_size) error();
        else s[top++] = e;
    }

    bool empty() {
        return top == 0;
    }

    element pop() {
        if (empty()) error();
        else return s[--top];
    }

    bool deeper(stack other) {     // function declaration
        return (top > other.top);
    }
};

int main() {
    stack A;
    stack B;

    A.push(2);
    A.push(3);
    B.push(4);

    while (!A.empty() || !B.empty()) {
        if (A.deeper(B)) cout << A.pop() << "\n";
        else cout << B.pop() << "\n";
    }
    // prints 3 4 2
}
