select fname, lname from (
select fname, lname, SUM(course.Hours) as 'hours' from student
left outer join GRADE_REPORT
on student.SSN = GRADE_REPORT.SSN
inner join course on
GRADE_REPORT.CourseNo = course.CourseNo
where
grade_report.LGRADE <='C'
group by student.ssn) as t
where hours>=10;