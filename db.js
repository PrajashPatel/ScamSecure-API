import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

import { Client } from 'pg';

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
    
})

client.connect()
.then(() => console.log('Connected to PostgreSQL database'))
.catch(err => console.error('Connection error', err));

export default router;