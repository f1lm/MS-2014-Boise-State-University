
#include "Stack.h"

//This quick testing will create
int main() {
	StackPtr s = createStack(100);
	char *d = "Some random data.";
	ElementPtr e1 = createElement((void*)d);
	push(s,e1);
	printf("%s",toString(s));
	e1 = pop(s);
	printf("%s",toString(s));
	return 0;
}
