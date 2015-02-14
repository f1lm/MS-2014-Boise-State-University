CREATE DATABASE  IF NOT EXISTS `company` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `company`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: company
-- ------------------------------------------------------
-- Server version	5.6.11-ndb-7.3.2-cluster-gpl

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DEPARTMENT`
--

DROP TABLE IF EXISTS `DEPARTMENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPARTMENT` (
  `Dname` varchar(15) NOT NULL,
  `Dnumber` int(11) NOT NULL,
  `Mgr_ssn` char(9) NOT NULL,
  `Mgr_start_date` date DEFAULT NULL,
  PRIMARY KEY (`Dnumber`),
  UNIQUE KEY `Dname` (`Dname`),
  KEY `Mgr_ssn` (`Mgr_ssn`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`Mgr_ssn`) REFERENCES `EMPLOYEE` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPARTMENT`
--

LOCK TABLES `DEPARTMENT` WRITE;
/*!40000 ALTER TABLE `DEPARTMENT` DISABLE KEYS */;
INSERT INTO `DEPARTMENT` VALUES ('Corporate',1,'123456789','2014-02-10'),('Finance',2,'123456789','2014-02-10'),('HR',3,'123456789','2014-02-10'),('Sales',4,'123456789','2014-02-10'),('Research',5,'123456789','2014-02-10'),('Engineers',6,'223456789','2014-02-10');
/*!40000 ALTER TABLE `DEPARTMENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPENDENT`
--

DROP TABLE IF EXISTS `DEPENDENT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPENDENT` (
  `Essn` char(9) NOT NULL,
  `Dependent_name` varchar(15) NOT NULL,
  `Sex` char(1) DEFAULT NULL,
  `BDate` date DEFAULT NULL,
  `Relationship` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`Essn`,`Dependent_name`),
  CONSTRAINT `dependent_ibfk_1` FOREIGN KEY (`Essn`) REFERENCES `EMPLOYEE` (`Ssn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPENDENT`
--

LOCK TABLES `DEPENDENT` WRITE;
/*!40000 ALTER TABLE `DEPENDENT` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEPENDENT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DEPT_LOCATIONS`
--

DROP TABLE IF EXISTS `DEPT_LOCATIONS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DEPT_LOCATIONS` (
  `Dnumber` int(11) NOT NULL,
  `Dlocation` varchar(15) NOT NULL,
  PRIMARY KEY (`Dnumber`,`Dlocation`),
  CONSTRAINT `dept_locations_ibfk_1` FOREIGN KEY (`Dnumber`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPT_LOCATIONS`
--

LOCK TABLES `DEPT_LOCATIONS` WRITE;
/*!40000 ALTER TABLE `DEPT_LOCATIONS` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEPT_LOCATIONS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EMPLOYEE`
--

DROP TABLE IF EXISTS `EMPLOYEE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EMPLOYEE` (
  `FNAME` varchar(15) NOT NULL,
  `Minit` char(1) DEFAULT NULL,
  `LName` varchar(15) NOT NULL,
  `Ssn` char(9) NOT NULL,
  `Address` varchar(30) DEFAULT NULL,
  `Sex` char(1) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `Super_ssn` char(9) DEFAULT NULL,
  `Dno` int(11) NOT NULL,
  PRIMARY KEY (`Ssn`),
  KEY `Super_ssn` (`Super_ssn`),
  KEY `Dno` (`Dno`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`Super_ssn`) REFERENCES `EMPLOYEE` (`Ssn`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`Dno`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EMPLOYEE`
--

LOCK TABLES `EMPLOYEE` WRITE;
/*!40000 ALTER TABLE `EMPLOYEE` DISABLE KEYS */;
INSERT INTO `EMPLOYEE` VALUES ('John','A','Smith','123456789','Boise ID','M',1234567.10,'123456789',1),('Alan',NULL,'Smith','223456789','Boise ID','M',42567.10,'123456789',6),('Will',NULL,'Smith','323456789','Boise ID','M',42547.10,'123456789',2),('Megan',NULL,'McDonald','423456789','Boise ID','M',142547.10,'123456789',2),('Mary',NULL,'White','523456789','Boise ID','M',142547.10,'123456789',2),('Steve',NULL,'White','623456789','Boise ID','M',142547.10,'123456789',2),('Mary',NULL,'Black','723456789','Boise ID','M',142547.10,'123456789',2);
/*!40000 ALTER TABLE `EMPLOYEE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROJECT`
--

DROP TABLE IF EXISTS `PROJECT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PROJECT` (
  `Pname` varchar(15) NOT NULL,
  `Pnumber` int(11) NOT NULL,
  `Plocation` varchar(15) DEFAULT NULL,
  `Dnum` int(11) NOT NULL,
  PRIMARY KEY (`Pnumber`),
  UNIQUE KEY `Pname` (`Pname`),
  KEY `Dnum` (`Dnum`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`Dnum`) REFERENCES `DEPARTMENT` (`Dnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROJECT`
--

LOCK TABLES `PROJECT` WRITE;
/*!40000 ALTER TABLE `PROJECT` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROJECT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WORKS_ON`
--

DROP TABLE IF EXISTS `WORKS_ON`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WORKS_ON` (
  `Essn` char(9) NOT NULL,
  `Pno` int(11) NOT NULL,
  `Hours` decimal(3,1) NOT NULL,
  PRIMARY KEY (`Essn`,`Pno`),
  KEY `Pno` (`Pno`),
  CONSTRAINT `works_on_ibfk_1` FOREIGN KEY (`Essn`) REFERENCES `EMPLOYEE` (`Ssn`),
  CONSTRAINT `works_on_ibfk_2` FOREIGN KEY (`Pno`) REFERENCES `PROJECT` (`Pnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WORKS_ON`
--

LOCK TABLES `WORKS_ON` WRITE;
/*!40000 ALTER TABLE `WORKS_ON` DISABLE KEYS */;
/*!40000 ALTER TABLE `WORKS_ON` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-02-19 13:22:55
