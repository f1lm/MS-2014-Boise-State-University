select s.FName, s.LName from STUDENT s Where s.SSN NOT IN (
select distinct s1.SSN from STUDENT s1 INNER join GRADE_REPORT g on s1.SSN = g.SSN
INNER JOIN COURSE c ON c.CourseNo = g.CourseNo 
And c.DeptCode = (select DeptCode from DEPT d Where d.DName='Computer Science'));