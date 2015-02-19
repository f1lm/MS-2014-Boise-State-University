-- 5.  Retrieve the names of students whose accumulated credit hours are greater than or equal to 10 
-- (Only passed courses will be counted; A passed course means the student get a grade C or above).
select FName, LName from (
select FName, LName, sum(C.hours) as hours from student S
inner join grade_report G 
on G.SSN = S.SSN 
inner join course C on
G.CourseNo = C.CourseNo
where G.LGrade <= 'C' group by S.SSN) as temp
where hours>=10;