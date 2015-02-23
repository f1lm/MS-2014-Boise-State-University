
#include "Element.h"

ElementPtr createElement(void *d) {
	if(d == NULL) {
		return NULL;
	}
	ElementPtr e = (ElementPtr)malloc(sizeof(Element));
	e->data = d;
	return e;
}
