import { getConsoleById, updateConsole, deleteConsole } from '../../../lib/consoleController';

export default async function handler(req, res) {
    const { id } = req.query;

    switch (req.method) {
        case 'GET':
            try {
                const consoleData = await getConsoleById(id);
                if (consoleData) {
                    res.status(200).json(consoleData);
                } else {
                    res.status(404).json({ error: 'Consola no encontrada.' });
                }
            } catch (error) {
                res.status(500).json({ error: 'Error al obtener la consola.' });
            }
            break;

        case 'PUT':
            try {
                await updateConsole(id, req.body);
                res.status(200).json({ message: 'Consola actualizada correctamente.' });
            } catch (error) {
                res.status(500).json({ error: 'Error al actualizar la consola.' });
            }
            break;

        case 'DELETE':
            try {
                await deleteConsole(id);
                res.status(200).json({ message: 'Consola eliminada correctamente.' });
            } catch (error) {
                res.status(500).json({ error: 'Error al eliminar la consola.' });
            }
            break;

        default:
            res.status(405).end(); 
            break;
    }
}
