/* Example 7.121 */

typedef struct {
    int field1;
    int field2;
    int field3;
    int field4;
    int field5;
    int field6;
    int field7;
    int field8;
    int field9;
} my_struct;

typedef struct {
    int a;
    struct {
        int c;
        my_struct d[100];
    } b[10][10];
} messy;

int main() {
    messy x, y;
    double r = 1, s = 2, t = 3;
    double val, n;
    {
        my_struct *e = &x.b[2][4].d[10];
        my_struct *f = &x.b[2][5].d[10];
        e->field1 = f->field1;
        e->field3 = f->field3;
        e->field7 = f->field7;
    }
    {
        double d = (27 * r + 42 * s) / (t*t*t + r/s);
        val = (d ? n/d : 0);
    }
}
