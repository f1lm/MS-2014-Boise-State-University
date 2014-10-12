(* Example 7.39 *)

(* Note: In accordance with a strict interpretation of IEEE floating-point
    arithmetic, recent versions of SML refuse to test reals for equality.
    Thus the statement in Example 7.39 isn't strictly true: the compiler
    will refuse to compare the two element values because of the atomic
    weight field.  In the code here we use an integer to hold the atomic
    weight -- the point is to illustrate how records work, not how
    floating point works. *)

let val cu1 = {name = "Cu", atomic_number = 29,
                atomic_weight = 64, metallic = true};
    val cu2 = {name = "Cu", atomic_number = 29,
                    atomic_weight = 64, metallic = true};
    val t1 = ("Cu", 29);
    val t2 = {1 = "Cu", 2 = 29};
    val t3 = {2 = 29, 1 = "Cu"};
in
    (#atomic_number(cu1), #atomic_number(cu2),
     cu1 = cu2,
     t1 = t2, t2 = t3, t3 = t1)
end;
