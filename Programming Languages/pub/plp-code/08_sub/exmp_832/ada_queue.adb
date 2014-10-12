-- Example 8.32 (Figure 8.4)
-- NB: this code should check for overflow and underflow

with text_io; use text_io;

procedure ada_queue is

    generic
        type item is private;   -- no characteristics of item visible herein
        max_items : in integer := 100;      -- 100 items max by default
    package queue is
        procedure enqueue (it : in item);
        function dequeue return item;
    private
        subtype index is integer range 1..max_items;
        items : array(index) of item;
        next_free, next_full : index := 1;
    end queue;

    package body queue is
        procedure enqueue (it : in item) is
        begin
            items(next_free) := it;
            next_free := next_free mod max_items + 1;
        end enqueue;
        function dequeue return item is
            rtn : item := items(next_full);
        begin
            next_full := next_full mod max_items + 1;
            return rtn;
        end dequeue;
    end queue;

    type process is new float;  -- placeholder
    package ready_list is new queue (process);
        -- assume type process has previously been declared
    package int_queue is new queue (integer, 50);
        -- only 50 items long, instead of the default 100

    package int_io is new integer_io(integer); use int_io;
    package process_io is new float_io(process); use process_io;

begin
    ready_list.enqueue(2.1);
    ready_list.enqueue(3.2);
    ready_list.enqueue(4.3);
    put(ready_list.dequeue);
    new_line;

    int_queue.enqueue(2);
    int_queue.enqueue(3);
    int_queue.enqueue(4);
    put(int_queue.dequeue);
    new_line;
end ada_queue; 
