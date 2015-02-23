drop procedure if exists transfer2;

delimiter |

create procedure transfer2(IN acc_num_from int(11), IN acc_num_to int(11), IN txnamount int)
begin
	start transaction;
	
	set @account_balance_from:= 0;
	select @account_balance_from:= account_balance from account where account_number = acc_num_from;
	
	set @account_balance_to:= 0;
	select @account_balance_to:= account_balance from account where account_number = acc_num_to;
	
	if(@account_balance_from > txnamount and @account_balance_to is not null) then
		update account set account_balance = account_balance + txnamount where account_number = acc_num_to;
		update account set account_balance = account_balance - txnamount where account_number = acc_num_from;
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough balance';
	end if;
	
	commit;
end
|

delimiter ;