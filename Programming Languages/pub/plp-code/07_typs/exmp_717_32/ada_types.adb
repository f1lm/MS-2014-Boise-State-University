-- Ada code from Section 7.2 (Examples 7.20, 7.23, 7.25, and 7.27) 

with text_io; use text_io;
with unchecked_conversion;

procedure ada_types is

type weekday is (sun, mon, tue, wed, thu, fri, sat);
subtype workday is weekday range mon..fri;
type calendar_column is new weekday;

type test_score is new integer range 0..100;

subtype stack_element is integer;

type celsius_temp is new integer;
type fahrenheit_temp is new integer;
subtype real is long_float;

function cast_float_to_int is
    new unchecked_conversion (float, integer);
function cast_int_to_float is
    new unchecked_conversion (integer, float);

package int_io is new integer_io(integer);
package f_io is new float_io(float);

c : celsius_temp;
f : fahrenheit_temp;
n : integer;        -- assume 32 bits
r : real;           -- assume IEEE double-precision 
s : stack_element;
t : test_score;
g : float;
d : weekday;
k : workday;
l : calendar_column;

begin
    s := 3;
    c := 0;
    f := 32;
    n := 100;
    d := mon;
    -- c := f;      -- illegal
    -- f := n;      -- illegal

    t := test_score(n);   -- run-time semantic check required 
    n := integer(t);      -- no check req.; every test_score is an int 
    r := real(n);         -- requires run-time conversion 
    n := integer(r);      -- requires run-time conversion and check 
    n := integer(c);      -- no run-time code required 
    c := celsius_temp(n); -- no run-time code required

    n := 10;
    g := cast_int_to_float(n); 
    int_io.put(n);
    f_io.put(g);
    new_line;

    g := 10.0;
    n := cast_float_to_int(g);
    f_io.put(g);
    int_io.put(n);
    new_line;

    k := d;         -- run-time check required 
    d := k;         -- no check required; every workday is a weekday 
    -- l := d;      -- static semantic error; 
                    -- weekdays and calendar_columns are not compatible 

    l := calendar_column(d);    -- ok

end ada_types; 
