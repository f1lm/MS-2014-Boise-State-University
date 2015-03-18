CREATE DATABASE  IF NOT EXISTS `gradebook` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `gradebook`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: localhost    Database: gradebook
-- ------------------------------------------------------
-- Server version	5.5.38-MariaDB

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
-- Table structure for table `catalog`
--

DROP TABLE IF EXISTS `catalog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `catalog` (
  `Cno` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Ctitle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Cno`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalog`
--

LOCK TABLES `catalog` WRITE;
/*!40000 ALTER TABLE `catalog` DISABLE KEYS */;
INSERT INTO `catalog` VALUES (1,'CSc226'),(2,'CSc227'),(3,'Automata'),(4,'CSc125'),(5,'CSc121'),(6,'CSc221'),(7,'CSc341'),(8,'CSc441'),(9,'CSc410'),(10,'CSc444');
/*!40000 ALTER TABLE `catalog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `Term` varchar(45) NOT NULL,
  `Sec_no` int(11) NOT NULL,
  `Cno` varchar(45) DEFAULT NULL,
  `A` varchar(45) DEFAULT NULL,
  `B` varchar(45) DEFAULT NULL,
  `C` varchar(45) DEFAULT NULL,
  `D` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Term`,`Sec_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('fall 2009',4001,'1','90','80','70','60'),('fall 2009',4002,'1','90','80','70','60'),('fall 2009',4003,'2','93','83','73','63'),('fall 2009',4004,'3','90','80','70','60'),('fall 2009',4005,'4','90','80','70','60'),('fall 2009',4006,'5','95','85','75','65'),('fall 2009',4008,'7','93','83','73','60'),('fall 2009',4010,'9','90','80','70','60'),('spring 2009',4001,'1','90','80','70','60'),('spring 2009',4002,'1','90','80','70','60'),('spring 2009',4003,'2','93','83','73','63'),('spring 2009',4004,'3','90','80','70','60'),('spring 2009',4005,'4','90','80','70','60'),('spring 2009',4007,'6','90','80','70','60'),('spring 2009',4009,'8','90','80','70','60'),('spring 2009',4011,'10','93','83','72','60');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrolls`
--

DROP TABLE IF EXISTS `enrolls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enrolls` (
  `Sid` int(11) NOT NULL,
  `Term` varchar(45) NOT NULL DEFAULT '',
  `Sec_no` int(11) NOT NULL,
  PRIMARY KEY (`Sid`,`Term`,`Sec_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrolls`
--

LOCK TABLES `enrolls` WRITE;
/*!40000 ALTER TABLE `enrolls` DISABLE KEYS */;
INSERT INTO `enrolls` VALUES (1,'fall 2009',4001),(1,'spring 2009',4009),(2,'fall 2009',4002),(2,'fall 2009',4004),(2,'fall 2009',4005),(2,'fall 2009',4006),(2,'fall 2009',4008),(2,'fall 2009',4010),(2,'spring 2009',4003),(2,'spring 2009',4007),(2,'spring 2009',4009),(2,'spring 2009',4011),(4,'spring 2009',4002),(5,'fall 2009',4001),(5,'spring 2009',4001),(6,'fall 2009',4001),(8,'fall 2009',4003),(9,'fall 2009',4010);
/*!40000 ALTER TABLE `enrolls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `Sid` int(11) NOT NULL AUTO_INCREMENT,
  `Fname` varchar(45) DEFAULT NULL,
  `Lname` varchar(45) DEFAULT NULL,
  `Minit` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`Sid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Bob','Smith','F'),(2,'Bob','Smith','F'),(3,'Bob','Smith','J'),(4,'Robby','Doe','H'),(5,'Joe','Smith','S'),(6,'Jill','Doe','E'),(7,'Emma','Murphy','T'),(8,'Anne','Smith','R'),(9,'Gina','Smith','K');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-09 12:32:01
