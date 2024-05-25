import Header from 'components/Header';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Categoria.module.scss';
import Item from '../../components/Item';
import Button from '../../components/Button';

export default function Categoria() {

  
  const { nomeCategoria } = useParams();
  const navigate = useNavigate();
  const { categoria, itens } = useSelector(state => {
    const regExp = new RegExp(state.busca, 'i');

    return {
      categoria: state.categorias.find(c => c.id === nomeCategoria),
      itens: state.itens.filter(i => i.categoria === nomeCategoria && i.titulo.match(regExp)),
    }
  });

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>Quero anunciar</Button>
      </Header>
      <div className={styles.itens}>
        {
          itens?.map(item => (
            <Item key={item.id} {...item} />
          ))
        }
      </div>
    </div>
  );
}