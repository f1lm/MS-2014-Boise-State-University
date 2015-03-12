-- hello

use company;

-- EXISTS key word
-- select names of employees that have atleast one dependent
select e.fname, e.lname from employee e where exists (select * from dependent d where e.ssn = d.essn);

-- what will happen if we used the following
select e.fname, e.lname from employee e where exists (select now());             

-- what will happen if we used the following
select e.fname, e.lname from employee e where exists (select null);

-- what will happen if we used the following
select e.fname, e.lname from employee e where exists (select * from employee where ssn+1=ssn+3);

