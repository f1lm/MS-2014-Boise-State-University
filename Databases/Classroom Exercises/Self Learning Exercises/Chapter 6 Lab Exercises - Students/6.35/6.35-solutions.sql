-- 6.35 (a)
-- Retrieve the names of parts that cost less than $20.00.
SELECT 
    Pname
FROM
    parts p
WHERE
    p.price < 20;

-- 6.35 (b)
-- Retrieve the names and cities of employees who have taken orders for
-- parts costing more than $50.00.
SELECT DISTINCT
    e.ename, z.city
FROM
    parts p,
    employees e,
    zip_codes z,
    odetails od,
    orders o
WHERE
    p.Pno = od.pno AND e.zip = z.zip
        AND e.eno = o.eno
        AND o.ono = od.ono
        AND price > 50;

-- 6.35 (c)
-- Retrieve the pairs of customer number values of customers who live in the same ZIP Code.
SELECT 
    c1.cno, c2.cno
FROM
    customers c1,
    customers c2
WHERE
    c1.zip = c2.zip AND c1.Cno != c2.Cno;
    
-- 6.35 (d)    
-- Retrieve the names of customers who have ordered parts from employees living in Wichita.
SELECT 
    c.cname
FROM
    customers c,
    orders o,
    employees e,
    zip_codes z
WHERE
    c.cno = o.cno AND o.eno = e.eno
        AND e.zip = z.zip
        AND z.city = 'Wichita';

-- -- 6.35 (e)
-- Retrieve the names of customers who have ordered parts costing less than $20.00.
SELECT 
    c.Cname
FROM
    parts p,
    customers c,
    orders o,
    odetails od
WHERE
    c.Cno = o.Cno AND od.pno = p.pno
        AND od.Ono = o.ono
        AND p.price < 20;
        
-- 6.35 (f)
-- Retrieve the names of customers who have not placed an order.
SELECT 
    c.cname
FROM
    customers c
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            orders o
        WHERE
            o.cno = c.cno);
    
-- 6.35 (g)
-- Retrieve the names of customers who have placed exactly two orders.
SELECT 
    result.cname
FROM
    (SELECT 
        c.Cname, COUNT(o.ono) AS order_count
    FROM
        customers c, orders o
    WHERE
        c.Cno = o.cno
    GROUP BY o.cno
    HAVING order_count = 2) AS result;