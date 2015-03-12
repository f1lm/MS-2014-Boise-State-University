-- employee manager with equi join
select E.fname, E.lname, E.superssn, D.dname 
from employee E, department D where E.superssn = D.mgrssn;

-- correct
select E.fname, E.lname, E.superssn, D.dname 
from employee E, department D where E.dno = D.dnumber;

-- get supervisors for all employees
-- use left outer join
select E.fname, E.lname, E.superssn, D.dname 
from employee E LEFT OUTER JOIN department D ON E.superssn = D.mgrssn;

-- get supervisors for all employees
-- use right outer join
select E.fname, E.lname, E.superssn, D.dname 
from department D RIGHT OUTER JOIN employee E ON E.superssn = D.mgrssn;

select E.fname, E.lname, D.dname, E1.fname, E1.LName from department D 
RIGHT OUTER JOIN employee E ON (E.superssn = D.mgrssn)
left outer join employee E1 on (E.superssn = E1.ssn);

-- skip level manager
select E.fname, E.lname, D.dname, E1.fname, E1.LName, 
E2.fname as 'skip manager fname',
E2.lname as ' skip manager lname' from department D 
RIGHT OUTER JOIN employee E ON (E.superssn = D.mgrssn)
left outer join employee E1 on (E.superssn = E1.ssn)
left outer join employee E2 on (E1.superssn = E2.ssn);

-- A manager can rotate people across multiple projects under his supervision
-- which projects an employee may end up working on?
-- cross join
select e.fname, e.lname, d.dname, p.pname from employee e  
inner join department d on e.dno = d.dnumber 
cross join project p on p.dnum = d.dnumber;



select e.fname, e.lname, d.dname, p.pname from employee e  
inner join department d on e.dno = d.dnumber 
left outer join project p on p.dnum = d.dnumber
union
select e.fname, e.lname, d.dname, p.pname from employee e  
inner join department d on e.dno = d.dnumber 
right outer join project p on p.dnum = d.dnumber;

select p.pnumber, d.dnumber, e.fname, e.lname 
from project p inner join department d on p.dnum = d.DNUMBER
inner join employee e  on e.SSN = d.mgrssn
where p.plocation='Stafford';








