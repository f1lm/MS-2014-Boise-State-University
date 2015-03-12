-- exercise
-- find the list of all the employees 
-- except those working on any project 
-- located in stafford


 select * from employee e  where not exists 
(select * from project p inner join 
works_on w on w.pno = p.pnumber where 
w.essn = e.ssn and p.plocation = 'Stafford' );

SELECt em.ssn, em.fname, em.lname FROM employee em WHERE em.ssn NOT IN
(SELECT  e.ssn FROM employee e, works_on w, project p 
WHERE e.ssn = w.essn AND w.pno = p.pnumber AND p.plocation ='Stafford')

-- find all attributes for work_on and employees for the 
-- employees that work on ANY of the projects that
-- john smith works on, including john smith in the result set
select w1.*, e1.* from employee e1 inner join works_on w1 on 
w1.essn = e1.ssn
where exists (
select * from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John' and w.pno = w1.pno
);


-- introduce the division operator.
-- find all attributes for work_on and employees for the 
-- employees that work on ALL of the projects that
-- john smith works on
-- T1 = Proj(Ry)
-- T2 = Proj((SxT1)-R)
-- T = T1 - T2

-- T1
select w.pno from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John'

-- temp table example
select * from (
select w.pno  from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John'
) temp;

-- S x T1
select e1.ssn, temp.pno from employee e1, (
select w.pno  from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John'
) temp

-- T2 = Proj((SxT1)-R) 
select distinct ST1.ssn from (select e1.ssn, temp.pno from employee e1, (
select w.pno  from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John'
) temp) ST1 
where 
not exists 
(select * from works_on w1 where w1.essn=ST1.ssn and w1.pno = ST1.pno);


-- T = T2 - T1
select e2.fname, e2.lname from employee e2 where not exists (
select distinct ST1.ssn from (select e1.ssn, temp.pno from employee e1, (
select w.pno  from employee e inner join works_on w on w.essn = e.ssn 
where e.lname ='Smith' and e.fname='John'
) temp) ST1 
where 
not exists 
(select * from works_on w1 where w1.essn=ST1.ssn and w1.pno = ST1.pno)
and ST1.ssn = e2.ssn
);


