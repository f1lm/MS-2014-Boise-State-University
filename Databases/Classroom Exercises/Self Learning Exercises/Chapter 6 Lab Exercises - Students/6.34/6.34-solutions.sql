-- 6.34 (a)
-- List the names of all employees in department 5 
-- who work more than 10 hours per week on the ProductX project
SELECT 
    fname, minit, lname
FROM
    employee e
        INNER JOIN
    works_on w ON e.ssn = w.essn AND w.hours > 10
        AND e.dno = 5
        INNER JOIN
    project p ON p.dnum = e.dno AND p.pname = 'Productx'
        AND w.pno = p.pnumber;
    
-- 6.34 (b)
-- List the names of all employees who have a dependent with the same first name 
-- as themselves.
SELECT 
    *
FROM
    dependent d
        INNER JOIN
    employee e
WHERE
    e.fname = d.dependent_name
        AND e.ssn = d.essn;

-- 6.34 (c)
-- List the names of employees who are directly supervised by Franklin Wong.
SELECT 
    fname, lname
FROM
    employee e
WHERE
    e.superssn IN (SELECT 
            ssn
        FROM
            employee
        WHERE
            fname = 'Franklin' AND lname = 'Wong');
            
-- 6.34 (d)
-- List the names of employees who work on every project.
SELECT 
    fname, lname
FROM
    employee e
WHERE
    NOT EXISTS( SELECT 
            pnumber
        FROM
            project p
        WHERE
            NOT EXISTS( SELECT 
                    *
                FROM
                    works_on w
                WHERE
                    p.pnumber = w.pno AND w.essn = e.ssn));

-- 6.34 (e)
-- List the names of employees who do not work on any project.
SELECT 
    fname, lname
FROM
    employee e
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            works_on w
        WHERE
            w.essn = e.ssn);
            
            
-- 6.34 (f)
-- List the names and addresses of employees who work on at least one project 
-- located in Houston but whose department has no location in Houston.
SELECT 
    fname, lname, address
FROM
    employee e
WHERE
    EXISTS( SELECT 
            *
        FROM
            works_on w,
            project p
        WHERE
            e.ssn = w.essn AND w.pno = p.pnumber
                AND p.plocation = 'Houston')
        AND NOT EXISTS( SELECT 
            *
        FROM
            dept_locations d
        WHERE
            e.dno = d.dnumber
                AND d.dlocation = 'Houston');

-- 6.34 (g)
-- List the names of department managers who have no dependents.
SELECT 
    fname, lname
FROM
    employee e
WHERE
    EXISTS( SELECT 
            *
        FROM
            department d
        WHERE
            e.ssn = d.mgrssn)
        AND NOT EXISTS( SELECT 
            *
        FROM
            dependent dep
        WHERE
            e.ssn = dep.essn);
