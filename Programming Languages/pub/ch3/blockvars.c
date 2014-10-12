// gcc -o blockvars -Wall blockvars.c && ./blockvars

int main() {
  // do some stuff
  {
    int a[1000];
    a[500]=a[501]=123;
  }
  // do some stuff
  {
    double a[1000];
    a[500]=a[501]=1.23;
  }
  return 0;
}
