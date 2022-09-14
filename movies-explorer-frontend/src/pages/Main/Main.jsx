import Promo from '../../components/Promo/Promo';
import AboutProject from '../../components/AboutProject/AboutProject';
import Techs from '../../components/Techs/Techs';
import AboutMe from '../../components/AboutMe/AboutMe';
import Portfolio from '../../components/Portfolio/Portfolio';
import Layout from '../../components/Layout/Layout';
import styles from './Main.scss'

function Main({ loggedIn, openPopup }) {
  return (
    <Layout loggedIn={loggedIn} openPopup={openPopup}>
      <div className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
    </Layout>
  );
}

export default Main;
