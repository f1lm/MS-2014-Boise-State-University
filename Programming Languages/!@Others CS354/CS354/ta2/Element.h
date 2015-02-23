
#ifndef __ELEMENT_H
#define __ELEMENT_H

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

typedef struct element  Element;
typedef struct element * ElementPtr;

struct element {
	void *data;
};

ElementPtr createElement(void *data);

#endif /* __ELEMENT_H */
