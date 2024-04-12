import { IColaborador } from '../../interfaces/IColaborador';
import './style.css';
import { AiFillCloseCircle, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface ColaboradorProps {
  colaborador: IColaborador;
  backgroundColor: string;
  onDelete: (colaborador: IColaborador) => void;
  onFavorite: (colaborador: IColaborador, favorite: boolean) => void;
}

function Colaborador({ colaborador, backgroundColor, onDelete, onFavorite }: ColaboradorProps) {

  return (
    <div className="colaborador">
      <AiFillCloseCircle 
        size={25}
        className="delete-button"
        onClick={() => onDelete(colaborador)}
      />
      <div className="header" style={{ backgroundColor }}>
        <img src={colaborador.imagem} alt={colaborador.nome} />
      </div>
      <div className="footer">
        <h4>{colaborador.nome}</h4>
        <h5>{colaborador.cargo}</h5>
        <h5>{new Date(colaborador.data).toLocaleDateString()}</h5>
        <div className="favorite">
          {
            colaborador.favorito
              ? <AiFillHeart size={25} color='#ff0000' onClick={() => onFavorite(colaborador, false)} />
              : <AiOutlineHeart size={25} onClick={() => onFavorite(colaborador, true)} />
          }
        </div>
      </div>
    </div>
  );
}

export default Colaborador;