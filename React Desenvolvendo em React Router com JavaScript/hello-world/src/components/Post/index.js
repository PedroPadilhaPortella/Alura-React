import posts from 'assets/json/posts.json';
import Card from 'components/Card';
import DefaultPage from 'components/DefaultPage';
import NotFound from 'pages/NotFound';
import ReactMarkdown from 'react-markdown';
import { Route, Routes, useParams } from 'react-router-dom';
import PostModel from '../PostModel';
import './Post.css';
import styles from './Post.module.css';

export default function Post(props) {
  const params = useParams();

  const post = posts.find((post) => post.id === +params.id);

  if (!post) {
    return (<NotFound />);
  }

  const recomendedPost = posts
    .filter((p) => p.id !== post.id)
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <Routes>
      <Route path="*" element={<DefaultPage />}>
        <Route index element={
          <PostModel fotoCapa={`/assets/posts/${post.id}/capa.png`} titulo={post.titulo}>
            <div className='post-markdown-container'>
              <ReactMarkdown>
                {post.texto}
              </ReactMarkdown>
            </div>
            <h2 className={styles.tituloOutrosPosts}>Outros posts que você pode gostar:</h2>
            <ul className={styles.postsRecomendados}>
              {recomendedPost.map((post) => (
                <li key={post.id}>
                  <Card item={post} />
                </li>
              ))}
            </ul>
          </PostModel>
        } />
      </Route>
    </Routes >
  );
}