// Example 3.30

#include <stdio.h>

double min(double x, double y) {
    return (x < y ? x : y);
}

int main() {
    int j = 3, k = 4;
    int i = min(j, k);

    double y = 3.0, z = 4.0;
    double x = min(y, z);

    printf("%d\n", i);
    printf("%f\n", x);
}
