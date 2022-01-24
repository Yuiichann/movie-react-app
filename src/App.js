import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Routers from 'config/Routers';
import { BrowserRouter } from 'react-router-dom';
import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';


function App() {

  return (
    <BrowserRouter>
      <Header />

      <Routers />
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;
