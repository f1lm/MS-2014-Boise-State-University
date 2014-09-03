// gcc -E -o macro.i macro.c

#define ALLOC(t,v)	  \
  t v=malloc(sizeof(*v)); \
  if (!v) ERR("malloc() failed")

typedef struct {
  int i;
  double d;
} *foo;

int main() {
  ALLOC(Foo,foo);
}
