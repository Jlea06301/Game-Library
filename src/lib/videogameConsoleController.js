import { query } from './db';

// Asignar un videojuego a una consola
async function assignVideogameToConsole(videogameId, consoleId) {
    await query('INSERT INTO VideogameConsole (VideogameID, ConsoleID) VALUES (?, ?)', [videogameId, consoleId]);
}

// Desasignar un videojuego de una consola
async function unassignVideogameFromConsole(videogameId, consoleId) {
    await query('DELETE FROM VideogameConsole WHERE VideogameID = ? AND ConsoleID = ?', [videogameId, consoleId]);
}

// Obtener todas las consolas para un videojuego específico
async function getConsolesForVideogame(videogameId) {
    return await query(`
    SELECT
        c.ConsoleID,
        c.Name AS ConsoleName,
        c.Developer,
        c.ReleaseYear,
        v.Name AS VideogameName
    FROM VideogameConsole vc
    JOIN Console c ON vc.ConsoleID = c.ConsoleID
    JOIN Videogame v ON vc.VideogameID = v.VideogameID
    WHERE v.VideogameID = ?
`, [videogameId]);
}

// Obtener todos los videojuegos para una consola específica
async function getVideogamesForConsole(consoleId) {
    return await query(`
    SELECT
        v.VideogameID,
        v.Name AS VideogameName,
        v.Developer,
        v.ReleaseYear,
        c.Name AS ConsoleName
    FROM VideogameConsole vc
    JOIN Videogame v ON vc.VideogameID = v.VideogameID
    JOIN Console c ON vc.ConsoleID = c.ConsoleID
    WHERE c.ConsoleID = ?
`, [consoleId]);
}

export {
    assignVideogameToConsole,
    unassignVideogameFromConsole,
    getConsolesForVideogame,
    getVideogamesForConsole
};
