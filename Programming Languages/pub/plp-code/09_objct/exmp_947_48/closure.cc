// Examples 9.47 and 9.48 (Figure 9.5)

#include <iostream>
using std::cout;

typedef void (*F_INT)(int);
    // F_INT is a type: pointer to function from int to void
void p(int a) {
    cout << "p called with " << a << "\n";
}

void q(F_INT f) {
    f(3);
}

void use_function_pointer() {
    q(&p);
}

//--------------------------

class foo {
    public:
    virtual void f(int a) = 0;
};

class bar : public foo {
public:
    virtual void f(int a) {
        cout << "bar::f called with " << a << "\n";
    }
} my_obj;

void q(foo& obj) {
    obj.f(3);
}

void use_closure_object() {
    q(my_obj);
}

//--------------------------

typedef int de_time;
de_time now() { return 3; /* placeholder */ }

class fn_call {
public:
    virtual void trigger() = 0;
};

void schedule_at(fn_call& fc, de_time t) {
    // the following would occur sometime in the future in a real
    // discrete event system:
    fc.trigger();
}

void foo(int a, double b, char c) {
    cout << "call to foo: " << a << " " << b << " '" << c << "'\n";
}

class call_foo : public fn_call {
    int arg1;
    double arg2;
    char arg3;
    void (*ptr)(int, double, char);
public:
    call_foo(int a, double b, char c) :
            arg1(a), arg2(b), arg3(c) {
        // member initialization is all that is required
    }
    void trigger() {
        foo(arg1, arg2, arg3);
    }
};

int main() {
    use_function_pointer();
    use_closure_object();

    de_time delay = 3;
    
    call_foo cf(3, 3.14, 'x');         // declaration/constructor call
    schedule_at(cf, now() + delay);
        // at some point in the future, the discrete event system
        // will call cf.trigger(), which will cause a call to
        // foo(3, 3.14, 'x')
}
