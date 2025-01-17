import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomeRouter from "./assets/routes/homerouter";
import Navbar from './assets/components/navbar';
import Footer from './assets/components/footer';
import './assets/styles/style.css'
import './assets/styles/explore.css'
import './assets/styles/signup.css'
import './assets/styles/login.css'
import './assets/styles/profile.css'
import './assets/styles/dashboard.css'
import './assets/styles/temp.css'
import './assets/styles/settings.css'
import './assets/styles/analytics.css'
import './assets/styles/documentation.css'
import './assets/styles/community.css'
import { TopUser } from './assets/pages/Community';

function App() {
  const token = Cookies.get('token');
  return (
    <TopUser>
    <Router>
      <Navbar/>
      <HomeRouter />
      <Footer/>
      </Router>
      </TopUser>
  );
}

export default App;
