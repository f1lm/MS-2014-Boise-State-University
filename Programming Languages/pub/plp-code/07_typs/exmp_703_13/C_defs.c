/* C code from Section 7.1 (Examples 7.3 through 7.13) */

#include <stdio.h>

enum weekday {sun, mon, tue, wed, thu, fri, sat};

typedef int weekday2;
const weekday2 sun2 = 0, mon2 = 1, tue2 = 2,
              wed22 = 3, thu2 = 4, fri2 = 5, sat2 = 6;

/* The (insignificant) difference between these is that in the former
    'weekday' is an enum tag; in the latter it's a type name. */

enum mips_special_regs {gp = 28, fp = 30, sp = 29, ra = 31};

typedef int symbol_table_index;

symbol_table_index insert_in_symbol_table(int key) {
    return 3;       /* placeholder */
}

int main() {
    int foo = 1, bar = 2;
    symbol_table_index foo_index = insert_in_symbol_table(foo);

    /* or, if I don't need the return value: */
    (void) insert_in_symbol_table(bar);
        /* cast is optional; implied if omitted */

    printf("%d %d %d\n", mon, mon2, fp);
}
