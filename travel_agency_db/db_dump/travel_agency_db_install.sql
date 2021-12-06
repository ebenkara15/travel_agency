CREATE DATABASE  IF NOT EXISTS `travel_agency_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `travel_agency_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_agency_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `idcoach` int NOT NULL AUTO_INCREMENT,
  `nb_seats_corr` int NOT NULL DEFAULT '50',
  `nb_seats_win` int NOT NULL DEFAULT '50',
  PRIMARY KEY (`idcoach`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the different coaches for a train';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

--
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `station` (
  `idstation` int NOT NULL AUTO_INCREMENT,
  `station_name` varchar(45) NOT NULL,
  `station_city` varchar(45) NOT NULL,
  PRIMARY KEY (`idstation`),
  KEY `station_city_idx` (`station_city`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing station served identified by an id, a name and the city in which it is located.';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `iddiscount` int NOT NULL AUTO_INCREMENT,
  `disc_desc` varchar(45) NOT NULL,
  `percentage` varchar(45) NOT NULL,
  PRIMARY KEY (`iddiscount`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the possible disount with its type and percentage to apply on ticket price';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `idclient` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `date_of_birth` date NOT NULL,
  `discount` int NOT NULL,
  `pass_hash` varchar(256) NOT NULL,
  PRIMARY KEY (`idclient`),
  KEY `client_discount_idx` (`discount`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the client';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


--
-- Table structure for table `train`
--

DROP TABLE IF EXISTS `train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train` (
  `idtrain` int NOT NULL AUTO_INCREMENT,
  `idcoach_1` int NOT NULL,
  `idcoach_2` int NOT NULL,
  `idcoach_3` int NOT NULL,
  `idcoach_4` int NOT NULL,
  `idcoach_5` int NOT NULL,
  `idcoach_6` int NOT NULL,
  `idcoach_7` int NOT NULL,
  `idcoach_8` int NOT NULL,
  PRIMARY KEY (`idtrain`),
  KEY `train_voiture_1_idx` (`idcoach_1`),
  KEY `train_voiture_2_idx` (`idcoach_2`),
  KEY `train_voiture_8_idx` (`idcoach_8`),
  KEY `train_voiture_7_idx` (`idcoach_7`),
  KEY `train_voiture_6_idx` (`idcoach_6`),
  KEY `train_voiture_5_idx` (`idcoach_5`),
  KEY `train_voiture_4_idx` (`idcoach_4`),
  KEY `train_voiture_3_idx` (`idcoach_3`),
  CONSTRAINT `train_voiture_1` FOREIGN KEY (`idcoach_1`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_2` FOREIGN KEY (`idcoach_2`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_3` FOREIGN KEY (`idcoach_3`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_4` FOREIGN KEY (`idcoach_4`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_5` FOREIGN KEY (`idcoach_5`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_6` FOREIGN KEY (`idcoach_6`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_7` FOREIGN KEY (`idcoach_7`) REFERENCES `coach` (`idcoach`),
  CONSTRAINT `train_voiture_8` FOREIGN KEY (`idcoach_8`) REFERENCES `coach` (`idcoach`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the different train';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;

--
-- Table structure for table `travel`
--

DROP TABLE IF EXISTS `travel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel` (
  `idtravel` int NOT NULL AUTO_INCREMENT,
  `station_from` int NOT NULL,
  `station_to` int NOT NULL,
  `datetime_from` datetime NOT NULL,
  `datetime_to` datetime NOT NULL,
  `price` float NOT NULL,
  `idtrain` int NOT NULL,
  `nb_seats_corr` int NOT NULL DEFAULT '400',
  `nb_seats_win` int NOT NULL DEFAULT '400',
  PRIMARY KEY (`idtravel`),
  KEY `travel_from_idx` (`station_from`,`station_to`),
  KEY `travel_train_idx` (`idtrain`),
  KEY `travel_to_idx` (`station_to`),
  CONSTRAINT `travel_from` FOREIGN KEY (`station_from`) REFERENCES `station` (`idstation`),
  CONSTRAINT `travel_to` FOREIGN KEY (`station_to`) REFERENCES `station` (`idstation`),
  CONSTRAINT `travel_train` FOREIGN KEY (`idtrain`) REFERENCES `train` (`idtrain`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the possible travel between station (with date and hour).';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `idticket` int NOT NULL AUTO_INCREMENT,
  `idclient` int NOT NULL,
  `idtravel` int NOT NULL,
  `num_seat` int NOT NULL,
  `num_coach` int NOT NULL,
  `side` varchar(45) NOT NULL,
  PRIMARY KEY (`idticket`),
  KEY `ticket_travel_idx` (`idtravel`),
  KEY `ticket_client_idx` (`idclient`),
  CONSTRAINT `ticket_client` FOREIGN KEY (`idclient`) REFERENCES `client` (`idclient`),
  CONSTRAINT `ticket_travel` FOREIGN KEY (`idtravel`) REFERENCES `travel` (`idtravel`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='The table containing the tickets booked by clients';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;

--
-- Triggers
--


DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `train_BEFORE_INSERT` BEFORE INSERT ON `train` FOR EACH ROW BEGIN
SET @idmax = (SELECT MAX(idcoach) FROM coach);
INSERT INTO coach (idcoach) 
	VALUES (@idmax+1),(@idmax+2),(@idmax+3),
		   (@idmax+4), (@idmax+5), (@idmax+6),
           (@idmax+7), (@idmax+8);
SET NEW.idcoach_1 = @idmax+1, NEW.idcoach_2 = @idmax +2, NEW.idcoach_3 = @idmax +3,
	NEW.idcoach_4 = @idmax +4, NEW.idcoach_5 = @idmax +5, NEW.idcoach_6 = @idmax +6,
    NEW.idcoach_7 = @idmax +7, NEW.idcoach_8 = @idmax +8;
END */;;

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `ticket_AFTER_INSERT` AFTER INSERT ON `ticket` FOR EACH ROW BEGIN
UPDATE travel t
SET    t.nb_seats_corr = IF(NEW.side='corr', t.nb_seats_corr - 1, t.nb_seats_corr),
	   t.nb_seats_win = IF(NEW.side='win', t.nb_seats_win - 1, t.nb_seats_win)
WHERE NEW.idtravel = t.idtravel;
END */;;

