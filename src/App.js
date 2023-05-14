
import './App.css';
import SignUp from './Login/SignUp';
import GridContainer from './grid/GridContainer';
import FavoritList from './favoriteList/FavoriteList';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import { AuthProvider } from './context/AuthProvider';
import OrderList from './orderList/OrderList';
import SearchBarResult from './components/SearchBarResult';
import LogOut from './Login/LogOut';
import Delete from './Login/Delete';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <div>
    <>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<GridContainer />} />
          <Route path="/result" element={<SearchBarResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<FavoritList />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logOut" element={<LogOut />} />
          <Route path="/delete" element={<Delete/>} />
        </Routes>
      </AuthProvider>
    </>
    </div>

  );
}

export default App;
