drop schema if exists `company`;
create schema `company`;
use `company`;

CREATE TABLE employee   (
	fname CHAR(15) NOT NULL,
	minit   CHAR,
	lname   CHAR(15) NOT NULL,
	ssn CHAR(9) NOT NULL,
	bdate   DATE,
	address CHAR(30),
	sex CHAR,
	salary  DECIMAL(10,2),
	superssn    CHAR(9),
	dno INT NOT NULL,
	PRIMARY KEY (ssn),
	FOREIGN KEY (superssn) REFERENCES employee(ssn)
);



CREATE TABLE department (
	dname  CHAR(15) NOT NULL,
	dnumber INT NOT NULL,
	mgrssn  CHAR(9) NOT NULL,
	mgrstartdate DATE,
	PRIMARY KEY (dnumber),
	UNIQUE (dname),
	FOREIGN KEY (mgrssn) REFERENCES employee(ssn)
);


ALTER TABLE employee ADD CONSTRAINT FOREIGN KEY (dno) REFERENCES department(dnumber);


CREATE TABLE dept_locations (
	dnumber INT NOT NULL,
	dlocation    CHAR(15)    NOT NULL,
	PRIMARY KEY (dnumber, dlocation),
	FOREIGN KEY (dnumber) REFERENCES department(dnumber)
);

CREATE TABLE project (
	pname CHAR(15) NOT NULL,
	pnumber INT NOT NULL,
	plocation   CHAR(15),
	dnum    INT NOT NULL,
	PRIMARY KEY (pnumber),
	UNIQUE (pname),
	FOREIGN KEY (dnum) REFERENCES department(dnumber));

CREATE TABLE works_on (
        essn  CHAR(9) NOT NULL,
        pno INT NOT NULL,
        hours   DECIMAL(3,1)    NOT NULL,
	PRIMARY KEY (essn, pno),
	FOREIGN KEY (essn) REFERENCES employee(ssn),
	FOREIGN KEY (pno) REFERENCES project(pnumber)
);

CREATE TABLE dependent (
        essn  CHAR(9) NOT NULL,
	dependent_name  CHAR(15)  NOT NULL,
	sex CHAR,
	bdate DATE,
	relationship CHAR(8),
	PRIMARY KEY (essn, dependent_name),
	FOREIGN KEY (essn) REFERENCES employee(ssn));


