-- 6.  Retrieve the names of departments which offered at least 2 courses (not sections) in spring, 2001.
select DNAME from (
select DName, count(distinct C.CourseNo) as Course from dept D
inner join course C on C.DeptCode = D.DeptCode
inner join section Sec on Sec.CourseNo = C.CourseNo 
where Sec.Year='2001' and Sec.Semester='S' group by D.DName) as temp
where Course >=2;