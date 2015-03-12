-- Todays class


use company;

select * from department;

select * from dept_locations;


select * from employee;
select count(*) from employee;


select distinct superssn from employee;
select superssn from employee;
select count(distinct superssn) from employee;

select distinct dlocation from dept_locations;

select fname, lname from employee order by fname desc;


-- order by Ascending
select fname, lname from employee order by fname;

-- order by descending
select fname, lname from employee order by fname desc;

-- order by descending, cascaded
select fname, lname from employee order by fname desc, lname desc;

-- average salary for each department
select dno, avg(salary) from employee group by dno;


-- min and max salary for each department
select dno, min(salary), max(salary) from employee group by dno;

select dno, avg(salary) as 'avg' from employee group by dno order by dno desc;

-- discuss group by and order by
select dno, avg(salary) as 'avg' from employee group by dno order by avg(salary);

select superssn, count(*) from employee group by superssn;



select fname, lname, dname from employee e, department d 
where e.Dno = d.dnumber;
-- Equi join
select dname as 'Department', dlocation as 'Location' 
from department D, dept_locations DL 
where D.dnumber = DL.dnumber;

-- Equi join find all research employees
select E.fname, E.lname, E.address 
from employee as E, department as D 
where dno = Dnumber and dname='Research';

-- Class exercise find average salary by location
-- Class exercise find average salary by location, gender


-- Cross join
select * from employee E, department d;

-- employee manager with equi join
select E.fname, E.lname, E.superssn, D.dname from employee E, department D where E.superssn = D.mgrssn;

-- Alternative form of Equi join using inner join
select E.fname, E.lname, E.superssn, D.dname from employee E INNER JOIN department D ON E.superssn = D.mgrssn;


