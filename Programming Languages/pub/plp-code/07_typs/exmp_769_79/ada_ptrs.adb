-- Ada code from Section 7.7.1 (Examples 7.69 through 7.79 *)

with text_io; use text_io;

procedure ada_ptrs is

type chr_tree;
type chr_tree_ptr is access chr_tree;
type chr_tree is record
    left, right : chr_tree_ptr;
    val : character;
end record;

T : chr_tree;
P, L, R : chr_tree_ptr;

begin
    L := new chr_tree'(null, null, 'Z');
    R := new chr_tree'(null, null, 'W');
    R := new chr_tree'(L, R, 'Y');
    L := new chr_tree'(null, null, 'X');
    P := new chr_tree'(L, R, 'R');

    put(P.right.left.val);
    new_line;

    T := P.all;
    T.val := 'M';
end ada_ptrs; 
