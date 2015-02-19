select D.DName from Dept D
inner join 
(select R.DeptCode from (select D.DeptCode, count(M.SSN) as 'total' from Major M 
right outer join dept D on D.DeptCode= M.DeptCode 
group by D.DeptCode) as R
join
(select D.DeptCode, count(SSN) as 'total' from Minor M 
right outer join dept D on D.DeptCode= M.DeptCode 
group by D.DeptCode) as S
on R.DeptCode = S.deptCode
and S.total > R.total) as T
on
D.DeptCode = T.DeptCode