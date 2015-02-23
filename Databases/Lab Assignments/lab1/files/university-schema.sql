drop schema if exists `university`;
CREATE SCHEMA `university`;
use `university`;

 CREATE TABLE STUDENT
      (FName            VARCHAR(10)      NOT NULL,
       LName            VARCHAR(10)      NOT NULL,
       SSN              CHAR(9)          NOT NULL,
       StudentNumber    VARCHAR(10)      NOT NULL,
       Sex              CHAR,
       BirthDate        DATE,
       Class            INT,
       Degree           VARCHAR(10),
       Addr            VARCHAR(30),
      CONSTRAINT STUDENTPK
        PRIMARY KEY(SSN),
      CONSTRAINT STUDENTSK
        UNIQUE(StudentNumber));


 CREATE TABLE DEPT
      (DName          VARCHAR(30)     NOT NULL,
       DeptCode       VARCHAR(10)     NOT NULL,
       College        VARCHAR(20),
      CONSTRAINT DEPTPK
        PRIMARY KEY(DeptCode),
      CONSTRAINT DEPTSK
        UNIQUE(DName));


 CREATE TABLE COURSE
      (CName              VARCHAR(20)     NOT NULL,
       CourseNo           VARCHAR(10)     NOT NULL,
       Hours              INT,
       DeptCode           VARCHAR(10),
      CONSTRAINT COURSEPK
        PRIMARY KEY(CourseNo),
      CONSTRAINT COURSEFK_DEPTCODE
        FOREIGN KEY(DeptCode) REFERENCES DEPT(DeptCode) ON DELETE CASCADE);


 CREATE TABLE SECTION
      (SectionNo          INT            NOT NULL,
       Semester           CHAR           NOT NULL,
       Year               CHAR(4)        NOT NULL,
       CourseNo           VARCHAR(10)    NOT NULL,
      CONSTRAINT SECTIONPK
        PRIMARY KEY(SectionNo,Semester,Year,CourseNo),
      CONSTRAINT SECTIONFK_COURSENO
        FOREIGN KEY(CourseNo) REFERENCES COURSE(CourseNo) ON DELETE CASCADE);


 CREATE TABLE GRADE_REPORT
      (SSN                CHAR(9)        NOT NULL,
       SectionNo          INT            NOT NULL,
       Semester           CHAR           NOT NULL,
       Year               CHAR(4)        NOT NULL,
       CourseNo           VARCHAR(10)    NOT NULL,
       LGRADE             CHAR,
      CONSTRAINT GRADEREPORTPK
        PRIMARY KEY(SSN,SectionNo,Semester,Year,CourseNo),
      CONSTRAINT GRADEREPORTFK_SSN
        FOREIGN KEY(SSN) REFERENCES STUDENT(SSN) ON DELETE CASCADE,
      CONSTRAINT GRADEREPORTFK_COURSENO
        FOREIGN KEY(CourseNo) REFERENCES COURSE(CourseNo) ON DELETE CASCADE,
      CONSTRAINT GRADEREPORTFK_SSYC
        FOREIGN KEY(SectionNo,Semester,Year,CourseNo) REFERENCES 
          SECTION(SectionNo,Semester,Year,CourseNo) ON DELETE CASCADE);


 CREATE TABLE MAJOR
      (DeptCode        VARCHAR(10)      NOT NULL,
       SSN             CHAR(9)          NOT NULL,
      CONSTRAINT MAJORPK
        PRIMARY KEY(Deptcode,SSN),
      CONSTRAINT MAJORFK_DEPTCODE
        FOREIGN KEY(Deptcode) REFERENCES DEPT(Deptcode) ON DELETE CASCADE,
      CONSTRAINT MAJORFK_SSN
        FOREIGN KEY(SSN) REFERENCES STUDENT(SSN) ON DELETE CASCADE);


 CREATE TABLE MINOR
      (DeptCode        VARCHAR(10)      NOT NULL,
       SSN             CHAR(9)          NOT NULL,
      CONSTRAINT MINORPK
        PRIMARY KEY(Deptcode,SSN),
      CONSTRAINT MINORFK_DEPTCODE
        FOREIGN KEY(Deptcode) REFERENCES DEPT(Deptcode) ON DELETE CASCADE,
      CONSTRAINT MINORFK_SSN
        FOREIGN KEY(SSN)REFERENCES STUDENT(SSN) ON DELETE CASCADE);
