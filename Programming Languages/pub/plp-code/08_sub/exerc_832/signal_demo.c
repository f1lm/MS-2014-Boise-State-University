/* Exercise 8.32 (Figure 8.8) */
/* with gcc, must be compiled -std=c99 */

#include <signal.h>
#include <stdio.h>
#include <string.h>

char* days[7] = {"Sunday", "Monday", "Tuesday",
                "Wednesday", "Thursday", "Friday", "Saturday"};
char today[10];

void handler(int n) {
    printf(" %s\n", today);
}

int main() {
    signal(SIGTSTP, handler);
    for(int n = 0; ; n++) {
        strcpy(today, days[n%7]);
    }
}
