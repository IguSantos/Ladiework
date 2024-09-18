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
            background-color: #FF6F61;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
            font-family: 'Georgia', serif;
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
            background-color: #FF6F61;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #E85A50;
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
            <h1>🔒 Recuperação de Senha</h1>
        </div>
        <div class="content">
            <p>Olá, querida usuária 💖,</p>
            <p>Parece que você solicitou uma nova senha para sua conta. Não se preocupe, estamos aqui para ajudar!</p>
            <p>Basta clicar no botão abaixo para redefinir sua senha de forma rápida e segura. Estamos ansiosos para ver você de volta!</p>
            <a href="${url}/resetar-senha?token=${token}" class="button">Redefinir Senha</a>
        </div>
        <div class="footer">
            <p>Se você não fez essa solicitação, fique tranquiloa! Simplesmente ignore este e-mail e nada será alterado em sua conta.</p>
            <p>💌 Com carinho, LadieWork
        </div>
    </div>
</body>
</html>`;
}
