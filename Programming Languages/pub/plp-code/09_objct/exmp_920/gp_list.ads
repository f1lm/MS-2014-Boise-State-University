-- (part of) Ada code for Example 9.20 (Figure 9.2)

package gp_list is
    list_err : exception;
    type gp_list_node is tagged private;
    type gp_list_node_ptr is access all gp_list_node;
    procedure initialize
        (self : access gp_list_node);
    procedure finalize
        (self : access gp_list_node);
    function predecessor
        (self : access gp_list_node)
        return gp_list_node_ptr;
    function successor
        (self : access gp_list_node)
        return gp_list_node_ptr;
    function singleton
        (self : access gp_list_node)
        return boolean;
    procedure insert_before
        (self : access gp_list_node; new_node : gp_list_node_ptr);
    procedure remove
        (self : access gp_list_node);

    type list is tagged private;
    type list_ptr is access all list;
    procedure initialize
        (self : access list);
    procedure finalize
        (self : access list);
    function empty
        (self : access list)
        return boolean;
    function head
        (self : access list)
        return gp_list_node_ptr;
    procedure append
        (self : access list; new_node : gp_list_node_ptr);
private
    type gp_list_node is tagged
        record
            prev, next, head_node : gp_list_node_ptr;
        end record;
    type list is tagged
        record
            head_node : aliased gp_list_node;
        end record;
end gp_list;
