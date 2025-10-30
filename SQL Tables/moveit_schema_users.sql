-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: moveit_schema
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_name` varchar(45) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `birthday` varchar(45) NOT NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE KEY `user_id_UNIQUE` (`user_name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Adi1234','Adi Las','Adi12@fake.com','0506314567','Adi12@','Female','2011-06-21'),('amit_87','Amit Levi','amit.levi@example.com','0501112233','qwerty2023','Male','1987-11-30'),('Dav12','Dav Ran','Dav@fakecom','0506314789','Dav1!','Male','2000-06-12'),('noa_22','Noa Shalev','noa.shalev@example.com','0532233445','abc123xyz','Female','2000-06-19'),('sara_b','Sara Ben-David','sara.b@example.com','0549876543','myp@ssw0rd','Female','1992-03-25'),('Shalev4rashad','Shalev Turgeman','shalevturjeman14@gmail.com','050-6317933','Siv1!','Male','2000-09-24'),('Sib123','Sib Fuk','sha@da.com','0506314789','Sha1!','Female','2008-10-16'),('Siv25','Siv Las','SivSiv@fake.com','0502300207','Siv1!','Female','2000-06-20'),('Siv254','Siv Las','SivSiv1@fake.com','0502300207','Siv1!','Female','2000-06-20'),('user123','David Cohen','david.cohen@example.com','0521234567','pass1234','Male','1995-07-12'),('yoni.k','Yoni Kalman','yoni.kalman@example.com','0589998877','kalman!2021','Male','1998-01-05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-24 20:44:06
