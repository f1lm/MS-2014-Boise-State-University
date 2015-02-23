drop procedure if exists credit2;

delimiter |

create procedure credit2(IN acc_num int(11), IN creditamount int)
begin
	set @account_balance:= 0;
	select @account_balance:= account_balance from account where account_number = acc_num;
	if(@account_balance is not null) then
		update account set account_balance = account_balance + creditamount where account_number = acc_num;
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Account does not exist';
	end if;
end
|

delimiter ;