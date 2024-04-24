import PaginaPadrao from 'components/PaginaPadrao';
import TagsPrato from 'components/TagsPrato';
import cardapio from 'data/cardapio.json';
import NotFound from 'pages/NotFound';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import themaStyles from 'styles/Tema.module.scss';
import styles from './Prato.module.scss';

export default function Prato() {

  const { id } = useParams();
  const navigate = useNavigate();
  const prato = cardapio.find(item => item.id === Number(id));

  if (!prato) {
    return <NotFound />;
  }

  return (
    <Routes>
      <Route path="*" element={<PaginaPadrao />}>
        <Route index element={
          <section className={themaStyles.container}>
            <button className={styles.voltar} onClick={() => navigate(-1)}>
              {'< Voltar'}
            </button>
            <div className={styles.container}>
              <h1 className={styles.titulo}>
                {prato.title}
              </h1>
              <div className={styles.imagem}>
                <img src={prato.photo} alt={prato.title} />
              </div>
              <div className={styles.conteudo}>
                <p className={styles.conteudo__descricao}>
                  {prato.description}
                </p>
              </div>
              <TagsPrato {...prato} />
            </div>
          </section>
        } />
      </Route>
    </Routes>
  );
}