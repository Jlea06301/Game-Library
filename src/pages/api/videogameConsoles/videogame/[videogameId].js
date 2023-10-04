import { getConsolesForVideogame } from '../../../../lib/videogameConsoleController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { videogameId } = req.query;
        try {
            const consoles = await getConsolesForVideogame(videogameId);
            res.status(200).json(consoles);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener consolas para el videojuego' });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
