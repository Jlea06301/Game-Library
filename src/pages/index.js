import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Image from 'next/image'; 

export default function Home() {
  return (
      <>
          <Head>
              <title>Biblioteca de Videojuegos</title>
              <meta name="description" content="Una aplicación de catálogo de videojuegos" />
              <link rel="icon" href="/favicon.ico" />
          </Head>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <h1>Bienvenido a la biblioteca de videojuegos</h1>

              <div style={{ margin: '1rem 0' }}>
                  <Link href="consoles">
                      <Button 
                          variant="contained" 
                          color="primary" 
                          style={{ marginRight: '1rem', padding: '1rem' }}>  {/* Aumentamos el padding */}
                          <Image 
                              src="/images/consoles.jpg" 
                              alt="Icono de consola"
                              width={180} 
                              height={180} />
                          Consolas
                      </Button>
                  </Link>
                  
                  <Link href="videogames">
                      <Button 
                          variant="contained" 
                          color="secondary" 
                          style={{ padding: '1rem' }}>  {/* Aumentamos el padding */}
                          <Image 
                              src="/images/videogame.png" 
                              alt="Icono de videojuego"
                              width={180} 
                              height={180} />
                          Videojuegos
                      </Button>
                  </Link>
              </div>
          </div>
      </>
  );
}
