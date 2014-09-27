# 1 "macro.c"
# 1 "<built-in>"
# 1 "<command-line>"
# 1 "/usr/include/stdc-predef.h" 1 3 4
# 1 "<command-line>" 2
# 1 "macro.c"






typedef struct {
  int i;
  double d;
} *Foo;

int main() {
  Foo foo=malloc(sizeof(*foo)); if (!foo) ERR("malloc() failed");
}
