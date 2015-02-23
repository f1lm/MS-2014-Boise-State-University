select FName, LName from (
select FName, LName, sum(C.hours) as hours from student S
inner join grade_report G 
on G.SSN = S.SSN 
inner join course C on
G.CourseNo = C.CourseNo
where G.LGrade <= 'C' group by S.SSN) as temp
where hours>=10;