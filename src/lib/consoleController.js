import { query } from './db';

// Obtener todas las consolas
async function getAllConsoles() {
    return await query('SELECT * FROM Console');
}

// Crear una nueva consola
async function createConsole(data) {
    const queryStr = 'INSERT INTO Console (Name, Developer, ReleaseYear) VALUES (?, ?, ?)';
    const result = await query(queryStr, [data.Name, data.Developer, data.ReleaseYear]);
    return result.insertId; 
}

// Actualizar una consola
async function updateConsole(id, data) {
    const queryStr = 'UPDATE Console SET Name = ?, Developer = ?, ReleaseYear = ? WHERE ConsoleID = ?';
    await query(queryStr, [data.Name, data.Developer, data.ReleaseYear, id]);
}

// Eliminar una consola
async function deleteConsole(id) {
    await query('DELETE FROM Console WHERE ConsoleID = ?', [id]);
}

// Obtener una consola por ID
async function getConsoleById(id) {
    const results = await query('SELECT * FROM Console WHERE ConsoleID = ?', [id]);
    return results[0];
}

export {
    createConsole,
    getAllConsoles,
    getConsoleById,
    updateConsole,
    deleteConsole
};
