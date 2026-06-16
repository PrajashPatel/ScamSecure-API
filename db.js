import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


// A router is like a mini-application that can handle HTTP requests (like GET, POST) for specific paths. 
// It allows you to organize your routes into modular groups, which you can then "mount" onto your main Express app. 
const router = express.Router();

const client = new Client({
    user:process.env.DB_username,
    server:'localhost',
    port:5432,
    password:process.env.DB_password,
    database:process.env.DB_database
})

router.get('/trending', async(req, res) => {
    try{
        const result = await client.query('SELECT * FROM scam_trends ORDER BY count DESC LIMIT 10');
        res.json(result.rows);
    } catch(err){
        res.send(err);
    }
})

router.get('/trending/:type', async(req, res) => {
    try{
        const type = req.params.type;
        const result = await client.query('SELECT * FROM scam_trends WHERE type = $1',[type]);
        res.json(result.rows);
    } catch(err){
        res.send(err);
    }
})

router.post('/trending', async(req,res) => {
    const {count,type} = req.body;
    console.log(count,type);
    
})
 
client.connect()
.then(() => console.log('Connected to PostgreSQL database'))
.catch(err => console.error('Connection error', err));

export default router;