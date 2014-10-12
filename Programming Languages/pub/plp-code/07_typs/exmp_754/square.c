/* Example 7.54 (Figure 7.5) */
/* Must be compiled with gcc -std=c99 */

#include <stdio.h>

void square(int n, double M[n][n]) {
    double T[n][n];
    for (int i = 0; i < n; i++) {           // compute product into T
        for (int j = 0; j < n; j++) {
            double s = 0;
            for (int k = 0; k < n; k++) {
                s += M[i][k] * M[k][j];
            }
            T[i][j] = s;
        }
    }
    for (int i = 0; i < n; i++) {           // copy back into M
        for (int j = 0; j < n; j++) {
            M[i][j] = T[i][j];
        }
    }
}

double A[5][5];

int main() {
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            A[i][j] = i+j;
        }
    }

    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            printf("\t%3.1f", A[i][j]);
        }
        printf("\n");
    }
    printf("\n");

    square(5, A);

    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            printf("\t%3.1f", A[i][j]);
        }
        printf("\n");
    }
}
