-- Example 3.30

with text_io; use text_io;

procedure overload_min is

subtype real is float;

function min(a, b : integer) return integer is
begin
    if a < b then return a;
    else return b;
    end if;
end min;

function min(x, y : real) return real is
begin
    if x < y then return x;
    else return y;
    end if;
end min;

package int_io is new text_io.integer_io(integer);
package real_io is new text_io.float_io(real);

begin
    int_io.put(min(5, 3));
    new_line;
    real_io.put(min(3.0, 5.0));
    new_line;
end overload_min;
