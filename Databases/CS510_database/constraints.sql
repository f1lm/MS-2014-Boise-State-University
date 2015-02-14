-- add the constraint such that each customer is allowed only one account of a particular type
alter table account add constraint unique key(customer_id,account_type);