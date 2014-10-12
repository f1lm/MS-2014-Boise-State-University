(* Example 8.20 *)

fun apply_to_L(f, l) =
    case l of
        nil => nil
    | h :: t => f(h) :: apply_to_L(f, t);

fun inc(i) = i + 1;

apply_to_L(inc, [5, 6, 7, 8, 9, 10]);
