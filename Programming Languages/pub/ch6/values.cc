// g++ -o values values.cc

#include <iostream>

using namespace std;

class Foo {
public: int i;
};

void func(Foo f1, Foo& f2, Foo* f3) {
  f1.i=7;
  f2.i=8;
  f3->i=9;			// (*f3).i=9;
}

int main() {
  Foo f1; f1.i=1;
  Foo f0; f0.i=2; Foo& f2=f0;
  Foo* f3=new Foo; f3->i=3;
  cout << "f1=" << f1.i << " f2=" << f2.i << " f3=" << f3->i << endl;
  func(f1,f2,f3);
  cout << "f1=" << f1.i << " f2=" << f2.i << " f3=" << f3->i << endl;
  return 0;
}
