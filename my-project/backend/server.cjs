const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cookieParser());

async function startServer() {
    const { register, login, logout, authentication } = await import('../src/components/Auth/Auth.js');

    app.post('/register', register);
    app.post('/login', login);
    app.post('/logout', logout);

    app.get('/protected', authentication, (req, res) => {
        res.send('This is a protected route.');
    });

    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Start the server
startServer();
