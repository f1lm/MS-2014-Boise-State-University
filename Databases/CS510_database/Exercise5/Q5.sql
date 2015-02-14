SELECT L.DLocation, count(*) as 'number' FROM employee E
inner join Department D on
E.Dno = D.Dnumber
inner join Dept_Locations L on
D.Dnumber = L.Dnumber
WHERE EXISTS (SELECT * FROM dependent
                WHERE dependent.essn = E.ssn and dependent.relationship='Spouse' and E.sex=dependent.sex)
group by L.DLocation;