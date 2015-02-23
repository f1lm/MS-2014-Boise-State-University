/* For each deaprtment whose average salary is greater than 30,000, retrieve */
/* department name, the number od distinct salary.  */

select dname, count(distinct salary)
from   department, employee
where  dno = dnumber
group by dname
having avg(salary) > 30000;