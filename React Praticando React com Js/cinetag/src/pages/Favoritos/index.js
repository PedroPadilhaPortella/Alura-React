import Banner from "components/Banner";
import Titulo from "components/Titulo";
import Card from "components/Card";
import styles from "./Favoritos.module.css";
import { useFavoritoContext } from 'contextos/FavoritosContext';

export default function Favoritos() {
  const { favoritos } = useFavoritoContext();

  return (
    <>
    <Banner imagem='favoritos' />
      <Titulo><h1>Meus Favoritos</h1></Titulo>
      <section className={styles.container}>
        {
          favoritos.map((favorito) => {
            return <Card {...favorito} key={favorito.id} />
          })
        }
      </section>
    </>
  );
}