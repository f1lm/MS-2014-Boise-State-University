// Example 3.29

#include <iostream>
using std::cout;

struct complex {
    double real, imaginary;
    complex(double r, double i) : real(r), imaginary(i) { }
    complex operator+(complex other) {
        return complex(real + other.real, imaginary + other.imaginary);
    }
};

void print_num(complex c) {
    cout << "(" << c.real << ", " << c.imaginary << ")\n";
}

int main() {
    complex A(1.0, 2.0);
    complex B(3.0, 4.0);

    complex C = A + B;
    print_num(C);
}
