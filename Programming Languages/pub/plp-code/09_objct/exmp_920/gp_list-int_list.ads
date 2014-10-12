-- (part of) Ada code for Example 9.20 (Figure 9.2)

package gp_list.int_list is

    type int_list_node is new gp_list_node with record
        val : integer;
    end record;
    type int_list_node_ptr is access all int_list_node;

    procedure initialize (self : access int_list_node);

end gp_list.int_list;
