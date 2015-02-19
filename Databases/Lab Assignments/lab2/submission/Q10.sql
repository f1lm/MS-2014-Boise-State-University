select distinct FNAME, LNAME from
(select S.SSN, S.FName, S.LName, count(S.SSN) as 'wanted', count(G.SSN) as 'passed' from student S 
inner join major Maj on Maj.SSN = S.SSN
inner join course C on C.DeptCode = Maj.DeptCode
left outer join grade_report G on (G.CourseNo = C.CourseNo and G.SSN = S.SSN)
group by S.SSN) as temp
where wanted=passed;