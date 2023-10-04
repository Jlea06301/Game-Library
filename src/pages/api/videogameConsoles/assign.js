import { assignVideogameToConsole } from '../../../lib/videogameConsoleController';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { videogameId, consoleId } = req.body;
        try {
            await assignVideogameToConsole(videogameId, consoleId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al asignar videojuego a consola' });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
