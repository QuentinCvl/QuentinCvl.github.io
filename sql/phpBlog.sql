-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 05 avr. 2022 à 22:05
-- Version du serveur :  8.0.28-0ubuntu0.20.04.3
-- Version de PHP : 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `phpBlog`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int NOT NULL,
  `postID` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `message` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `publishedThe` date NOT NULL,
  `validated` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id`, `postID`, `username`, `message`, `publishedThe`, `validated`) VALUES
(5, 1, 'Eclecticism', 'Bozkfqozk feqfez ', '2022-01-14', 1),
(7, 1, 'Michel', 'Wouah !', '2022-01-15', 1),
(8, 3, 'Brenda', 'Incroyable !', '2022-01-15', 1),
(9, 3, 'Timothé', 'Super !', '2022-01-15', 1),
(10, 3, 'Michou', 'Pas mal !', '2022-01-15', 1),
(11, 15, 'Nicolas', 'Bien formulé !', '2022-01-15', 1),
(12, 1, 'Patrick', 'rigolo !', '2022-01-15', 1),
(13, 11, 'Lea', 'Amusant !', '2022-01-15', 1),
(14, 14, 'Pierre', 'blabla', '2022-01-15', 1),
(15, 2, 'Monique', 'qegeq', '2022-01-15', 1),
(16, 9, 'Nicole', 'Hallucinant !', '2022-01-15', 1),
(17, 1, 'Mike', 'Bonjour !', '2022-01-15', 1),
(18, 1, 'Bernard', 'Salut !', '2022-01-15', 1),
(19, 1, 'Eclecticism', 'J\'en été sur !', '2022-01-15', 1),
(20, 1, 'f', '\"H\"; DELETE FROM comment', '2022-02-02', 0),
(21, 1, 'Eclecticism', '', '2022-02-20', 1);

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int NOT NULL,
  `fav` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(250) NOT NULL,
  `thumbnail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userID` int NOT NULL,
  `createdThe` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateThe` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `fav`, `title`, `thumbnail`, `content`, `userID`, `createdThe`) VALUES
(1, 1, 'Ce que votre préférence musicale dit de vous et de votre personnalité !', '1.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim tortor felis, at sollicitudin elit venenatis ac. Vestibulum gravida nunc arcu, convallis scelerisque dolor finibus quis. Etiam at leo sit amet lectus ornare vehicula a eu purus. Aliquam nec mi dictum, laoreet mauris blandit, vulputate velit. Aliquam a ex quis velit condimentum aliquam quis eu nunc. Ut cursus ligula in nibh vulputate, id venenatis dolor feugiat. Donec eget eros augue.  Proin vestibulum mauris at mi facilisis, sed venenatis est tempus. Aliquam vel erat diam. Sed ultrices neque ligula, tempus faucibus sapien laoreet ut. Etiam ac bibendum justo. In iaculis ex vel diam euismod, sed rhoncus ante commodo. Fusce sed pharetra elit. \r\n\r\nClass aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis et fringilla ipsum, vitae suscipit lectus. Nulla eget aliquam arcu. Ut pulvinar sed orci quis sollicitudin. Cras aliquet orci vitae felis lacinia, id posuere eros ultricies. Maecenas eu metus nunc. Suspendisse egestas ligula sem, vel finibus nisl commodo ut. Sed dictum augue posuere nisl posuere dictum. Nam sit amet ex aliquam, commodo metus vel, mattis risus.  Vivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa. Etiam gravida interdum nisl eu malesuada. \r\n\r\nPhasellus sed iaculis quam. Integer vel viverra diam. Quisque sagittis sapien purus, id molestie mi malesuada eu. Sed quis ante nisi. In dictum libero ac ipsum porta, lacinia vulputate tellus porta. Mauris tincidunt nisi orci, eu volutpat justo consequat et. Aliquam malesuada euismod risus sagittis lobortis. Donec id metus felis. Integer vel lacus porttitor eros pulvinar venenatis.', 1, '2021-10-17 08:05:06'),
(2, 1, 'Montre connecté, les nouveautés !', '2.jpg', 'Le Charge 5 vient compléter l’écosystème de Fitbit. La marque américaine, rachetée par Google, conserve pour l’heure son identité propre, et continue de miser sur sa propre interface. Il faudra sans doute attendre l’année prochaine pour découvrir ses premiers produits sous Wear OS. Son dernier bracelet connecté rappelle notamment la montre Sense dont il adopte certaines fonctionnalités dédiées à la santé, tel son capteur ECG, mais pour un prix moindre — et d’incontournables concessions ergonomiques.\r\n\r\nNulla ac ullamcorper tortor. Suspendisse eleifend felis dapibus purus tristique, eu finibus nisi suscipit. Curabitur et lacus malesuada, convallis quam sed, rutrum diam. Mauris nunc augue, volutpat auctor congue vel, iaculis sed enim. Nullam scelerisque purus sed odio scelerisque porta. Quisque facilisis eros ullamcorper eros bibendum molestie. Sed dignissim diam eget ligula blandit, sit amet sagittis elit bibendum. Fusce diam velit, ullamcorper vitae scelerisque sit amet, ullamcorper sed sem. Vestibulum mattis dui non semper dignissim. Ut gravida dolor in fringilla aliquam. Proin fringilla felis ut dolor commodo volutpat. Vivamus dictum ligula sit amet accumsan ornare. Pellentesque id suscipit ligula.', 1, '2021-10-17 08:48:08'),
(3, 1, 'Retour au bon vieux temps', '3.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim tortor felis, at sollicitudin elit venenatis ac. Vestibulum gravida nunc arcu, convallis scelerisque dolor finibus quis. Etiam at leo sit amet lectus ornare vehicula a eu purus. Aliquam nec mi dictum, laoreet mauris blandit, vulputate velit. Aliquam a ex quis velit condimentum aliquam quis eu nunc. Ut cursus ligula in nibh vulputate, id venenatis dolor feugiat. Donec eget eros augue.\r\n\r\nProin vestibulum mauris at mi facilisis, sed venenatis est tempus. Aliquam vel erat diam. Sed ultrices neque ligula, tempus faucibus sapien laoreet ut. Etiam ac bibendum justo. In iaculis ex vel diam euismod, sed rhoncus ante commodo. Fusce sed pharetra elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis et fringilla ipsum, vitae suscipit lectus. Nulla eget aliquam arcu. Ut pulvinar sed orci quis sollicitudin. Cras aliquet orci vitae felis lacinia, id posuere eros ultricies. Maecenas eu metus nunc. Suspendisse egestas ligula sem, vel finibus nisl commodo ut. Sed dictum augue posuere nisl posuere dictum. Nam sit amet ex aliquam, commodo metus vel, mattis risus.\r\n\r\nVivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa. Etiam gravida interdum nisl eu malesuada. Phasellus sed iaculis quam. Integer vel viverra diam. Quisque sagittis sapien purus, id molestie mi malesuada eu. Sed quis ante nisi. In dictum libero ac ipsum porta, lacinia vulputate tellus porta. Mauris tincidunt nisi orci, eu volutpat justo consequat et. Aliquam malesuada euismod risus sagittis lobortis. Donec id metus felis. Integer vel lacus porttitor eros pulvinar venenatis.', 1, '2021-10-19 11:20:30'),
(9, 0, 'Juillet 2021 le Monymusk Plantation Classic Gold Rum', '9.jpg', 'Ce rhum Monymusk est un rhum jamaïcain pur souche. Il a une magnifique couleur dorée qui lui vaut son nom de Gold Rum. C’est un rhum extrêmement qualitatif et aromatique. Il est la résultante d’un assemblage de plusieurs rhums ayant vieillis au moins 5 ans dans des ex fûts de chêne américains ayant contenu au préalable du Bourbon.\r\nLe domaine Monymusk a été fondé en 1755. La famille Grant du château de Monymusk, en Écosse, obtient la plantation grâce au mariage de leur fils avec la fille d’Elizabeth Callandar. En 1901, le colonel C.J. Ward prend possession du domaine. Il est à l’époque l’un des plus anciens domaines producteurs de rhum en Jamaïque.', 1, '2021-11-28 16:27:48'),
(11, 0, 'Musique : ...', '11.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim tortor felis, at sollicitudin elit venenatis ac. Vestibulum gravida nunc arcu, convallis scelerisque dolor finibus quis. Etiam at leo sit amet lectus ornare vehicula a eu purus. Aliquam nec mi dictum, laoreet mauris blandit, vulputate velit. Aliquam a ex quis velit condimentum aliquam quis eu nunc. Ut cursus ligula in nibh vulputate, id venenatis dolor feugiat. Donec eget eros augue.\r\n\r\nProin vestibulum mauris at mi facilisis, sed venenatis est tempus. Aliquam vel erat diam. Sed ultrices neque ligula, tempus faucibus sapien laoreet ut. Etiam ac bibendum justo. In iaculis ex vel diam euismod, sed rhoncus ante commodo. Fusce sed pharetra elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis et fringilla ipsum, vitae suscipit lectus. Nulla eget aliquam arcu. Ut pulvinar sed orci quis sollicitudin. Cras aliquet orci vitae felis lacinia, id posuere eros ultricies. Maecenas eu metus nunc. Suspendisse egestas ligula sem, vel finibus nisl commodo ut. Sed dictum augue posuere nisl posuere dictum. Nam sit amet ex aliquam, commodo metus vel, mattis risus.\r\n\r\nVivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa. Etiam gravida interdum nisl eu malesuada. Phasellus sed iaculis quam. Integer vel viverra diam. Quisque sagittis sapien purus, id molestie mi malesuada eu. Sed quis ante nisi. In dictum libero ac ipsum porta, lacinia vulputate tellus porta. Mauris tincidunt nisi orci, eu volutpat justo consequat et. Aliquam malesuada euismod risus sagittis lobortis. Donec id metus felis. Integer vel lacus porttitor eros pulvinar venenatis.', 1, '2021-12-11 15:17:03'),
(14, 0, 'Dream Ordie', '14.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim tortor felis, at sollicitudin elit venenatis ac. Vestibulum gravida nunc arcu, convallis scelerisque dolor finibus quis. Etiam at leo sit amet lectus ornare vehicula a eu purus. Aliquam nec mi dictum, laoreet mauris blandit, vulputate velit. Aliquam a ex quis velit condimentum aliquam quis eu nunc. Ut cursus ligula in nibh vulputate, id venenatis dolor feugiat. Donec eget eros augue.\r\n\r\nProin vestibulum mauris at mi facilisis, sed venenatis est tempus. Aliquam vel erat diam. Sed ultrices neque ligula, tempus faucibus sapien laoreet ut. Etiam ac bibendum justo. In iaculis ex vel diam euismod, sed rhoncus ante commodo. Fusce sed pharetra elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis et fringilla ipsum, vitae suscipit lectus. Nulla eget aliquam arcu. Ut pulvinar sed orci quis sollicitudin. Cras aliquet orci vitae felis lacinia, id posuere eros ultricies. Maecenas eu metus nunc. Suspendisse egestas ligula sem, vel finibus nisl commodo ut. Sed dictum augue posuere nisl posuere dictum. Nam sit amet ex aliquam, commodo metus vel, mattis risus.\r\n\r\nVivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa. Etiam gravida interdum nisl eu malesuada. Phasellus sed iaculis quam. Integer vel viverra diam. Quisque sagittis sapien purus, id molestie mi malesuada eu. Sed quis ante nisi. In dictum libero ac ipsum porta, lacinia vulputate tellus porta. Mauris tincidunt nisi orci, eu volutpat justo consequat et. Aliquam malesuada euismod risus sagittis lobortis. Donec id metus felis. Integer vel lacus porttitor eros pulvinar venenatis.', 1, '2021-12-11 17:36:51'),
(15, 0, 'QUINTÉ+  Pronostics Quinté+ 100 % GRATUIT', '15.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim tortor felis, at sollicitudin elit venenatis ac. Vestibulum gravida nunc arcu, convallis scelerisque dolor finibus quis. Etiam at leo sit amet lectus ornare vehicula a eu purus. Aliquam nec mi dictum, laoreet mauris blandit, vulputate velit. Aliquam a ex quis velit condimentum aliquam quis eu nunc. Ut cursus ligula in nibh vulputate, id venenatis dolor feugiat. Donec eget eros augue.\r\n\r\nProin vestibulum mauris at mi facilisis, sed venenatis est tempus. Aliquam vel erat diam. Sed ultrices neque ligula, tempus faucibus sapien laoreet ut. Etiam ac bibendum justo. In iaculis ex vel diam euismod, sed rhoncus ante commodo. Fusce sed pharetra elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis et fringilla ipsum, vitae suscipit lectus. Nulla eget aliquam arcu. Ut pulvinar sed orci quis sollicitudin. Cras aliquet orci vitae felis lacinia, id posuere eros ultricies. Maecenas eu metus nunc. Suspendisse egestas ligula sem, vel finibus nisl commodo ut. Sed dictum augue posuere nisl posuere dictum. Nam sit amet ex aliquam, commodo metus vel, mattis risus.\r\n\r\nVivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa. Etiam gravida interdum nisl eu malesuada. Phasellus sed iaculis quam. Integer vel viverra diam. Quisque sagittis sapien purus, id molestie mi malesuada eu. Sed quis ante nisi. In dictum libero ac ipsum porta, lacinia vulputate tellus porta. Mauris tincidunt nisi orci, eu volutpat justo consequat et. Aliquam malesuada euismod risus sagittis lobortis. Donec id metus felis. Integer vel lacus porttitor eros pulvinar venenatis.', 1, '2021-12-18 06:08:45');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`, `bio`) VALUES
(1, 'contact@quentincvl.fr', 'Eclecticism', '$2y$10$rTvIt8/5lFG0rXKSAa.ek.svM5thvbNpOz8vnf6P2CzwJ3RVy87eK', 'Vivamus sed vestibulum orci. Integer suscipit convallis elit at luctus. Suspendisse hendrerit ligula in ligula tempus, scelerisque lacinia diam rhoncus. Integer rhoncus metus in mi eleifend fermentum id nec nulla. Nunc at posuere nisl. Integer eu ligula massa.');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_post_id` (`postID`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_user_id` (`userID`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`postID`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_post_user_id` FOREIGN KEY (`userID`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
