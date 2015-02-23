select	fname, lname
from	employee
where	address like 'Houston/_, TX%' escape '/';