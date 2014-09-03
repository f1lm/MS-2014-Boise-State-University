// Example 3.8

class A
{
    const int N = 10;

    void foo() {
        const int M = N;
            // static semantic error
        const int N = 20;
            // gmcs complains here: "cannot be declared in this scope
            // because it would give a different meaning to N, which is
            // already used in a parent or current scope to denote
            // something else"
    }
}
