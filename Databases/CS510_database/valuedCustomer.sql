drop procedure if exists valuedCustomer;

delimiter |

create procedure valuedCustomer(IN c1 int(11), IN c2 int(11), out c int(11)) deterministic 
begin
	set @sum_c1:=0;
	set @sum_c2:=0;
	set @ret:=-1;

	start transaction;
	select @sum_c1:= SUM(account_balance) from account where customer_id=c1;
	select @sum_c2:= SUM(account_balance) from account where customer_id=c2;
	if(@sum_c1 < @sum_c2) then
		set c:=c2;
	else	
		set c:=c1;
	end if;
	commit;
end

|

delimiter ;
