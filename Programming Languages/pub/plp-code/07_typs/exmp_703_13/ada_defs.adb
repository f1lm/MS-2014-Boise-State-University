-- Ada code from Section 7.1 (Examples 7.3 through 7.13)

with text_io; use text_io;

procedure ada_defs is

type weekday is (sun, mon, tue, wed, thu, fri, sat);

type mips_special_regs is (gp, sp, fp, ra);     -- must be sorted
for mips_special_regs use (gp => 28, sp => 29, fp => 30, ra => 31);

type test_score is new integer range 0..100;
subtype workday is weekday range mon..fri;

type person is record
         name : string (1..10);
         age : integer;
     end record;
p, q : person;
A, B : array (1..10) of integer;

package int_io is new integer_io(integer);
package day_IO is new enumeration_io(weekday);

begin
    int_io.put(weekday'pos(mon));
    new_line;
    day_io.put(weekday'val(1));
    new_line;

    p := ("Jane Doe  ", 37);
    q := (age => 36, name => "John Doe  ");
    A := (1, 0, 3, 0, 3, 0, 3, 0, 0, 0);
    B := (1 => 1, 3 | 5 | 7 => 3, others => 0);

    put(p.name);
    new_line;
    int_io.put(q.age);
    new_line;
    int_io.put(A(3));
    new_line;
    int_io.put(B(4));
    new_line;
end ada_defs;
