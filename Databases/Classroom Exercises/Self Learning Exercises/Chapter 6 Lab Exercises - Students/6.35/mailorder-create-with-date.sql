CREATE DATABASE  IF NOT EXISTS `mailorder` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mailorder`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: localhost    Database: mailorder
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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `Cno` int(11) NOT NULL,
  `Cname` varchar(45) DEFAULT NULL,
  `Street` varchar(45) DEFAULT NULL,
  `Zip` int(11) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Cno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (21,'AT&T','12 Wireless Ave.',67202,'(912) 134-4839'),(23,'Microsoft','10 Windows Street',83796,'(208) 426-4323'),(28,'T-Mobile','34 Network Ln.',67202,'(324) 234-2342'),(34,'MySpace','24 MySpace Ave.',90210,'(999) 123-4567'),(43,'Apple','1 Infinite Loop',95014,'(565) 432-4534'),(55,'HP','345 Chiden Rd.',83706,'(208) 435-8485'),(61,'Facebook','89 Facebook Street',94040,'(123) 234-5677');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `Eno` int(11) NOT NULL,
  `Ename` varchar(45) DEFAULT NULL,
  `Zip` int(11) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Hdate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Eno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Andrew',95758,'(923) 398-2583','1/20/2014'),(2,'Bob',83706,'(123) 567-3748','2/21/1980'),(3,'Joe',94040,'(748) 736-7482','3/30/1999'),(4,'Jill',67202,'(764) 759-2234','2/2/2015'),(5,'Paul',94040,'(890) 800-2353','9/9/2011'),(6,'Tony',90210,'(748) 638-7494','6/28/2013'),(7,'Emma',10007,'(647) 847-7392','5/15/2000'),(8,'Tim',95014,'(545) 432-3424','8/9/2010');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odetails`
--

DROP TABLE IF EXISTS `odetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `odetails` (
  `Ono` int(11) NOT NULL,
  `Pno` int(11) NOT NULL,
  `Qty` int(11) DEFAULT NULL,
  PRIMARY KEY (`Ono`,`Pno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odetails`
--

LOCK TABLES `odetails` WRITE;
/*!40000 ALTER TABLE `odetails` DISABLE KEYS */;
INSERT INTO `odetails` VALUES (1,10,2),(2,10,1),(3,10,1),(4,10,4),(5,10,1),(6,11,10),(7,11,63),(8,11,1),(9,11,2),(10,12,40),(11,12,60),(12,12,45),(13,12,50),(14,12,66),(15,12,65),(16,12,78),(17,12,54),(18,13,11),(19,13,8),(20,13,5),(21,13,7);
/*!40000 ALTER TABLE `odetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `Ono` int(11) NOT NULL,
  `Cno` int(11) DEFAULT NULL,
  `Eno` int(11) DEFAULT NULL,
  `Received` varchar(45) DEFAULT NULL,
  `Shipped` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Ono`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,55,2,'2/28/2000','2/20/2000'),(2,43,1,'3/12/2001','3/10/2001'),(3,61,3,'3/15/2001','3/11/2001'),(4,55,2,'3/20/2001','3/18/2001'),(5,28,6,'4/11/2002','4/9/2002'),(6,55,1,'4/15/2002','4/3/2002'),(7,61,4,'4/18/2002','4/18/2002'),(8,55,5,'4/19/2002','4/10/2002'),(9,34,2,'5/20/2004','5/16/2004'),(10,43,5,'5/28/2004','5/22/2004'),(11,34,7,'6/28/2004','6/26/2004'),(12,43,8,'7/7/2005','7/1/2005'),(13,34,1,'8/10/2005','8/8/2005'),(14,55,4,'8/9/2005','8/6/2005'),(15,28,1,'5/23/2006','5/20/2006'),(16,61,7,'5/28/2006','5/23/2006'),(17,55,2,'6/13/2006','6/11/2006'),(18,34,8,'8/18/2006','7/11/2006'),(19,61,2,'9/12/2007','9/10/2007'),(20,43,3,'9/15/2007','9/10/207'),(21,55,5,'12/12/2008','12/1/2008');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parts` (
  `Pno` int(11) NOT NULL,
  `Pname` varchar(45) DEFAULT NULL,
  `Qoh` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Olevel` int(11) DEFAULT NULL,
  PRIMARY KEY (`Pno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (10,'Samsung SSD 850 Evo',1021,425,4),(11,'USB-Blaster',2355,6,2),(12,'DVD Burner',93234,10,3),(13,'Wireless Adapter',4535,21,2);
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zip_codes`
--

DROP TABLE IF EXISTS `zip_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zip_codes` (
  `zip` int(11) NOT NULL,
  `City` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`zip`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zip_codes`
--

LOCK TABLES `zip_codes` WRITE;
/*!40000 ALTER TABLE `zip_codes` DISABLE KEYS */;
INSERT INTO `zip_codes` VALUES (10007,'New York'),(67202,'Wichita'),(83706,'Boise'),(90210,'Beverly Hills'),(94040,'Moutain View'),(95014,'Cupertino'),(95758,'Sacramento'),(98052,'Redmond');
/*!40000 ALTER TABLE `zip_codes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-08 22:44:54
