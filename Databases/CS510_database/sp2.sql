drop procedure if exists debit2;

delimiter |

create procedure debit2(IN acc_num int(11), IN debitamount int)
begin
	set @account_balance:= 0;
	select @account_balance:= account_balance from account where account_number = acc_num;
	if(@account_balance > debitamount) then
		update account set account_balance = account_balance - debitamount where account_number = acc_num;
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not enough balance';
	end if;
end
|

delimiter ;