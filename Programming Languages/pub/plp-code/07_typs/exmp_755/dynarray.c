/* Example 7.55 (Figure 7.7) */
/* Must be compiled with gcc -c -std=c99 */

void foo(int size) {
    double M[size][size];
    // ...
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            M[i][j] = i * j;
        }
    }
}
