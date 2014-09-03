// gcc -o label label.c

#include <stdio.h>

int label() {
  static int n=0;
  return ++n;
}

int main() {
  printf("label()=%d\n",label());
  printf("label()=%d\n",label());
  return 0;
}
