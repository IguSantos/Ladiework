module.exports = (url, token) => {
    return ` <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperação de Senha</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #f3f1f1;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            max-width: 600px;
        }
        .header {
            background-color: #8b53e6;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
            font-family: 'Georgia', serif;
        }
.li[href] {
color: white !important;
}
        .header h1 {
            margin: 0;
            font-size: 26px;
        }
        .content {
            padding: 25px;
            text-align: center;
            font-size: 18px;
            line-height: 1.6;
            color: #555555;
        }

        .content p {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            margin-top: 25px;
            background-color: #8b53e6;
            color: white; 
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
a {
   color: white !important;
}


        .button:hover {
            background-color: #836DAC;
        }
        .footer {
            padding: 20px 20px;
            text-align: center;
            font-size: 14px;
            color: #999999;
            border-top: 1px solid #eeeeee;
        }
        .footer p {
            margin: 0;
            font-size: 13px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Recuperação de Senha 🔒 </h1>
        </div>
        <div class="content">
            <p>Olá, querida usuária.</p>
            <p>Parece que você solicitou uma nova senha para sua conta. Não se preocupe, estamos aqui para ajudar!</p>
            <p>Basta clicar no botão abaixo para redefinir sua senha de forma rápida e segura. Estamos ansiosos para ver você de volta!</p>
            <a href="${url}novasenha?token=${token}" class="button">Redefinir Senha</a>
        </div>
        <div class="footer">
            <p>Se você não fez essa solicitação, fique tranquila! Simplesmente ignore este e-mail e nada será alterado em sua conta.</p>
            <p>
        </div>
    </div>
</body>
</html>`;
}
