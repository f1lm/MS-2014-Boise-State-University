drop trigger delete_account;

-- change the delimiter as the default ; will not allow mulitple nested statements 
delimiter |

-- create the trigger
create trigger delete_account after delete on account
for each row
begin
	insert into customer_txn_history values (now(), old.account_number, 'account_closed', old.account_balance, old.account_balance, 0);
end;
-- add the new delimiter to signal that the definition of trigger is completed.
|

-- reset the delimiter to be ;
delimiter ;
