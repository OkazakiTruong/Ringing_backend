export const getCodeRegisterEmailHtml = (code: string, name: string) => {
    return `
     <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Xác thực email</title>
            <style>
            .container {
                max-width: 600px;
                margin: auto;
                font-family: Arial, sans-serif;
                border: 1px solid #eee;
                padding: 20px;
                border-radius: 10px;
            }
            .code {
                font-size: 32px;
                font-weight: bold;
                color: #2c3e50;
                background-color: #f3f3f3;
                padding: 10px 20px;
                border-radius: 8px;
                display: inline-block;
                margin: 20px 0;
            }
            .footer {
                font-size: 12px;
                color: #999;
                margin-top: 30px;
                text-align: center;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h2>Hello, ${name}</h2>
            <p>You requested a register code. Your code is:</p>
            <div class="code ringing-code-register">${code}</div>
            <p>Code will be expired in 10 minutes, please don't share this code!</p>
            <p>From with love,<br>Ringing</p>
            <div class="footer">
                © 2025 Ringing. All rights reserved.
            </div>
            </div>
        </body>
        </html>
    `
}