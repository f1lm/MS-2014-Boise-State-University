select fname, lname from (
select s.ssn, s.fname, s.lname, count(s.ssn) as 'needed', count(g.ssn) as 'have' from student s
inner join major m on
s.ssn = m.SSN 
inner join course c on
m.deptcode = c.deptcode
left outer join grade_report g on
(s.ssn = g.ssn and c.CourseNo = g.courseNo)
group by s.ssn) as r
where needed = have;