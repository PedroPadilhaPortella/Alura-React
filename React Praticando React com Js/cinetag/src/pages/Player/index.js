import Banner from 'components/Banner';
import Titulo from 'components/Titulo';
import NaoEncontrada from 'pages/NaoEncontrada';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Player.module.css';

export default function Player() {
  const parametros = useParams();
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/monicahillman/cinetag-api/videos/${parametros.id}`)
      .then(resposta => resposta.json())
      .then(dados => setVideo({...dados}))
  }, [parametros]);

  if (!video) {
    return <NaoEncontrada />
  }

  return (
    <>
      <Banner imagem='player' />
      <Titulo>
        <h1>Player</h1>
      </Titulo>
      <section className={styles.container}>
        <iframe
          width="100%"
          height="100%"
          src={video.link}
          title={video.titulo}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </section>
    </>
  );
}