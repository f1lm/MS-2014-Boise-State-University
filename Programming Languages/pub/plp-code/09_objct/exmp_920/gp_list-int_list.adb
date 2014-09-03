-- (part of) Ada code for Example 9.20 (Figure 9.2)

package body gp_list.int_list is

    procedure initialize (self : access int_list_node) is
    begin
        initialize (gp_list_node_ptr (self));
        self.val := 0;
    end initialize;

end gp_list.int_list;
