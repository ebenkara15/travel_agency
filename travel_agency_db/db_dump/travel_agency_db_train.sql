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
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-02 17:02:59
