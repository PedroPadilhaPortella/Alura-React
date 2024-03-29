import { useState, useEffect } from "react";
import { styled } from 'styled-components';
import bannerBackground from './assets/banner.png';
import Banner from "./componentes/Banner";
import Gallery from "./componentes/Gallery";
import GlobalStyles from "./componentes/GlobalStyles";
import Header from "./componentes/Header";
import SideBar from "./componentes/SideBar";
import ModalZoom from "./componentes/ModalZoom";
import Footer from "./componentes/Footer";
import fotos from './fotos.json';

const FundoGradiente = styled.div`
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  max-width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  gap: 24px;
`;

const GalleryContent = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

function App() {
  const [fotosDaGaleria, setFotosDaGaleria] = useState(fotos);
  const [filtro, setFiltro] = useState('')
  const [tag, setTag] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const onToggleFavorite = (photo) => {
    if(photo.id === selectedPhoto?.id) {
      setSelectedPhoto({...selectedPhoto, favorite: !photo.favorite });
    }

    setFotosDaGaleria(fotosDaGaleria.map((fotoDaGaleria) => {
      return {
        ...fotoDaGaleria, 
        favorite: fotoDaGaleria.id === photo.id ? !photo.favorite : fotoDaGaleria.favorite
      }
    }));
  }

  useEffect(() => {
    const fotosFiltradas = fotos.filter(foto => {
      const filtroPorTag = !tag || foto.tagId === tag;
      const filtroPorTitulo = !filtro || foto.titulo.toLowerCase().includes(filtro.toLowerCase())
      return filtroPorTag && filtroPorTitulo
    })
    setFotosDaGaleria(fotosFiltradas)
  }, [filtro, tag])

  return (
    <FundoGradiente>
      <GlobalStyles />
      <AppContainer>
        <Header filtro={filtro} setFiltro={setFiltro}/>
        <MainContainer>
          <SideBar />
          <GalleryContent>
            <Banner
              text="A galeria mais completa de fotos do espaço!"
              backgroundImage={bannerBackground}
            />
            <Gallery 
              photos={fotosDaGaleria}
              setTag={setTag}
              onSelectPhoto={(photo) => setSelectedPhoto(photo)}  
              onToggleFavorite={onToggleFavorite}
            />
          </GalleryContent>
        </MainContainer>
      </AppContainer>
      <ModalZoom 
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onToggleFavorite={onToggleFavorite}
      />
      <Footer />
    </FundoGradiente>
  );
}

export default App
