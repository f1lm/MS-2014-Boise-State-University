/* Examples 12.7, 12.8, and 12.11 */

/* compile with gcc -fopenmp -std=c99 OpenMP.c */

#include <stdio.h>

int main() {
    #pragma omp sections
    {
    #   pragma omp section
        { printf("thread 1 here\n"); }
    #   pragma omp section
        { printf("thread 2 here\n"); }
    }

    printf("\n");

    #pragma omp parallel for
    for (int i = 0; i < 3; i++) {
        printf("thread %d here\n", i);
    }

    printf("\n");

    static const int N = 100;
    double A[N];
    for (int i = 0; i < N; i++) {
        A[i] = (double) i;
    }
    double sum = 0;
    #pragma omp parallel for schedule(static) \
        default(shared) reduction(+:sum)
    for (int i = 0; i < N; i++) {
        sum += A[i];
    }
    printf("parallel sum: %f\n", sum);          /* 4950.0 */
}
