(* ML code for CD Section 7.2.4 (Examples 7.96 through 7.114) *)

fun fib(n) =
     let fun fib_helper(f1, f2, i) =
         if i = n then f2
         else fib_helper(f2, f1+f2, i+1)
     in
         fib_helper(0, 1, 0)
     end;

fib(7);

fun circum(r) = r * 2.0 * 3.14159;

circum(7.0);

fun compare(x, p, q) =
    if x = p then
        if x = q then "both"
        else "first"
    else
        if x = q then "second"
        else "neither";

compare(1, 2, 3);
compare(1, 1, 1);
compare(1, 1, 2);
compare(1, 2, 1);
let val t = ("larry", "moe", "curly") in compare(t) end;
let val d = (2, 3) in
    let val (a, b) = d in
        compare(1, a, b)
    end
end;

fun append(l1, l2) =
    if l1 = nil then l2
    else hd(l1) :: append(tl(l1), l2);

append([1, 2, 3], [4, 5, 6]);

fun member(x, l) =
    if l = nil then false
    else if x = hd(l) then true
    else member(x, tl(l));

member(3, [6, 3, 7, 9]);
member(4, [6, 3, 7, 9]);

fun square(x : real) = x * x;

square(3.14159);

fun swap(a, b) = (b, a);

swap(2, 3);

fun append2(l1, l2) =
    case l1 of
        nil => l2
    | h :: t => h :: append2(t, l2);

append2([1, 2, 3], [4, 5, 6]);

fun append3(l1, l2) =
    if l1 = nil then l2
    else let val h::t = l1 in h :: append3(t, l2) end;
    (* warning *)

append3([1, 2, 3], [4, 5, 6]);

fun append4(nil, l2) = l2
  | append4(h::t, l2) = h :: append4(t, l2);

append4([1, 2, 3], [4, 5, 6]);

let val(a, b) = swap(3, 4) in
    a
end;

let val abe = {name = "Abraham Lincoln", elected = 1860} in
    #elected(abe)
end;

let val abe = {elected = 1860, name = "Abraham Lincoln"} in
    #elected(abe)
end;

datatype weekday = sun | mon | tue | wed | thu | fri | sat;
val tgif = fri;

datatype yearday = mmdd of int * int | ddd of int;

let val d = mmdd(7,4) in
    let val mmdd(month, day) = d in
        day
    end
end;

datatype int_tree = empty | node of int * int_tree * int_tree;

datatype 'a tree = empty | node of 'a * 'a tree * 'a tree;

val my_tree = (#"R", node (#"X", empty, empty),
                    node (#"Y", node (#"Z", empty, empty),
                               node (#"W", empty, empty)));

datatype celsius_temp = ct of int;
datatype fahrenheit_temp = ft of int;
val freezing = ct (0);

let val l = [1, 2, 3] in
    let val head :: rest = l in
        head
    end
end;

let val l = [] in
    let val head :: rest = l in         (* exception *)
        head
    end
end;
