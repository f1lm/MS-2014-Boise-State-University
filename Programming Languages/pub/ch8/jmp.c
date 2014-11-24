// gcc -Wall -o jmp jmp.c && ./jmp 123

#include <stdio.h>
#include <setjmp.h>

static jmp_buf env;		// setjmp/longjmp

static void foo(int i) {
  if (i<2)
    longjmp(env,1);
  // much more code
  printf("foo() done\n");
}

int main(int argc, char *argv[]) {
  if (!setjmp(env)) {
    foo(argc);
    // much more code
    printf("ok\n");
  } else {
    printf("not ok\n");
  }
  return 0;  
}
