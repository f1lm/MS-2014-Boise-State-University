-- (part of) Ada code for Example 9.20 (Figure 9.2)

package gp_list.queue is
    type queue is new list with private;
    procedure initialize (self : access queue);
    procedure finalize (self : access queue);
    procedure enqueue
        (self : access queue; new_node : gp_list_node_ptr);
    function dequeue (self : access queue)
        return gp_list_node_ptr;
private
    type queue is new list with null record;
end gp_list.queue;
