select D.DName from Dept D
inner join 
( select R.DeptCode from (select D.DeptCode, COUNT(M.SSN) as 'num'
from Major M right outer join dept D on D.DeptCode= M.DeptCode group by D.DeptCode) as R
join
(select D.DeptCode, COUNT(SSN) as 'num'
from Minor M right outer join dept D on D.DeptCode= M.DeptCode group by D.DeptCode) as S
on R.DeptCode = S.deptCode
and S.num > R.num) as T
on
D.DeptCode = T.DeptCode
