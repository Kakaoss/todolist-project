-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2023 at 10:14 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todolist`
--

-- --------------------------------------------------------

--
-- Table structure for table `historia_zadania`
--

CREATE TABLE `historia_zadania` (
  `id_zadania` int(11) NOT NULL,
  `data_zadania` date NOT NULL,
  `nazwa_zadania` text NOT NULL,
  `opis_zadania` varchar(250) NOT NULL,
  `czy_wkonane` tinyint(1) NOT NULL DEFAULT 0,
  `nr_sali` int(11) NOT NULL,
  `id_uzytkownik` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notatka`
--

CREATE TABLE `notatka` (
  `id_notatki` int(11) NOT NULL,
  `tresc` text NOT NULL,
  `id_uzytkownik` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id_uzytkownik` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `haslo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `zadania`
--

CREATE TABLE `zadania` (
  `id_zadania` int(11) NOT NULL,
  `data_zadania` date NOT NULL,
  `nazwa_zadania` text NOT NULL,
  `opis_zadania` varchar(250) NOT NULL,
  `czy_wykonane` tinyint(1) NOT NULL DEFAULT 0,
  `nr_sali` int(11) NOT NULL,
  `id_uzytkownik` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Triggers `zadania`
--
DELIMITER $$
CREATE TRIGGER `zadania_DELETE_HISTORIA` AFTER DELETE ON `zadania` FOR EACH ROW BEGIN 
INSERT INTO historia_zadania (id_zadania, data_zadania,nazwa_zadania , opis_zadania, czy_wykonane, nr_sali, id_uzytkownik)
VALUES (OLD.id_zadania, 'OLD.data_zadania','OLD.nazwa_zadania', 'OLD.opis_zadania', OLD.czy_wykonane, OLD.nr_sali, OLD.id_uzytkownik);
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `historia_zadania`
--
ALTER TABLE `historia_zadania`
  ADD PRIMARY KEY (`id_zadania`);

--
-- Indexes for table `notatka`
--
ALTER TABLE `notatka`
  ADD PRIMARY KEY (`id_notatki`),
  ADD KEY `id_uzytkownik` (`id_uzytkownik`);

--
-- Indexes for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id_uzytkownik`);

--
-- Indexes for table `zadania`
--
ALTER TABLE `zadania`
  ADD PRIMARY KEY (`id_zadania`),
  ADD KEY `id_uzytkownik` (`id_uzytkownik`);

--
-- AUTO_INCREMENT for dumped tables
--


--
-- Constraints for dumped tables
--

--
-- Constraints for table `notatka`
--
ALTER TABLE `notatka`
  ADD CONSTRAINT `notatka_ibfk_1` FOREIGN KEY (`id_uzytkownik`) REFERENCES `uzytkownicy` (`id_uzytkownik`);

--
-- Constraints for table `zadania`
--
ALTER TABLE `zadania`
  ADD CONSTRAINT `zadania_ibfk_1` FOREIGN KEY (`id_uzytkownik`) REFERENCES `uzytkownicy` (`id_uzytkownik`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
