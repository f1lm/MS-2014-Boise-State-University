drop procedure if exists debit;

delimiter |

create procedure debit(IN acc_num int(11), debitamount int)
begin
	update account set account_balance = account_balance - debitamount where account_number = acc_num;
end
|

delimiter ;

