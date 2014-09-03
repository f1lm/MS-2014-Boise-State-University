/* Example 6.34 */

#include <stdlib.h>

typedef struct list_node {
    int key;
    struct list_node *next;
} list_node;

int main() {

    int val;
    list_node *my_list = (list_node *) malloc(sizeof(list_node));
    list_node *p;

    my_list->key = 1;
    my_list->next = (list_node *) malloc(sizeof(list_node));
    my_list->next->key = 2;
    my_list->next->next = 0;

    p = my_list;
    val = 2;
    while (p && p->key != val) 
        p = p->next;                        /* no problem */

    p = my_list;
    while ((p != 0) & (p->key != val))      /* note use of bitwise & */
        p = p->next;                        /* crashes if run */
}
