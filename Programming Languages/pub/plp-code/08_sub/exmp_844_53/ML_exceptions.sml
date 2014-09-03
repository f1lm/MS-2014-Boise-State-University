(* Example 8.49 *)

fun f(n) = n * n;
val a = 16000;
val b = 1000;
val max_int = 1000000000;
val foo = (f(a) * b) handle Overflow => max_int;
