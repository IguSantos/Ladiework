-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.31

-- Tabelas: 
  -- chat
  -- cursos
  -- forma de pagamento
  -- material
  -- instrutor
  -- instrutor_pode_criar_cursos
  -- pagamento_mentora
  -- pagamento_cursos
  -- usuario
  -- usuario_contrata_cursos
  -- usuario_contrata_mentora
  -- video_aulas



DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;

CREATE TABLE `chat` (
  `ID_CHAT` int NOT NULL AUTO_INCREMENT,
  `MENTORA_ID_MENTORA` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA` int NOT NULL,
  `MENSAGEM_CHAT` longtext NOT NULL,
  `DATA_HORA_CHAT` datetime NOT NULL,
  PRIMARY KEY (`ID_CHAT`,`MENTORA_ID_MENTORA`,`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`),
  KEY `fk_CHAT_MENTORIA1_idx` (`MENTORA_ID_MENTORA`),
  KEY `fk_CHAT_USUARIO_CONTRATA_MENTORIA1_idx` (`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`),
  CONSTRAINT `fk_CHAT_MENTORIA1` FOREIGN KEY (`MENTORA_ID_MENTORA`) REFERENCES `mentora` (`ID_MENTORA`),
  CONSTRAINT `fk_CHAT_USUARIO_CONTRATA_MENTORIA1` FOREIGN KEY (`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`, `USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`, `USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`) REFERENCES `usuario_contrata_mentora` (`USUARIO_ID_USUARIO`, `MENTORA_USUARIO_ID_USUARIO`, `MENTORA_ID_MENTORA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `ID_CURSOS` int NOT NULL AUTO_INCREMENT,
  `TITULO_CURSOS` varchar(60) NOT NULL,
  `CONTEUDO_PROGRAMATICO_CURSOS` longtext NOT NULL,
  `DURACAO_CURSOS` float NOT NULL,
  `NIVEL_DIFICUL_CURSOS` enum('Fácil','Médio','Difícil') NOT NULL,
  `PRECO_CURSOS` float NOT NULL,
  `DESCRICAO_CURSOS` mediumtext NOT NULL,
  `FOTO_CURSOS` blob NOT NULL,
  `CATEGORIA_CURSOS` varchar(50) NOT NULL,
  `AVALIACOES_CURSOS` mediumtext NOT NULL,
  PRIMARY KEY (`ID_CURSOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma de pagamento`
--

DROP TABLE IF EXISTS `forma de pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma de pagamento` (
  `ID_FORMAPAGTO` int NOT NULL AUTO_INCREMENT,
  `PIX_EMAIL_FORMAPAGTO` varchar(100) NOT NULL,
  `PIX_CPF_FORMAPAGTO` char(11) NOT NULL,
  `PIX_CHAVE_ALEATORIA_FORMAPAGTO` varbinary(32) NOT NULL,
  `PIX_CELULAR_FORMAPAGTO` char(14) NOT NULL,
  `CARTAO_FORMAPAGTO` varbinary(2048) NOT NULL,
  PRIMARY KEY (`ID_FORMAPAGTO`),
  UNIQUE KEY `PIX_EMAIL_FORMAPAGTO_UNIQUE` (`PIX_EMAIL_FORMAPAGTO`),
  UNIQUE KEY `PIX_CPF_FORMAPAGTO_UNIQUE` (`PIX_CPF_FORMAPAGTO`),
  UNIQUE KEY `FORMA DE PAGAMENTOcol_UNIQUE` (`CARTAO_FORMAPAGTO`),
  UNIQUE KEY `PIX_CHAVE_ALEATORIA_FORMAPAGTO_UNIQUE` (`PIX_CHAVE_ALEATORIA_FORMAPAGTO`),
  UNIQUE KEY `PIX_CELULAR_FORMAPAGTO_UNIQUE` (`PIX_CELULAR_FORMAPAGTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma de pagamento`
--

LOCK TABLES `forma de pagamento` WRITE;
/*!40000 ALTER TABLE `forma de pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma de pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrutor`
--

DROP TABLE IF EXISTS `instrutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrutor` (
  `ID_INSTRUTOR` int NOT NULL AUTO_INCREMENT,
  `NOME_INSTRUTOR` varchar(100) NOT NULL,
  `EMAIL_INSTRUTOR` varchar(100) NOT NULL,
  `CELULAR_INSTRUTOR` char(14) NOT NULL,
  `USUARIO_ID_USUARIO` int NOT NULL,
  PRIMARY KEY (`ID_INSTRUTOR`),
  UNIQUE KEY `CELULAR_INSTRUTOR_UNIQUE` (`CELULAR_INSTRUTOR`),
  UNIQUE KEY `EMAIL_INSTRUTOR_UNIQUE` (`EMAIL_INSTRUTOR`),
  KEY `fk_INSTRUTOR_USUARIO1_idx` (`USUARIO_ID_USUARIO`),
  CONSTRAINT `fk_INSTRUTOR_USUARIO1` FOREIGN KEY (`USUARIO_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrutor`
--

LOCK TABLES `instrutor` WRITE;
/*!40000 ALTER TABLE `instrutor` DISABLE KEYS */;
/*!40000 ALTER TABLE `instrutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrutor_pode_criar_cursos`
--

DROP TABLE IF EXISTS `instrutor_pode_criar_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrutor_pode_criar_cursos` (
  `INSTRUTOR_ID_INSTRUTOR` int NOT NULL,
  `CURSOS_ID_CURSOS` int NOT NULL,
  PRIMARY KEY (`INSTRUTOR_ID_INSTRUTOR`,`CURSOS_ID_CURSOS`),
  KEY `fk_INSTRUTOR_has_CURSOS_CURSOS1_idx` (`CURSOS_ID_CURSOS`),
  KEY `fk_INSTRUTOR_has_CURSOS_INSTRUTOR1_idx` (`INSTRUTOR_ID_INSTRUTOR`),
  CONSTRAINT `fk_INSTRUTOR_has_CURSOS_CURSOS1` FOREIGN KEY (`CURSOS_ID_CURSOS`) REFERENCES `cursos` (`ID_CURSOS`),
  CONSTRAINT `fk_INSTRUTOR_has_CURSOS_INSTRUTOR1` FOREIGN KEY (`INSTRUTOR_ID_INSTRUTOR`) REFERENCES `instrutor` (`ID_INSTRUTOR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrutor_pode_criar_cursos`
--

LOCK TABLES `instrutor_pode_criar_cursos` WRITE;
/*!40000 ALTER TABLE `instrutor_pode_criar_cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `instrutor_pode_criar_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `ID_MATERIAL` int NOT NULL AUTO_INCREMENT,
  `TITULO_MATERIAL` varchar(60) NOT NULL,
  `DESCRICAO_MATERIAL` mediumtext NOT NULL,
  `ARQUIVOS_MATERIAL` blob NOT NULL,
  `CURSOS_ID_CURSOS` int NOT NULL,
  PRIMARY KEY (`ID_MATERIAL`,`CURSOS_ID_CURSOS`),
  KEY `fk_MATERIAL_CURSOS1_idx` (`CURSOS_ID_CURSOS`),
  CONSTRAINT `fk_MATERIAL_CURSOS1` FOREIGN KEY (`CURSOS_ID_CURSOS`) REFERENCES `cursos` (`ID_CURSOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentora`
--

DROP TABLE IF EXISTS `mentora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentora` (
  `ID_MENTORA` int NOT NULL AUTO_INCREMENT,
  `REDES_SOCIAIS_MENTORA` varchar(30) DEFAULT NULL,
  `FORM_ACADEMICA_MENTORA` mediumtext NOT NULL,
  `DISPONIBILIDADE_HORARIO_MENTORA` datetime NOT NULL,
  `PREFERENCIAS_REMOTAS_MENTORA` enum('online','presencial') NOT NULL,
  `RESTRICOES_MENTORA` mediumtext NOT NULL,
  `STATUS_MENTORA` enum('ativa','inativa') NOT NULL,
  `NOME_MENTORA` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_MENTORA`),
  UNIQUE KEY `REDES_SOCIAIS_MENTORA_UNIQUE` (`REDES_SOCIAIS_MENTORA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentora`
--

LOCK TABLES `mentora` WRITE;
/*!40000 ALTER TABLE `mentora` DISABLE KEYS */;
/*!40000 ALTER TABLE `mentora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento_cursos`
--

DROP TABLE IF EXISTS `pagamento_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento_cursos` (
  `ID_PAGTOCURSOS` int NOT NULL AUTO_INCREMENT,
  `STATUS_PAGTOCURSOS` enum('Pago','Não Pago','Pendente') NOT NULL,
  `VALOR_PAGO_PAGTOCURSOS` decimal(10,0) NOT NULL,
  `DATA_PAGTOCURSOS` datetime NOT NULL,
  `FORMA DE PAGAMENTO_ID_FORMAPAGTO` int NOT NULL,
  `USUARIO_CONTRATA_CURSOS_USUARIO_ID_USUARIO` int NOT NULL,
  `USUARIO_CONTRATA_CURSOS_CURSOS_ID_CURSOS` int NOT NULL,
  PRIMARY KEY (`ID_PAGTOCURSOS`,`FORMA DE PAGAMENTO_ID_FORMAPAGTO`,`USUARIO_CONTRATA_CURSOS_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_CURSOS_CURSOS_ID_CURSOS`),
  KEY `fk_PAGAMENTO_FORMA DE PAGAMENTO1_idx` (`FORMA DE PAGAMENTO_ID_FORMAPAGTO`),
  KEY `fk_PAGAMENTO_CURSOS_USUARIO_CONTRATA_CURSOS1_idx` (`USUARIO_CONTRATA_CURSOS_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_CURSOS_CURSOS_ID_CURSOS`),
  CONSTRAINT `fk_PAGAMENTO_CURSOS_USUARIO_CONTRATA_CURSOS1` FOREIGN KEY (`USUARIO_CONTRATA_CURSOS_USUARIO_ID_USUARIO`, `USUARIO_CONTRATA_CURSOS_CURSOS_ID_CURSOS`) REFERENCES `usuario_contrata_cursos` (`USUARIO_ID_USUARIO`, `CURSOS_ID_CURSOS`),
  CONSTRAINT `fk_PAGAMENTO_FORMA DE PAGAMENTO1` FOREIGN KEY (`FORMA DE PAGAMENTO_ID_FORMAPAGTO`) REFERENCES `forma de pagamento` (`ID_FORMAPAGTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento_cursos`
--

LOCK TABLES `pagamento_cursos` WRITE;
/*!40000 ALTER TABLE `pagamento_cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamento_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagamento_mentora`
--

DROP TABLE IF EXISTS `pagamento_mentora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagamento_mentora` (
  `ID_PAGTOMENT` int NOT NULL AUTO_INCREMENT,
  `STATUS_PAGTOMENTORA` enum('Pago','Não Pago','Pendente') NOT NULL,
  `VALOR_PAGO_PAGTOMENTORA` decimal(10,0) NOT NULL,
  `DATA_PAGTOMENTORA` datetime NOT NULL,
  `FORMA DE PAGAMENTO_ID_FORMAPAGTO` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO` int NOT NULL,
  `USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA` int NOT NULL,
  PRIMARY KEY (`ID_PAGTOMENT`,`FORMA DE PAGAMENTO_ID_FORMAPAGTO`,`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`),
  KEY `fk_PAGAMENTO_MENTORA_FORMA DE PAGAMENTO1_idx` (`FORMA DE PAGAMENTO_ID_FORMAPAGTO`),
  KEY `fk_PAGAMENTO_MENTORA_USUARIO_CONTRATA_MENTORA1_idx` (`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`,`USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`),
  CONSTRAINT `fk_PAGAMENTO_MENTORA_FORMA DE PAGAMENTO1` FOREIGN KEY (`FORMA DE PAGAMENTO_ID_FORMAPAGTO`) REFERENCES `forma de pagamento` (`ID_FORMAPAGTO`),
  CONSTRAINT `fk_PAGAMENTO_MENTORA_USUARIO_CONTRATA_MENTORA1` FOREIGN KEY (`USUARIO_CONTRATA_MENTORA_USUARIO_ID_USUARIO`, `USUARIO_CONTRATA_MENTORA_MENTORA_USUARIO_ID_USUARIO`, `USUARIO_CONTRATA_MENTORA_MENTORA_ID_MENTORA`) REFERENCES `usuario_contrata_mentora` (`USUARIO_ID_USUARIO`, `MENTORA_USUARIO_ID_USUARIO`, `MENTORA_ID_MENTORA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagamento_mentora`
--

LOCK TABLES `pagamento_mentora` WRITE;
/*!40000 ALTER TABLE `pagamento_mentora` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagamento_mentora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `EMAIL_USUARIO` varchar(100) NOT NULL,
  `CELULAR_USUARIO` char(14) DEFAULT NULL,
  `NOME_USUARIO` varchar(100) NOT NULL,
  `FOTO_USUARIO` blob,
  `CPF_USUARIO` char(11) NOT NULL,
  `DT_NASC_USUARIO` date NOT NULL,
  `DESCRICAO_USUARIO` mediumtext,
  `HISTORICO_PROFISSIONAL_USUARIO` mediumtext,
  `ENDERECO_USUARIO` varchar(120) NOT NULL,
  `SENHA` varbinary(32) NOT NULL,
  `MENTORA_ID_MENTORA` int NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `EMAIL_MENTORA_UNIQUE` (`EMAIL_USUARIO`),
  UNIQUE KEY `CPF_USUARIO_UNIQUE` (`CPF_USUARIO`),
  UNIQUE KEY `SENHA_UNIQUE` (`SENHA`),
  UNIQUE KEY `CELULAR_MENTORA_UNIQUE` (`CELULAR_USUARIO`),
  KEY `fk_USUARIO_MENTORIA1_idx` (`MENTORA_ID_MENTORA`),
  CONSTRAINT `fk_USUARIO_MENTORIA1` FOREIGN KEY (`MENTORA_ID_MENTORA`) REFERENCES `mentora` (`ID_MENTORA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_contrata_cursos`
--

DROP TABLE IF EXISTS `usuario_contrata_cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_contrata_cursos` (
  `USUARIO_ID_USUARIO` int NOT NULL,
  `CURSOS_ID_CURSOS` int NOT NULL,
  PRIMARY KEY (`USUARIO_ID_USUARIO`,`CURSOS_ID_CURSOS`),
  KEY `fk_USUARIO_has_CURSOS_CURSOS1_idx` (`CURSOS_ID_CURSOS`),
  KEY `fk_USUARIO_has_CURSOS_USUARIO1_idx` (`USUARIO_ID_USUARIO`),
  CONSTRAINT `fk_USUARIO_has_CURSOS_CURSOS1` FOREIGN KEY (`CURSOS_ID_CURSOS`) REFERENCES `cursos` (`ID_CURSOS`),
  CONSTRAINT `fk_USUARIO_has_CURSOS_USUARIO1` FOREIGN KEY (`USUARIO_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_contrata_cursos`
--

LOCK TABLES `usuario_contrata_cursos` WRITE;
/*!40000 ALTER TABLE `usuario_contrata_cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_contrata_cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_contrata_mentora`
--

DROP TABLE IF EXISTS `usuario_contrata_mentora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_contrata_mentora` (
  `USUARIO_ID_USUARIO` int NOT NULL,
  `MENTORA_USUARIO_ID_USUARIO` int NOT NULL,
  `MENTORA_ID_MENTORA` int NOT NULL,
  PRIMARY KEY (`USUARIO_ID_USUARIO`,`MENTORA_USUARIO_ID_USUARIO`,`MENTORA_ID_MENTORA`),
  KEY `fk_perfil_has_mentoria_perfil1_idx` (`USUARIO_ID_USUARIO`),
  KEY `fk_PERFIL_HAS_MENTORIA_MENTORIA1_idx` (`MENTORA_ID_MENTORA`),
  CONSTRAINT `fk_PERFIL_HAS_MENTORIA_MENTORIA1` FOREIGN KEY (`MENTORA_ID_MENTORA`) REFERENCES `mentora` (`ID_MENTORA`),
  CONSTRAINT `fk_perfil_has_mentoria_perfil1` FOREIGN KEY (`USUARIO_ID_USUARIO`) REFERENCES `usuario` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_contrata_mentora`
--

LOCK TABLES `usuario_contrata_mentora` WRITE;
/*!40000 ALTER TABLE `usuario_contrata_mentora` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_contrata_mentora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videoaulas`
--

DROP TABLE IF EXISTS `videoaulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videoaulas` (
  `ID_VIDEOAULAS` int NOT NULL AUTO_INCREMENT,
  `TITULO_VIDEOAULAS` varchar(60) NOT NULL,
  `URL_VIDEOAULAS` varchar(255) NOT NULL,
  `DESCRICAO_VIDEOAULAS` mediumtext NOT NULL,
  `CURSOS_ID_CURSOS` int NOT NULL,
  PRIMARY KEY (`ID_VIDEOAULAS`,`CURSOS_ID_CURSOS`),
  UNIQUE KEY `URL_VIDEOAULAS_UNIQUE` (`URL_VIDEOAULAS`),
  KEY `fk_VIDEOAULAS_CURSOS1_idx` (`CURSOS_ID_CURSOS`),
  CONSTRAINT `fk_VIDEOAULAS_CURSOS1` FOREIGN KEY (`CURSOS_ID_CURSOS`) REFERENCES `cursos` (`ID_CURSOS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videoaulas`
--

LOCK TABLES `videoaulas` WRITE;
/*!40000 ALTER TABLE `videoaulas` DISABLE KEYS */;
/*!40000 ALTER TABLE `videoaulas` ENABLE KEYS */;
UNLOCK TABLES;
