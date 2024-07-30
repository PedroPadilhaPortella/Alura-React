import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillEdit,
  AiFillCloseCircle
} from 'react-icons/ai';
import {
  FaCartPlus
} from 'react-icons/fa';
import styles from './Item.module.scss';
import Input from '../Input';
import { mudarFavorito } from 'store/reducers/itens';
import { useDispatch, useSelector } from 'react-redux';
import { mudarCarrinho, mudarQuantidade } from 'store/reducers/carrinho';
import { mudarItem, deletarItem } from 'store/reducers/itens';
import classNames from 'classnames';
import { useState } from 'react';

const iconeProps = {
  size: 24,
  color: '#041833',
};

const quantidadeProps = {
  size: 32,
  color: '#1875E8',
};

export default function Item(props) {

  const {
    titulo,
    foto,
    preco,
    descricao,
    favorito,
    id,
    carrinho,
    quantidade,
  } = props;

  const estaNoCarrinho = useSelector(state => state.carrinho.data.some(item => item.id === id));

  const [editionMode, setEditionMode] = useState(false);
  const [editionTitle, setEditionTitle] = useState(titulo);

  const dispatch = useDispatch();

  const favoritar = () => {
    dispatch(mudarFavorito(id));
  }

  const resolveCarrinho = () => {
    dispatch(mudarCarrinho(id));
  }

  const incrementar = () => {
    dispatch(mudarQuantidade({ id, quantidade: +1 }));
  }

  const decrementar = () => {
    if (quantidade >= 1) {
      dispatch(mudarQuantidade({ id, quantidade: -1 }));
    }
  }

  const updateTitle = () => {
    setEditionMode(false);
    dispatch(mudarItem({ id, item: { titulo: editionTitle } }));
  }

  const editionModeWidget = (
    <>
      {
        editionMode
          ? <AiOutlineCheck  {...iconeProps}
            className={styles['item-acao']}
            onClick={updateTitle}
          />
          : <AiFillEdit  {...iconeProps}
            className={styles['item-acao']}
            onClick={() => setEditionMode(true)}
          />
      }
    </>
  );

  return (
    <div className={classNames(styles.item, { [styles.itemNoCarrinho]: carrinho })}>

      <AiFillCloseCircle 
        {...iconeProps} onClick={() => dispatch(deletarItem(id))}
        className={`${styles['item-acao']} ${styles['item-deletar']}`}
      />

      <div className={styles['item-imagem']}>
        <img src={foto} alt={titulo} />
      </div>

      <div className={styles['item-descricao']}>

        <div className={styles['item-titulo']}>
          {
            editionMode
              ? <Input value={editionTitle} onChange={setEditionTitle} />
              : <h2>{editionTitle}</h2>
          }
          <p>{descricao}</p>
        </div>

        <div className={styles['item-info']}>
          <div className={styles['item-preco']}>R$ {preco.toFixed(2)}</div>
          <div className={styles['item-acoes']}>
            {favorito
              ? <AiFillHeart {...iconeProps}
                color='#ff0000'
                className={styles['item-acao']}
                onClick={favoritar}
              />
              : <AiOutlineHeart {...iconeProps}
                className={styles['item-acao']}
                onClick={favoritar}
              />
            }
            {
              carrinho
                ? (
                  <div className={styles.quantidade}>
                    Quantidade:
                    <AiFillMinusCircle {...quantidadeProps} onClick={decrementar} />
                    <span>{String(quantidade || 0).padStart(2, '0')}</span>
                    <AiFillPlusCircle {...quantidadeProps} onClick={incrementar} />
                  </div>
                )
                : (
                  <>
                    <FaCartPlus
                      {...iconeProps}
                      color={estaNoCarrinho ? '#1875E8' : iconeProps.color}
                      className={styles['item-acao']}
                      onClick={resolveCarrinho}
                    />
                    {editionModeWidget}
                  </>
                )
            }

          </div>
        </div>
      </div>
    </div>
  );
}