select distinct fname, lname from student
inner join Minor MI
on
MI.ssn = student.ssn
where
student.ssn not in (
select s.ssn from student s
inner join minor M on
s.ssn = M.ssn
inner join course c on
c.deptcode = M.deptcode
where (s.ssn, c.courseno) in
(select g.ssn, g.courseno from grade_report g where g.ssn = s.ssn));
