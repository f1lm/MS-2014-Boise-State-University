// C++ sum program

#include <iostream>

using namespace std;

static int sum(int seq[]) {
  int s=0;
  for (int i=0; i<sizeof(seq); i++)
    s+=seq[i];
  return s;
}

int main() {
  int seq[]={5,6,1,8,3,7};
  cout << sum(seq) << endl;
  return 0;
}

