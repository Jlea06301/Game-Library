import { getAllConsoles, createConsole } from '../../../lib/consoleController';

export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            try {
                const consoles = await getAllConsoles();
                res.status(200).json(consoles);
            } catch (error) {
                res.status(500).json({ error: 'Error al obtener las consolas.' });
            }
            break;

        case 'POST':
            try {
                const newConsoleId = await createConsole(req.body);
                res.status(201).json({ id: newConsoleId });
            } catch (error) {
                res.status(500).json({ error: 'Error al crear la consola.' });
            }
            break;

        default:
            res.status(405).end(); 
            break;
    }
}
