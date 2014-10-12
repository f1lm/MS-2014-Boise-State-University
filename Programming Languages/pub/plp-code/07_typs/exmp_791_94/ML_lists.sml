(* Example 7.93 *)

val a = 3;
val b = 4;
val c = 5;
val d = 6;

a :: [b];           (* [3, 4] *)
hd [a, b];          (* 3 *)
tl [a, b, c];       (* [4, 5] *)
tl [a];             (* nil *)
[a, b] @ [c, d];    (* [3, 4, 5, 6] *)
hd [];              (* run-time exception *)
tl [];              (* run-time exception *)
