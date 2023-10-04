import { unassignVideogameFromConsole } from '../../../lib/videogameConsoleController';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        const { videogameId, consoleId } = req.body;
        try {
            await unassignVideogameFromConsole(videogameId, consoleId);
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ error: 'Error al desasignar videojuego de consola' });
        }
    } else {
        res.status(405).end(); // Método no permitido
    }
}
