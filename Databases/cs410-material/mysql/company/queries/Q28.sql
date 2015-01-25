/* for each department, count total # of employees whose salaries exceed $40000, but only for departments where more than 2 employees who each earn more than $20000 */
select 	dname, count(*)
from	department, employee
where	dnumber = dno and salary > 40000
group by dname
having 	count(*) > 2;

/* for each department, count total # of employees whose salaries exceed $40000, but only for departments where more than 2 employees works */
select 	dnumber, count(*)
from	department, employee
where	dnumber = dno and salary > 40000 and
	dno in (select 	dno
		from 	employee
		group by dno
		having	count(*) > 2)
group by dnumber;
