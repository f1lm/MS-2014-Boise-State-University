drop trigger insert_account;

-- change the delimiter as the default ; will not allow mulitple nested statements 
delimiter |

-- create the trigger
create trigger insert_account after insert on account
for each row
begin
	insert into customer_txn_history values (now(), new.account_number, 'account_opened', new.account_balance, 0, new.account_balance);
end;
-- add the new delimiter to signal that the definition of trigger is completed.
|

-- reset the delimiter to be ;
delimiter ;