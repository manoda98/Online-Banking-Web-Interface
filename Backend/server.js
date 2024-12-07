const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const cors = require('cors'); 

app.use(cors()); 

app.use(bodyParser.json());

let users = [];

app.get('/', (req, res) => {
    res.status(200).json({ message: "Test"})
});

app.post('/signup', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password == undefined) {
        return res.status(400).json({ message: "Password is required"})
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match!' });
    }

    for (let i = 0 ; i<users.length;i++) {
        if (users[i].username == username) {
            usernameExists = true;
            return res.status(400).json({message: 'Username already exists!'});
        }
        if (users[i].email == email) {
            emailExists = true;
            return res.status(400).json({message: 'Email already exists!'});
        }
    }
    
    const newUser = {
        "username": username,
        "email": email,
        "password": password,
    }

    users.push(newUser)
    console.log("users");
    console.log(users);

    res.status(201).json({ message: 'Signup successful!', user: { username, email } });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            return res.status(200).json({ message: 'Login successful!', user: { username: users[i].username, email: users[i].email } });
        }
    }
    return res.status(400).json({ message: 'Invalid username or password!' });
});


app.listen(PORT, () => {
    console.log(`Mock backend running on http://localhost:${PORT}`);
});
