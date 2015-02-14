-- load the data into the customer table
load data infile '/opt/data/customer.txt' into table bank.customer fields terminated by '\t';
-- ignore the header in the file
load data infile '/opt/data/account.txt' into table bank.account fields terminated by '\t' ENCLOSED BY '"' ignore 1 lines;

