(* Examples 10.36 through 10.42 *)

fun plus (a, b) : int = a + b;
    (* val plus = fn : int * int -> int *)

plus (3, 4);
    (* val it = 7 : int *)

fun twice n : int = n + n;
    (* val twice = fn : int -> int *)
twice 2;
    (* val it = 4 : int *)

fun double (n) : int = n + n;
twice (2);
    (* val it = 4 : int *)
twice 2;
    (* val it = 4 : int *)
double (2);
    (* val it = 4 : int *)
double 2;
    (* val it = 4 : int *)

fun curried_plus a = fn b : int => a + b;
    (* val curried_plus = fn : int -> int -> int *)

curried_plus 3;
    (* val it = fn : int -> int *)

(* plus 3;
    Error: operator domain (int * int) and operand (int) don't agree *)

fun curried_plus2 a b : int = a + b;
    (* val curried_plus = fn : int -> int -> int *) 

fun fold (f, l, i) =
    case l of
        nil => i
     |  h :: t => f (h, fold (f, t, i));
    (* val fold = fn : ('a * 'b -> 'b) * 'a list * 'b -> 'b *)

fold (plus, [1, 2, 3, 4, 5], 0);
    (* val it = 15 : int *)

fun curried_fold f l i =
    case l of
        nil => i
     |  h :: t => f (h, curried_fold f t i);
    (* val curried_fold = fn : ('a * 'b -> 'b) -> 'a list -> 'b -> 'b *)

curried_fold plus;
    (* val it = fn : int list -> int -> int *)
curried_fold plus [1, 2, 3, 4, 5];
    (* val it = fn : int -> int *)
curried_fold plus [1, 2, 3, 4, 5] 0;
    (* val it = 15 : int *)
