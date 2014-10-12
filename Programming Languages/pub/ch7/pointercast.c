// gcc -o pointercast pointercast.c && ./pointercast

#include <stdio.h>

int main() {
  char *s="foo";
  int *i=(int *)s;
  printf("char alignment ok:              %x\n",s);
  printf("int  alignment ok:              %x\n",i);
  s++;
  i++;
  printf("char alignment ok:              %x\n",s);
  printf("int  alignment ok:              %x\n",i);
  i=(int *)s;
  printf("int  alignment may cause error: %x\n",i);
  return 0;
}
