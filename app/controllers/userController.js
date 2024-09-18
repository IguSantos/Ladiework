const user = require("../models/usermodel");
const mentoring = require("../models/mentoringmodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const userController = {
    validationRulesFormCad: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 }).withMessage("Mínimo de 4 letras e máximo de 45!"),
        body("email_usu")
            .isEmail().withMessage("Digite um e-mail válido!"),
        body("senha_usu")
            .isStrongPassword().withMessage("A senha deve ter no mínimo 8 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)"),
        body("numero_usu")
            .isMobilePhone("pt-BR", { min: 11, max: 11 }).withMessage("Coloque seu número de telefone correto!")
    ],

    cadastrar: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log("Erros de validação:", errors.array());
            return res.render("pages/main", {
                pagina: "home",
                logado: null,
                errorsList: errors.array(),
                dadosNotificacao: null,
                valores: req.body
            });
        }

        const dataForm = {
            NOME_USUARIO: req.body.nome_usu,
            SENHA_USUARIO: bcrypt.hashSync(req.body.senha_usu, salt),
            EMAIL_USUARIO: req.body.email_usu,
            FOTO_USUARIO: req.file ? req.file.buffer : null,
            CELULAR_USUARIO: req.body.numero_usu,
            DT_NASC_USUARIO: req.body.aniversario_usu,
            DT_CRIACAO_CONTA_USUARIO: new Date()
        };

        if (req.file) {
            dataForm.FOTO_USUARIO = req.file.buffer;
        } else {
            console.log("Falha no carregamento da imagem");
        }

        try {
            const result = await user.create(dataForm);

            // Verifique o que foi retornado
            console.log("Resultado da criação do usuário:", result);

            // Verifique se o ID está definido
            if (!result || !result.ID_USUARIO) {
                console.log("Erro: ID do usuário é undefined");
                throw new Error("ID do usuário não foi retornado.");
            }

            const criacaoDate = dataForm.DT_CRIACAO_CONTA_USUARIO;
            const options = { month: 'long', year: 'numeric' };
            const criacaoFormatada = new Intl.DateTimeFormat('pt-BR', options).format(criacaoDate);

            req.session.logado = {
                id: result.ID_USUARIO, // Certifique-se de que o ID está sendo corretamente definido
                nome: dataForm.NOME_USUARIO,
                email: dataForm.EMAIL_USUARIO,
                telefone: dataForm.CELULAR_USUARIO,
                criacao: criacaoFormatada,
                foto: dataForm.FOTO_USUARIO ? `data:image/jpeg;base64,${dataForm.FOTO_USUARIO.toString('base64')}` : null
            };

            console.log("ID do usuário salvo na sessão:", req.session.logado.id);

            res.render("pages/main", {
                pagina: "home",
                errorsList: null,
                mentoring: null,
                logado: req.session.logado,
                login: req.session.login,
                dadosNotificacao: {
                    titulo: "Cadastrado com sucesso!",
                    mensagem: "Bem-vindo ao Ladiework!!",
                    tipo: "success"
                },
                valores: req.body
            });

        } catch (error) {
            console.log("Erro ao cadastrar:", error);
            if (!res.headersSent) {
                return res.render("pages/main", {
                    pagina: "cadastro",
                    errorsList: errors.array(),
                    valores: req.body,
                    dadosNotificacao: {
                        titulo: "Falha ao Cadastrar!",
                        mensagem: "Credenciais inválidas",
                        tipo: "error"
                    },
                });
            }
        }
    },

    validationRulesFormLogin: [
        body("nome_usu")
            .isLength({ min: 4, max: 45 })
            .withMessage("O nome de usuário deve ter de 4 a 45 caracteres"),
        body("senha_usu")
            .isStrongPassword()
            .withMessage("A senha deve ter no mínimo 4 caracteres (mínimo 1 letra maiúscula, 1 caractere especial e 1 número)")
    ],

    logar: async (req, res) => {
        try {
            // Verifica erros de validação
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("pages/main", { pagina: "login", errorsList: errors, logado: null, dadosNotificacao: null });
            }

            const dataForm = {
                EMAIL_USUARIO: req.body.email_usu,
                SENHA_USUARIO: req.body.senha_usu
            };

            // Busca o usuário pelo email
            let findUserEmail = await user.findUserEmail(dataForm);
            if (findUserEmail.length === 1 && bcrypt.compareSync(dataForm.SENHA_USUARIO, findUserEmail[0].SENHA_USUARIO)) {
                // Formatando a data de criação
                const criacaoDate = new Date(findUserEmail[0].DT_CRIACAO_CONTA_USUARIO);
                const options = { month: 'long', year: 'numeric' };
                const criacaoFormatada = new Intl.DateTimeFormat('pt-BR', options).format(criacaoDate);

                // Recupera a mentoria associada ao usuário
                const userMentoring = await mentoring.findByUserId(findUserEmail[0].ID_USUARIO);

                // Armazena as informações do usuário e da mentoria na sessão
                req.session.logado = {
                    id: findUserEmail[0].ID_USUARIO,
                    nome: findUserEmail[0].NOME_USUARIO,
                    email: findUserEmail[0].EMAIL_USUARIO,
                    telefone: findUserEmail[0].CELULAR_USUARIO,
                    criacao: criacaoFormatada,
                    foto: findUserEmail[0].FOTO_USUARIO ? `data:image/jpeg;base64,${findUserEmail[0].FOTO_USUARIO.toString('base64')}` : null
                };

                // Armazena as informações da mentoria na sessão, se existir
                if (userMentoring) {
                    req.session.latestMentoring = {
                        titulo: userMentoring.TITULO_MENTORA,
                        biografia: userMentoring.BIOGRAFIA_MENTORA,
                        formacao: userMentoring.FORM_ACADEMICA_MENTORA,
                        disponibilidade: userMentoring.DISPONIBILIDADE_HORARIO_MENTORA,
                        duracao: userMentoring.DURACAO_MENTORIA
                    };
                } else {
                    req.session.latestMentoring = null;
                }

                res.render("pages/main", {
                    pagina: "home",
                    errorsList: null,
                    mentoring: null,
                    logado: req.session.logado,
                    login: req.session.login,
                    dadosNotificacao: {
                        titulo: "Login realizado com sucesso!",
                        mensagem: "Que bom ver você de novo!",
                        tipo: "success"
                    },

                    valores: req.body
                });
            } else {
                res.render("pages/main", {
                    pagina: "login", errorsList: [{ msg: "Credenciais inválidas" }], logado: null, dadosNotificacao: {
                        titulo: "Falha ao logar!",
                        mensagem: "Credenciais inválidas",
                        tipo: "error"
                    },
                });
            }
        } catch (e) {
            console.log("Deu erro no logar!!", e);
            res.render("pages/main", { pagina: "login", errorsList: [{ msg: "Erro no servidor" }], logado: null, dadosNotificacao: null });
        }
    },


    recoverPassword: async (req, res) => {
        const erros = validationResult(req);
        console.log(erros);
        if (!erros.isEmpty()) {
            return res.render("pages/recuperar-senha", {
                errorsList: erros,
                dadosNotificacao: null,
                valores: req.body,
            });
        }
        try {
            //logica do token
            client = await user.findUserEmail({
                EMAIL_USUARIO: req.body.email_usu,
            });
            const token = jwt.sign(
                { userId: client[0].ID_USUARIO }, // Informações do usuário no payload
                process.env.SECRET_KEY, // Chave secreta para assinar o token
                { expiresIn: '30m' } // Tempo de expiração do token
            );

            //enviar e-mail com link usando o token
            html = require("../util/templateEmailreset")(process.env.URL_BASE, token)
            enviarEmail(req.body.email_usu, "Pedido de recuperação de senha", null, html, () => {
                return res.render("pages/index", {
                    errorsList: null,
                    logado: req.session.logado,
                    dadosNotificacao: {
                        titulo: "Recuperação de senha",
                        mensagem: "Enviamos um e-mail com instruções para resetar sua senha",
                        tipo: "success",
                    },
                });
            });

        } catch (e) {
            console.log(e);
        }
    },

    validateTokenNewPassword: async (req, res) => {
        //receber token da URL

        const token = req.query.token;
        console.log(token);
        //validar token
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.render("pages/rec-senha", {
                    listaErros: null,
                    dadosNotificacao: { titulo: "Link expirado!", mensagem: "Insira seu e-mail para iniciar o reset de senha.", tipo: "error", },
                    valores: req.body
                });
            } else {
                res.render("pages/resetar-senha", {
                    listaErros: null,
                    logado: req.session.logado,
                    id_usuario: decoded.userId,
                    dadosNotificacao: null
                });
            }
        });
    },

    resetPassword: async (req, res) => {
        const erros = validationResult(req);
        console.log(erros);
        if (!erros.isEmpty()) {
            return res.render("pages/resetar-senha", {
                listaErros: erros,
                dadosNotificacao: null,
                valores: req.body,
            });
        }
        try {
            //gravar nova senha
            senha = bcrypt.hashSync(req.body.senha_usu);
            const resetar = await usuario.update({ senha_usuario: senha }, req.body.id_usuario);
            console.log(resetar);
            res.render("pages/login", {
                listaErros: null,
                dadosNotificacao: {
                    titulo: "Perfil alterado",
                    mensagem: "Nova senha registrada",
                    tipo: "success",
                },
            });
        } catch (e) {
            console.log(e);
        }
    },

    showProfile: async (req, res) => {
        try {
            let results = await user.findId(req.session.logado.id);
            let campos = {
                foto_usu: results[0].FOTO_USUARIO ? `data:image/jpeg;base64,${results[0].FOTO_USUARIO.toString('base64')}` : null,
                senha_usuario: ""
            };

            res.render("pages/perfil", { errorsList: null, valores: campos })
        } catch (e) {
            console.log("Deu erro na renderização da imagem", e);
            res.render("pages/perfil", {
                errorsList: null, valores: {
                    foto_usu: ""
                }
            })
        }
    }
};

module.exports = userController;
