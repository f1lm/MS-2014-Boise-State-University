select fname, LName from student where SSN not in (
select student.ssn from STUDENT
inner join GRADE_REPORT on
student.ssn = GRADE_REPORT.SSN
inner join course on
GRADE_REPORT.CourseNo = course.CourseNo
inner join dept on
course.DeptCode = dept.DeptCode
where course.DeptCode not in (select distinct major.DeptCode from major where major.ssn = student.ssn));
