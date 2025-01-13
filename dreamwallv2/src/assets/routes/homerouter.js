import { Route, Routes } from 'react-router-dom';
import Home from '../pages/HomePage';
import ExplorePage from '../pages/ExplorePage';
import PageNotFound from '../pages/PageNotFound';
import SignUp from '../pages/Signup';
import Login from '../pages/login';
import GettingStarted from '../pages/GettingStarted';
import Dashboard from '../pages/dashboard';
import Profile from '../pages/Profile';
import WallpaperPage from '../pages/WallpaperPage';
import Meme from '../pages/Meme';
import LiveWallpaper from '../pages/LiveWallpaper';
import Settings from '../pages/settings';
import Analytics from '../pages/AnalyticsPage';
import Community from '../pages/Community'
import Updates from '../pages/Updates';
import Documentation from '../pages/documentation';


function HomeRouter() {
  return (
    <>
    <Routes>
    <Route path='/*' element={<PageNotFound/>} />
     <Route path='/' element={<Home/>} />
     <Route path='/home' element={<Home/>} />
     <Route path='/explore' element={<ExplorePage/>} />
     <Route path='/gettingstarted' element={<GettingStarted/>} />
     <Route path='/community' element={<Community/>} />
     <Route path='/signup' element={<SignUp/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/dashboard' element={<Dashboard />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/profile/:profileUrl" element={<Profile />} />
     <Route path='/explore/:linkCopy' element={<WallpaperPage />} />
     <Route path='/explore/meme' element={<Meme />} />
     <Route path='/explore/livewallpaper' element={<LiveWallpaper />} />
     <Route path='/dashboard/settings' element={<Settings />} />
     <Route path='/dashboard/analytics' element={<Analytics />} />
     <Route path='/updates' element={<Updates />} />
     <Route path='/documentation/*' element={<Documentation />} />
      </Routes>
    </>
  );
}



export default HomeRouter;
