create database bank;
use bank;

create table customer(
customer_id int(11) not null,
firstName varchar(20) not null,
lastName varchar(20) not null,
streetAddress varchar(20) not null,
city varchar(20) not null,
zipcode varchar(9) not null,
primary key(customer_id)
);

create table account(
customer_id int(11) not null,
account_number int(11) not null,
account_type enum('checking','savings','certificate deposit','ira') not null,
account_balance decimal(15,2) not null,
primary key(account_number),
foreign key (customer_id) references customer(customer_id)
);

create table customer_txn_history(
timeofevent timestamp not null,
account_number int(11) not null,
event_type enum('account_opened','account_closed','keep_the_change','debit','credit', 'daily_withdrawl_limit_reached','address_changed') not null,
transaction_amount decimal(13,2),
original_balance decimal(13,2),
resulting_balance decimal(13,2)
);
