select	e.lname as employee_name, s.lname as supervisor_name
from 	(employee e left outer join employee s on e.superssn = s.ssn);

select	e.lname as employee_name, s.lname as supervisor_name
from 	(employee s right outer join employee e on e.superssn = s.ssn);

select	e.lname employee_name, s.lname supervisor_name
from 	employee e, employee s
where	e.superssn = s.ssn(+);

select	e.lname employee_name, s.lname supervisor_name
from 	employee e, employee s
where	s.ssn(+) = e.superssn;