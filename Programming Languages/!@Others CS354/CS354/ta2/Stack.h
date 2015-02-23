
#ifndef __STACK_H
#define __STACK_H

#include "Element.h"

#define MAX_STACK_SIZE 10000

typedef struct stack  Stack;
typedef struct stack * StackPtr;

struct stack {
	ElementPtr *elements;
	int size;
	int maxSize;
};

StackPtr createStack(int stackSize);
void push(StackPtr s, ElementPtr e);
ElementPtr pop(StackPtr p);
char *toString(StackPtr p);
void error();	/*Not implemented in Figure 3.6.*/

#endif /* __STACK_H */
