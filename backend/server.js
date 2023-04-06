import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

import connectDB from './config/db.js';

dotenv.config();

const app = express();
connectDB();

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Sample routes
// app.post('/signup', async (req, res) => {
//     console.log(req.body);
//     const user = {
//         email: req.body.email,
//         password: req.body.password
//     };
//     const userResponse = await admin.auth().createUser({
//         email: user.email,
//         password: user.password,
//         emailVerified: false,
//         disabled: false
//     });
//     res.json(userResponse);
// });

// app.get('*', (req, res) => {
//     console.log(`Endpoint does not exist.`);
//     res.status(404).send(`Endpoint does not exist`);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));