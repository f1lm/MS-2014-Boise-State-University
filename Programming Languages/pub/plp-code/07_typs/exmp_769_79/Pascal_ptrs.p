(* Pascal code from Section 7.7.1 (Examples 7.69 through 7.79) *)

program Pascal_ptrs (input, output);

type chr_tree_ptr = ^chr_tree;
     chr_tree = record
        left, right : chr_tree_ptr;
        val : char
     end;

var t, l, r : chr_tree_ptr;

begin
    new(l);
    l^.val := 'Z';
    l^.left := nil;
    l^.right := nil;
    new(r);
    r^.val := 'W';
    r^.left := nil;
    r^.right := nil;
    new(t);
    t^.val := 'Y';
    t^.left := l;
    t^.right := r;
    r := t;
    new(l);
    l^.val := 'X';
    l^.left := nil;
    l^.right := nil;
    new(t);
    t^.val := 'R';
    t^.left := l;
    t^.right := r;

    writeln(t^.right^.left^.val);   (* Z *)
end.
