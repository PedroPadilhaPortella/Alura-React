import PostModel from "components/PostModel";
import styles from './About.module.css'
import fotoCapa from 'assets/sobre_mim_capa.png';
import fotoSobreMim from "assets/sobre_mim_foto.jpeg"

export default function About() {
  return (
    <PostModel fotoCapa={fotoCapa} titulo="Sobre mim">
      <h3 className={styles.subtitulo}>Olá, eu sou o Pedro Portella!</h3>
      <img className={styles.fotoSobreMim} src={fotoSobreMim} alt="Foto do Pedro Portella sorrindo" />

      <p className={styles.paragrafo}>
        Desde pequeno, sempre me gostei de matemática e física, e me destaquei na área de exatas. Minha história com programação começou na Faculdade de Tecnologia (Fatec), onde me graduei em Análise e Desenvolvimento de Sistemas. A maior parte das tecnologias que eu aprendi foi por conta própria, aprendi lógica de programação e várias linguagens, como C# e Javascript em plataformas como Udemy, Curso em Video e no próprio Youtube.
      </p>
      <p className={styles.paragrafo}>
        Comecei a trabalhar como estagiário em uma empresa de consultoria em tecnologia Alemã chamada GFT (Gesellschaft für Technische Dienstleistungen), onde recebi treinamento para ser um desenvolvedor FullStack com .Net Core (C#) e Angular. E comecei atuando em um de seus clientes, o Banco Santander, como desenvolvedor Júnior, com Angular.
      </p>
      <p className={styles.paragrafo}>
        Em menos de um ano, fui internalizado para trabalhar diretamente para o Banco Santander, atuando nos projetos das áreas de Cartões e PF, como a Campanha Bateu Ganhou. No ano seguinte, fui promovido a desenvolvedor Pleno, recebendo mais responsabilidades sobre os projetos e sobre o time.
      </p>
      <p className={styles.paragrafo}>
        Atualmente busco novos desafios em minha carreira, sigo aprendendo novas tecnologias, me aperfeiçoando no Angular e React, e aprendendo novas linguagens e stacks, que são utilizadas no mercado, como Java e NodeJs.
      </p>
      <p className={styles.paragrafo}>
        No meu tempo livre, gosto de fazer academia, luto Muay Thai e faço trilhas e escaladas.
      </p>

    </PostModel>
  );
}