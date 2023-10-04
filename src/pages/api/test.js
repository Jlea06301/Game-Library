// pages/api/someEndpoint.js

import { query } from '../../lib/db';

export default async function handler(req, res) {
    try {
        const results = await query('SELECT * FROM Videogame');
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
}
