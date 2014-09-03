/* Examples 7.86 and 8.87 */

#include <iostream>
using std::cout;
using std::endl;

int i = 3;
int *p = &i;
int *q;

void foo() { int n = 5;  p = &n; }
void bar() { int n = 7; }

int main() {
    cout << *p << endl;     // prints 3
    foo();
    bar();                  // may overwrite space where p points
    cout << *p << endl;     // undefined behavior: n is no longer live

    int *p = new int;
    *p = 3;
    cout << *p << endl;     // prints 3
    delete p;
    int *q = new int;
    *q = 5;                 // may overwrite space where p points
    cout << *p << endl;     // undefined behavior: *p has been reclaimed
}
