const multer = require("multer");
const path = require("path");

// Faz a verficação do arquivo
const fileFilter = (req, file, callBack) => {

  const allowedExtensions = /jpeg|jpg|png|gif/; // Permitir determinadas extensões de imagem


  const extname = allowedExtensions.test(  // Testa para ver se a imagem é uma das permitidas
    path.extname(file.originalname).toLowerCase() // Depois do teste, pega a extensão do arquivo e coloca tudo em minusculo (GiF --> gif)
  );


  const mimetype = allowedExtensions.test(file.mimetype); // Tipo mime faz a verificação do tipo da imagem, por exemplo: image/jpeg, image/jpg. Também é importante por questões de segurança.


  if (extname && mimetype) { // Se aceitar os 2 tipos (nome da extensão e o TIPO) continua  a função.

    return callBack(null, true); // Chama o callback com null para o erro e true para indicar aceitação do arquivo

  } else {

    callBack(new Error("Apenas arquivos de imagem são permitidos!")); // Chama o callback com um novo erro indicando que apenas arquivos de imagem são permitidos
  }
};


module.exports = (caminho = null, tamanhoArq = 3) => { // Define o valor como null se nenhum caminho for declarado, o mesmo vale para o tamanho do arquivo, porém, sera 3

  // HÁ UMA DUVIDA!!!!!!!!

  // Versão com armazenamento em SGBD
  // ARMAZENA E USA O FILTRO
  if (caminho == null) { // Se o caminho não for passado

    const storage = multer.memoryStorage(); // Função oferecida pelo multer que armazena temporariamente na memoria RAM enquanto processado.

    upload = multer({ // Configura o middleware multer para lidar com o upload de arquivos.

      storage: storage, // Onde a imagem é armazenada, utilizara o storage == memoryStorage do multer para melhor processamento

      limits: { fileSize: tamanhoArq * 1024 * 1024 }, // Define o limite de tamanho do arquivo permitido, multiplicando o valor de tamanhoArq por 1024*1024 para converter de MB para bytes.

      fileFilter: fileFilter, // Aqui filtra os arquivos que poderam ser ou não aceitos no upload
    });

    // } else {
    //   // Versão com armazenamento em diretório
    //   // Definindo o diretório de armazenamento das imagens
    //   var storagePasta = multer.diskStorage({
    //     destination: (req, file, callBack) => {
    //       callBack(null, caminho); // diretório de destino
    //     },
    //     filename: (req, file, callBack) => {
    //       //renomeando o arquivo para evitar duplicidade de nomes
    //       callBack(
    //         null,
    //         file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    //       );
    //     },
    //   });
    //   upload = multer({
    //     storage: storagePasta,
    //     limits: { fileSize: tamanhoArq * 1024 * 1024 },
    //     fileFilter: fileFilter,
    //   });
    // }

    return (campoArquivo) => {
      return (req, res, next) => {

        req.session.errorMulter = null; // Declara a variavel que sera usada para armazenar informações de erro

        upload.single(campoArquivo)(req, res, function (err) { 
          if (err instanceof multer.MulterError) { // verifica se o erro fornecido é um erro do multer :D
            req.session.errorMulter = { // Criamos uma variavel de sessão forncendo as informações do erro
              value: '',
              msg: err.message,
              path: campoArquivo
            }
            console.log("Erro multer!")
          } else if (err) { // Qualquer outro  erro que não seje do Multer erro
            req.session.errorMulter = {
              value: '',
              msg: err.message,
              path: campoArquivo
            }
            console.log("Não é um erro do multer!")
          }
          next(); // Função que avança ao próximo middleware
        });
      };
    };
  }
};

// O QUE É MULTER/
// é uma biblioteca Node.js que facilita o manuseio de uploads de arquivos. Ela permite configurar como os arquivos são armazenados temporariamente no servidor antes de serem processados ou salvos em um local permanente, como um sistema de arquivos ou um banco de dados.


// ERR INSTACEOF:
// A expressão err instanceof AlgumTipo é usada em JavaScript para verificar se o objeto err é uma instância de uma classe específica ou de um tipo de objeto. Aqui está como funciona:

// MULTERERROR:
// Usado para indicar erros especificos do multer como: tamanho do arquivo, Tipo da imagem e qualquer outro erro dentor de UPLOAD

// FUTURO
// Estudar mais sobre multer