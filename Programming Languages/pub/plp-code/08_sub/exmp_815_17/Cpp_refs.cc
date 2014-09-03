// Examples 8.15 - 8.17

#include <iostream>
using std::cout;
using std::endl;

void swap(int &a, int &b) { int t = a; a = b; b = t; }

int main() {
    int i;
    int &j = i;

    i = 2;
    j = 3;
    cout << i;          // prints 3

    cout << endl;

    int a = 1, b = 2, c = 3;
    cout << a << b << c;
    cout << endl;
    ((cout.operator<<(a)).operator<<(b)).operator<<(c);
    cout << endl;
}
