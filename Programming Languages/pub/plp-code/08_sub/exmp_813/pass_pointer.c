/* Example 8.13 */

#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int main() {
    int v1 = 2;
    int v2 = 3;
    printf("%d %d\n", v1, v2);
    swap(&v1, &v2);
    printf("%d %d\n", v1, v2);
}
