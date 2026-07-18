import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


// A router is like a mini-application that can handle HTTP requests (like GET, POST) for specific paths. 
// It allows you to organize your routes into modular groups, which you can then "mount" onto your main Express app. 
const router = express.Router();

// const client = new Client({
//     user:process.env.DB_username,
//     server:'localhost',
//     port:5432,
//     password:process.env.DB_password,
//     database:process.env.DB_database
// })
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

router.get('/trending', async(req, res) => {
    try{
        const result = await client.query('SELECT * FROM scam_trend ORDER BY count DESC LIMIT 10');
        res.json(result.rows);
    } catch(err){
        res.send(err);
    }
})

router.get('/trending/:type', async(req, res) => {
    try{
        const type = req.params.type;
        const result = await client.query('SELECT * FROM scam_trend WHERE type = $1',[type]);
        res.json(result.rows);
    } catch(err){
        res.send(err);
    }
})

router.post('/trending', async(req,res) => {
    try{

        const { type, count } = req.body;
        const result = await client.query(
            "INSERT INTO scam_trend(type,count) VALUES($1,$2) RETURNING *",   [type,count]
        );

        res.status(201).json(result.rows[0]);
    }

    catch(err){
        console.error(err);
        res.status(500).json({
            error:"Unable to insert data."
        });

    }

});

router.delete("/trending/:type", async (req, res) => {

    try {
        const { type } = req.params;
        const result = await client.query(
            "DELETE FROM scam_trend WHERE type = $1 RETURNING *",
            [type]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Scam type not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Scam trend deleted successfully.",
            deleted: result.rows[0]
        });

    } catch (err) {

        console.error(err);
        res.status(500).json({
            success: false,
            message: "Unable to delete scam trend."
        });

    }

});
    

 
client.connect()
.then(() => console.log('Connected to PostgreSQL database'))
.catch(err => console.error('Connection error', err));

export default router;