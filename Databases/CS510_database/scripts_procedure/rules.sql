drop trigger update_account;

-- change the delimiter as the default ; will not allow mulitple nested statements 
delimiter |

-- create the trigger
create trigger update_account after update on account
for each row
begin
	if (new.account_balance >= old.account_balance) then
		insert into customer_txn_history values (now(), new.account_number, 'credit', new.account_balance-old.account_balance, old.account_balance, new.account_balance);
	end if;
	if (new.account_balance < old.account_balance) then
		insert into customer_txn_history values (now(), new.account_number, 'debit', new.account_balance-old.account_balance, old.account_balance, new.account_balance);
	end if;
end;
-- add the new delimiter to signal that the definition of trigger is completed.
|

-- reset the delimiter to be ;
delimiter ;
