// Example 8.32 (Figure 8.4)
// NB: this code should check for overflow and underflow

#include <iostream>
using std::cout;

template<class item, int max_items = 100>
class queue {
    item items[max_items];
    int next_free;
    int next_full;
public:
    queue () {
        next_free = next_full = 0;      // initialization
    }
    void enqueue (item it) {
        items[next_free] = it;
        next_free = (next_free + 1) % max_items;
    }
    item dequeue () {
        item rtn = items[next_full];
        next_full = (next_full + 1) % max_items;
        return rtn;
    }
};

typedef struct {
    int foo;
} process;

queue<process, 10> ready_list;
queue<int, 50> int_queue;

main()
{
    process P;
    int n = 100;

    // queue<int, n> dynamic_queue;     // not allowed

    P.foo = 2;
    ready_list.enqueue (P);
    P.foo = 3;
    ready_list.enqueue (P);
    P.foo = 4;
    ready_list.enqueue (P);
    cout << ready_list.dequeue().foo << "\n";

    int_queue.enqueue(4);
    int_queue.enqueue(6);
    int_queue.enqueue(8);
    cout << int_queue.dequeue() << "\n";

    queue<int, 50> *my_queue = new queue<int, 50>();
}
