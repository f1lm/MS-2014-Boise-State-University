-- Main program for Ada code of Example 9.20 (Figure 9.2)
-- You can build everything in this directory with "gnatmake list_test".

-- NB: use of unchecked conversions is a hack -- this is NOT good style.

with text_io; use text_io;
with UNCHECKED_CONVERSION;

with gp_list.queue; 
    use gp_list;
    use gp_list.queue;

with gp_list.int_list;
    use gp_list.int_list;

procedure list_test is

package int_io is new integer_io(integer); use int_io;

L : aliased list;

p, q : int_list_node_ptr;

function glnp_to_int is
    new UNCHECKED_CONVERSION(gp_list_node_ptr, integer);
function ilnp_to_int is
    new UNCHECKED_CONVERSION(int_list_node_ptr, integer);
function promote is
    new UNCHECKED_CONVERSION(gp_list_node_ptr, int_list_node_ptr);

begin
    initialize(L'Access);
    
    for i in 0..4 loop
        p := new int_list_node;
        initialize(p);
        p.val := i;
        append(L'Access, gp_list_node_ptr(p));
    end loop;

    p := promote(head(L'Access));

    for i in 0..4 loop
        int_io.put(ilnp_to_int(p));
        put(' '); int_io.put(p.val); put(' ');
        int_io.put(glnp_to_int(successor(gp_list_node_ptr(p)))); new_line;
        p := promote(successor(p));
    end loop;
    
    p := promote(head(L'Access));
    while p /= null loop
        int_io.put(p.val); new_line;
        q := promote(successor(p));
        remove(p);
        p := q;
    end loop;

end list_test; 
