(* ML code from Section 7.7.1 (Examples 7.69 through 7.79) *)

datatype chr_tree = empty | node of char * chr_tree * chr_tree;

node (#"R", node (#"X", empty, empty), node (#"Y", node (#"Z", empty,
  empty), node (#"W", empty, empty)));

datatype placeholder = int;
datatype sym_tab_rec = variable of placeholder
    | typedef of placeholder
    | subroutine of {code : syn_tree_node}
and syn_tree_node = expression of placeholder
    | loop of placeholder
    | subr_call of {subr : sym_tab_rec};

val p = ref 2;
p := 3;
let val n = !p in n end;
