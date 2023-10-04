import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';  // Importa el ícono de Home
import Link from 'next/link';  // Importa el componente Link

export default function Consoles() {
    const [consoles, setConsoles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/consoles');
            const data = await response.json();
            setConsoles(data);
        }
        fetchData();
    }, []);

    return (
        <div style={{
            backgroundImage: "url('images/background1.gif')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '100vh',  // Ocupar todo el alto del viewport
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Icono de Home */}
            <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                <Link href="/" passHref>
                    <IconButton color="primary" aria-label="go to home">
                        <HomeIcon />
                    </IconButton>
                </Link>
            </div>

            {/* Tabla */}
            <TableContainer component={Paper} style={{ maxWidth: '50%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Developer</TableCell>
                            <TableCell>Release Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {consoles.map((console) => (
                            <TableRow key={console.ConsoleID}>
                                <TableCell>{console.ConsoleID}</TableCell>
                                <TableCell>{console.Name}</TableCell>
                                <TableCell>{console.Developer}</TableCell>
                                <TableCell>{console.ReleaseYear}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
