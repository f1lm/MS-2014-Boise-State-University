/* Example 8.53 */

#include <setjmp.h>
#include <stdio.h>

int main() {
    jmp_buf buffer;
    if (!setjmp(buffer)) {
        /* protected code */
        printf("In protected code\n");
        longjmp(buffer, 1);
        printf("After longjmp\n");
    } else {
        /* handler */
        printf("In handler\n");
    }
}
