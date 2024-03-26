import posts from 'assets/json/posts.json';
import Card from 'components/Card';
import styles from './Start.module.css';

export default function Start() {
  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.id}>
          <Card item={post} />
        </li>
      ))}
    </ul>
  );
}