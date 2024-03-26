import Banner from 'components/Banner';
import { Outlet } from 'react-router-dom';

export default function DefaultFunction(props) {
  return (
    <main>
      <Banner />
      <Outlet />
    </main>
  );
}