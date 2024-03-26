import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from './pages/Start';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Menu from './components/Menu';
import Footer from './components/Footer';
import DefaultPage from './components/DefaultPage';
import Post from "components/Post";
import ScrollToTop from "components/ScrollToTop";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Menu />
      <Routes>
        <Route path="/" element={<DefaultPage />}>
          <Route index element={<Start />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="posts/:id/*" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
