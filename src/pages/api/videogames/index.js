// pages/api/videogames/index.js

import { getAllVideogames, createVideogame } from '../../../lib/videogameController';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const videogames = await getAllVideogames();
                res.status(200).json(videogames);
            } catch (error) {
                res.status(500).json({ error: 'Error al obtener los videojuegos.' });
            }
            break;

            case 'POST':
                try {
                    const newVideogameId = await createVideogame(req.body);
                    res.status(201).json({ id: newVideogameId });
                } catch (error) {
                    console.error("Error:", error.message); // Imprimir en consola
                    res.status(500).json({ error: `Error al crear el videojuego: ${error.message}` }); // Enviar al frontend
                }
                break;
            

        default:
            res.status(405).end(); // Método no permitido
            break;
    }
}
