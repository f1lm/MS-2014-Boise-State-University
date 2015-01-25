select	distinct essn
from 	works_on
where	(pnum, hours) in (select pnum, hours
                          from   works_on
                          where  essn='123456789');