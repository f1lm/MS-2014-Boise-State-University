// gcc -g -o days2 days2.c && ./days2

#include <stdio.h>
#include <string.h>

int main() {
  char *days[]= {
  // 0123456789
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  };
  printf("sizeof(days)=%d\n",sizeof(days));
  printf("sizeof(days[2])=%d\n",sizeof(days[2]));
  printf("strlen(days[2])=%d\n",strlen(days[2]));
  printf("days[2][3]=%c\n",days[2][3]); /* s in tuesday */
  return 0;
}
