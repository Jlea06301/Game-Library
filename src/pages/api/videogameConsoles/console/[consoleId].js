import { getVideogamesForConsole } from '../../../../lib/videogameConsoleController';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { consoleId } = req.query;
        try {
            const videogames = await getVideogamesForConsole(consoleId);
            res.status(200).json(videogames);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener videojuegos para la consola' });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
