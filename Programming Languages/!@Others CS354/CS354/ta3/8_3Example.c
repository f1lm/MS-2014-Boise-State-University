#include <stdio.h>

void f1(int x, int y, int z) {}

int f2(int x){
	printf("argument=%d\n", x);
	return 0;
}

int main() {
	f1(f2(1), f2(2), f2(3));
	return 0;
}
