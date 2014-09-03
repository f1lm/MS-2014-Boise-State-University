-- (part of) Ada code for Example 9.20 (Figure 9.2)

package body gp_list.queue is
    procedure initialize (self : access queue) is
    begin
        initialize (list_ptr (self));
    end initialize;

    procedure finalize (self : access queue) is
    begin
        finalize (list_ptr (self));
    end finalize;

    procedure enqueue
        (self : access queue; new_node : gp_list_node_ptr) is
    begin
        append (list_ptr (self), new_node);
    end enqueue;

    function dequeue
        (self : access queue) return gp_list_node_ptr is
    rtn : gp_list_node_ptr;
    begin
        if empty (list_ptr (self)) then
            raise list_err;
        end if;
        rtn := head (list_ptr (self));
        remove (rtn);
        return rtn;
    end dequeue;
end gp_list.queue;
