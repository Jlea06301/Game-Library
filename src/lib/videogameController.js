import { query } from './db';

async function getAllVideogames() {
    return await query('SELECT * FROM Videogame');
}

async function createVideogame(data) {
    const queryStr = 'INSERT INTO Videogame (Name, Developer, ReleaseYear) VALUES (?, ?, ?)';
    console.log("Data para insertar:", data);
    const result = await query(queryStr, [data.gameName, data.developer, data.releaseYear]);
    console.log("Resultado del INSERT:", result);


    return result.insertId; // Devuelve el ID del videojuego creado.
}

async function updateVideogame(id, data) {
    const queryStr = 'UPDATE Videogame SET Name = ?, Developer = ?, ReleaseYear = ? WHERE VideogameID = ?';
    await query(queryStr, [data.Name, data.Developer, data.ReleaseYear, id]);
}

async function deleteVideogame(id) {
    await query('DELETE FROM Videogame WHERE VideogameID = ?', [id]);
}

async function getVideogameById(id) {
    const results = await query('SELECT * FROM Videogame WHERE VideogameID = ?', [id]);
    return results[0]; // Devuelve el primer resultado.
}

export {
    createVideogame,
    getAllVideogames,
    getVideogameById,
    updateVideogame,
    deleteVideogame
};
