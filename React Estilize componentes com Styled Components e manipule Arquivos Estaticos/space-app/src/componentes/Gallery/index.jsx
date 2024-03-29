import { styled } from 'styled-components';
import Title from '../Title';
import Image from './Image';
import Populars from './Populars';
import Tags from './Tags';

const GalleryContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const FluidSection = styled.section`
  flex-grow: 1;
`;

const ImagesContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const Gallery = ({ photos = [], setTag, onSelectPhoto, onToggleFavorite  }) => {
  return (
    <>
      <Tags setTag={setTag} />
      <GalleryContainer>
        <FluidSection>
          <Title>Navegue pela galeria</Title>
          <ImagesContainer>
            {photos.map((photo) => {
              return <Image 
                key={photo.id} 
                photo={photo} 
                onZoom={onSelectPhoto}
                onToggleFavorite={onToggleFavorite}
              />
            })}
          </ImagesContainer>
        </FluidSection>
        <Populars />
      </GalleryContainer>
    </>
  );
}

export default Gallery;