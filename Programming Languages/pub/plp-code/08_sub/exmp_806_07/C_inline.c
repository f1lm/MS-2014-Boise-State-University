/* Examples 8.6 and 8.7 */

#include <stdio.h>
#include <stdlib.h>

#define MAX(a,b) ((a) > (b) ? (a) : (b))

inline int max(int a, int b) { return a > b ? a : b; }

typedef long domain_t;
typedef short range_t;
typedef struct bucket {
    domain_t key;
    range_t val;
    struct bucket *next;
} bucket;

#define ERROR -1

range_t bucket_contents(bucket *b, domain_t x)
{
    if (b->key == x)
        return b->val;
    else if (b->next == 0)
        return ERROR;
    else
        return bucket_contents(b->next, x);
}

inline range_t fast_bucket_contents(bucket *b, domain_t x)
{
    if (b->key == x)
        return b->val;
    else if (b->next == 0)
        return ERROR;
    else
        return bucket_contents(b->next, x);
}

int main() {
    {
        int x = 10;
        int y = 20;

        printf("%d\n", max(x++, y++));
        printf("%d %d\n", x, y);

        printf("%d\n", MAX(x++, y++));
        printf("%d %d\n", x, y);
    }
    {
        bucket *p = (bucket *) malloc(sizeof(bucket));
        p->key = 12345;
        p->val = 10;
        p->next = (bucket *) malloc(sizeof(bucket));
        p->next->key = 23456;
        p->next->val = 20;
        p->next->next = 0;

        printf("%d\n", fast_bucket_contents(p, 23456));
        printf("%d\n", fast_bucket_contents(p, 34567));
    }
}
