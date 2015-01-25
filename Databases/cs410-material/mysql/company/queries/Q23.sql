select	count(distinct salary)
from	employee;

/* without distinct keyword, the sql will not eliminate duplicates */
select 	count(salary)
from 	employee;