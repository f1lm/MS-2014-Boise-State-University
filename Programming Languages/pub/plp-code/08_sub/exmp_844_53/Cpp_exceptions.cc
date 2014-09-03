// C++ code from Section 8.5 (Examples 8.44 - 8.48)

#include <iostream>
using std::cout;
using std::endl;
#include <string>
using std::string;
#include <exception>        // contains standard exception class
    // Nothing in the language requires that things you throw be derived
    // from this class, but it's common to make them so.
using std::exception;

bool something_unexpected;

class my_exception : public exception { };

void foo() {
    if (something_unexpected) {
        throw my_exception();
    }
}

void bar() {
    try {
        // ...
        if (something_unexpected)
            throw my_exception();
        cout << "everything's ok\n";
    } catch (my_exception) {
        cout << "oops\n";
    }
}

typedef string item;

// In the following two class declarations, the throw() clauses on the
// constructor and destructor declarations assure the compiler that
// those methods do not throw anything.  Similar declarations appear on
// the constructor and destructor of class exception.  If they are left
// off here, the compiler complains about the overriding methods having
// weaker promises than the originals.

class duplicate_in_set : public exception {
public:
    item dup;       // element that was inserted twice
    duplicate_in_set(string s) throw() : dup(s) { }
    virtual ~duplicate_in_set() throw() { }
};
class io_error : public exception {
public:
    string description;
    io_error(string s) throw() : description(s) { }
    virtual ~io_error() throw() { }
};
class end_of_file : public io_error {
public:
    end_of_file() : io_error("end of file") { }
};

void throw_dis() {
    string d = "duplicate in set\n";
    throw duplicate_in_set(d);
}

void do_io(int e) {
    switch(e) {
        case 1 :
            throw end_of_file();
            break;
        case 2 :
            throw io_error("no response from server");
            break;
        case 3 :
            throw exception();
            break;
    }
}

int main() {
    something_unexpected = false;
    bar();
    something_unexpected = true;
    bar();

    for (int b = 0; b <= 1; b++) {
        try {
            something_unexpected = b;
            foo();
            cout << "everything's ok\n";
        } catch (my_exception) {
            cout << "oops\n";
        }
    }

    try {
        throw_dis();
    } catch (duplicate_in_set e) {
        cout << e.dup;
    }

    for (int i = 1; i <= 3; i++) {
        try {                   // try to read from file
            // potentially complicated sequence of operations
            // involving many calls to stream I/O routines
            do_io(i);
            cout << "everything's ok\n";
        } catch(end_of_file) {
            cout << "caught end_of_file\n";
        } catch(io_error e) {
            // handler for any io_error other than end_of_file
            cout << "caught io_error: " << e.description << endl;
        } catch(...) {
            // handler for any exception not previously named
            // (in this case, the triple-dot ellipsis is a valid C++ token;
            // it does not indicate missing code)
            cout << "caught something else\n";
        }
    }
}
