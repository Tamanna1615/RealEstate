const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Required to allow requests from your React app

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = path.join(__dirname, 'logins.json');

// POST endpoint to handle login data
app.post('/api/save-login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const newLogin = {
        email,
        password,
        timestamp: new Date().toISOString()
    };

    // Read the existing file or create an empty array
    fs.readFile(filePath, 'utf8', (err, data) => {
        let logins = [];
        if (!err) {
            try {
                logins = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
            }
        }

        logins.push(newLogin);

        // Write the updated array back to the file
        fs.writeFile(filePath, JSON.stringify(logins, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).json({ message: 'Failed to save login data.' });
            }
            res.status(200).json({ message: 'Login data saved successfully!' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});