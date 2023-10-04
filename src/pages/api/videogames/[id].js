// pages/api/videogames/[id].js

import { getVideogameById, updateVideogame, deleteVideogame } from '../../../lib/videogameController';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const videogame = await getVideogameById(id);
                if (videogame) {
                    res.status(200).json(videogame);
                } else {
                    res.status(404).json({ error: 'Videojuego no encontrado.' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Error al obtener el videojuego.' });
            }
            break;

        case 'PUT':
            try {
                await updateVideogame(id, req.body);
                res.status(200).json({ message: 'Videojuego actualizado correctamente.' });
            } catch (error) {
                res.status(500).json({ error: 'Error al actualizar el videojuego.' });
            }
            break;

        case 'DELETE':
            try {
                await deleteVideogame(id);
                res.status(200).json({ message: 'Videojuego eliminado correctamente.' });
            } catch (error) {
                res.status(500).json({ error: 'Error al eliminar el videojuego.' });
            }
            break;

        default:
            res.status(405).end(); // Método no permitido
            break;
    }
}
