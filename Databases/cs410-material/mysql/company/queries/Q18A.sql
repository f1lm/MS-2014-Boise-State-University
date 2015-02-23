/* '= null' is always unknown */
select	fname, lname
from	employee
where	superssn = null;