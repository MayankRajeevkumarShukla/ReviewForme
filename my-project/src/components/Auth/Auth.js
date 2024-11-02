import jwt from 'jsonwebtoken'; // Change require to import
import cookieParser from 'cookie-parser'; // Change require to import
import { User } from '../database/databse.js';



const authentication = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

const register = async (req, res) => {
    const { username, password, email } = req.body;

    const newUser = new User({ username, password, email }); // Make sure to instantiate User correctly
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
}

const login = async (req, res) => {
    const { username, password } = req.body;

    // Fixing the query to search for the user by username
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
        expiresIn: '1h' 
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 3600000
    });
    res.status(200).json({ message: "Login successful!" });
}

const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful!' });
}

export {
    register,
    login,
    logout,
    authentication
};
