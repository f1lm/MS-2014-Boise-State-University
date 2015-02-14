use company;

-- #3
select E.FNAME, E.LName, D.Dname, D.Dnumber from Employee E, Department D where E.Dno=D.Dnumber;

-- #4
select E.FNAME, E.LName, D.Dname, D.Dnumber from Employee E INNER JOIN Department D on (E.Dno=D.Dnumber);

-- #1 
-- use of inner join
select E.FNAME, E.LName, D.Dname from Employee E inner join Department D on (D.Mgr_ssn=E.ssn);

-- #5
select FNAME, LNAME, SSN, super_ssn from Employee;

-- #6
update Employee set Super_ssn='223456789' where ssn='623456789';

-- #7
select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee_l' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn);

-- #8
-- Check mySQL specification for rename
select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee_l' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn) where 'reportee_f' is not null;

-- #9
select * from (select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee_l' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn)) as R where R.reportee_f is not null order by R.Fname, R.Lname;

-- #10
select * from (select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee_l' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn)) as R where (R.FNAME<>R.reportee_f and  R.LNAME <> reportee_l);

-- #11
select * from (select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee_l' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn)) as R 
where (R.FNAME<>R.reportee_f or  R.LNAME <> reportee_l) and R.reportee_f is not null;


-- #12
select * from Employee where Fname like '%ar%';

-- #13
select * from Employee where Fname like '_ar_%';

-- #14
select * from department D where D.Dnumber in (1,6) and D.dname in ('corporate', 'research');

-- #15
-- after creating new table for department
select * from department
union
select * from department_in_b;

-- #16
-- after creating new table for department
select dname, dnumber from department
union
select dname, Mgr_start_date from department_in_b;

-- #2
-- use of outer join
select * from (
select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn)) as temp; 

-- nested queries
select * from (
select E1.FNAME, E1.LName, 
E2.FNAME as 'reportee_f', E2.LName as 'reportee' 
from Employee E1 left outer join Employee E2 on (E1.Ssn=E2.Super_ssn)) as temp where reportee is not null;

-- use of in clause
select * from Department D where D.Dnumber IN (1,6);

-- select colleagues
select E1.FNAME, E1.LName, 
E2.FNAME as 'colloeague_f', E2.LName as 'c_l' 
from Employee E1 left outer join Employee E2 on
(E1.Dno=E2.Dno) where E1.ssn<>E2.ssn;