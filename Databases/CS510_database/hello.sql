drop function if exists hello;

delimiter |

create function hello(s char(10)) returns char(50) deterministic
begin
	return concat('Hello ', s,' !');
end
|

delimiter ;