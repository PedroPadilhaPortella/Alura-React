import './style.css';

function Colaborador({ nome, imagem, cargo, backgroundColor }) {

  return (
    <div className="colaborador">
      <div className="header" style={{ backgroundColor }}>
        <img src={imagem} alt={nome} />
      </div>
      <div className="footer">
        <h4>{nome}</h4>
        <h5>{cargo}</h5>
      </div>
    </div>
  );
}

export default Colaborador;