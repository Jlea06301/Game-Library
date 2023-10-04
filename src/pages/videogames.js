import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Videogames() {
    const [videogames, setVideogames] = useState([]);
    const [openModal, setOpenModal] = useState(false); 
    const [gameName, setGameName] = useState("");
    const [developer, setDeveloper] = useState("");
    const [releaseYear, setReleaseYear] = useState("");
    const [selectedIds, setSelectedIds] = useState([]);  // <-- Nuevo estado para IDs seleccionados

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/videogames');
            const data = await response.json();
            setVideogames(data);
        }
        fetchData();
    }, []);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleDelete = async () => {
        try {
            for (let id of selectedIds) {
                await fetch(`/api/videogames/${id}`, {
                    method: 'DELETE'
                });
            }
            fetchData();
            setSelectedIds([]);
        } catch (error) {
            console.error("Error al eliminar los videojuegos:", error.message);
        }
    };

    const handleSave = async () => {
        const newGameData = {
            gameName,
            developer,
            releaseYear
        };

        const response = await fetch("/api/videogames", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGameData)
        });

        const data = await response.json();
        
        if (data.success) {
            handleCloseModal();
            fetchData();
        } else {
            console.error("Error al guardar el videojuego:", data.message);
        }
    };
    return (
        <div style={{
            backgroundImage: "url('/images/background1.gif')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Tabla */}
            <TableContainer component={Paper} style={{ maxWidth: '50%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton color="primary" aria-label="añadir nuevo" onClick={handleOpenModal}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Developer</TableCell>
                            <TableCell>Release Year</TableCell>
                            <TableCell>Actions</TableCell> {/* Columna para acciones */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {videogames.map((videogame) => (
                            <TableRow key={videogame.VideogameID}>
                                <TableCell>
                                    <input 
                                        type="checkbox" 
                                        value={videogame.VideogameID}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setSelectedIds(prevIds => [...prevIds, videogame.VideogameID]);
                                            } else {
                                                setSelectedIds(prevIds => prevIds.filter(id => id !== videogame.VideogameID));
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{videogame.VideogameID}</TableCell>
                                <TableCell>{videogame.Name}</TableCell>
                                <TableCell>{videogame.Developer}</TableCell>
                                <TableCell>{videogame.ReleaseYear}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" aria-label="editar">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" aria-label="eliminar" onClick={handleDelete}>  {/* <-- Actualizado para manejar la eliminación */}
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal para agregar nuevo videojuego */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-add-game"
                aria-describedby="simple-modal-description"
            >
                <Box style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                    p: 4,
                    padding: '2rem'  // Aumentamos el padding general del modal para que tenga más espacio interno
                }}>
                    <h2 id="modal-title" style={{ marginBottom: '1rem' }}>Agregar nuevo videojuego</h2>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nombre"
                        value={gameName}
                        onChange={e => setGameName(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Desarrollador"
                        value={developer}
                        onChange={e => setDeveloper(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Año de lanzamiento"
                        value={releaseYear}
                        onChange={e => setReleaseYear(e.target.value)}
                        style={{ marginBottom: '1.5rem' }}
                    />
                    <Button color="primary" variant="contained" onClick={handleSave}>
                        Guardar
                    </Button>
                </Box>
            </Modal>


        </div>
    );
}
