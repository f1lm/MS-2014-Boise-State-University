
#include "Stack.h"

StackPtr createStack(int stackSize) {
	if(stackSize <= 0) {
		stackSize = MAX_STACK_SIZE;
	}
	ElementPtr els[stackSize];
	StackPtr s = (StackPtr)malloc(sizeof(Stack));
	s->maxSize = stackSize;
	s->elements = els;
	s->size = 0;
	return s;
}

void push(StackPtr s, ElementPtr e) {
	if(s == NULL || e == NULL) return;
	s->elements[s->size] = e;
	s->size++;
	printf("Stack size =%d.\n",s->size);
}

ElementPtr pop(StackPtr s) {
	if(s == NULL) return NULL;
	ElementPtr e = s->elements[s->size];
	s->elements[s->size] = NULL;
	s->size--;
	printf("Stack size =%d.\n",s->size);
	return e;
}

char *toString(StackPtr s) {
	if(s == NULL) return NULL;
	char *result = (char*)malloc(sizeof(char) * 10000);	//alloc space for a very large to string.
	int i = s->size;
	while(i > 0) {
		printf("Stack size =%d and i =%d.\n",s->size,i);
		strcat(result,((char *)s->elements[i-1]->data));
		strcat(result,"\n");
		i--;
	}
	return result;
}

void error() {/*Do nothing because not implemented in Figure 3.6*/}
