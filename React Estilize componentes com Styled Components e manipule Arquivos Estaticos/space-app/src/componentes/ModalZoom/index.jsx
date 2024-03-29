import styled from "styled-components";
import Image from '../Gallery/Image';
import IconButton from "../IconButton";

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const DialogStyled = styled.dialog`
  position: absolute;
  top: 294px;
  background: transparent;
  padding: 0;
  border: 0;
  width: 800px;
  display: flex;
  justify-content: center;

  form {
    button {
      position: relative;
      top: 20px;
      right: 60px;
    }
  }
`;


const ModalZoom = ({ photo, onClose, onToggleFavorite }) => {

  return (
    <>
      {
        photo && <>
          <Overlay />
          <DialogStyled open={!!photo} onClose={onClose}>
            <Image photo={photo} expanded={true} onToggleFavorite={onToggleFavorite} />
            <form method="dialog">
              <IconButton formMethod="dialog">
                <img src="/icons/fechar.png" alt="Icone de fechar" />
              </IconButton>
            </form>
          </DialogStyled>
        </>
      }
    </>
  );
}

export default ModalZoom;