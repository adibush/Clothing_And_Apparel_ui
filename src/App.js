
import { useEffect, useState } from 'react';
import './App.css';
import { getAllItems } from './services/api';
import normalizeItemName from './utils/itemUtils';
import SignUp from './Login/SignUp';
import MainPage from './components/MainPage';
import GridContainer from './grid/GridContainer';
import FavoritList from './favoriteList/FavoriteList';
import { Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import { AuthProvider } from './context/AuthProvider';


function App() {

  const [availableItems, setAvailableItems] = useState()

  useEffect(() => {
    getAllItems().then(
      res => {
        const items = res.data.map(item => {
          const itemName = normalizeItemName(item.title);
          return ({ ...item, displayName: itemName })
        });

        setAvailableItems(items)
      }
    );
  }, []);




  return (
    <>
      <AuthProvider>
        <MainPage />
        <Routes>
          <Route path="/" element={<GridContainer/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorite" element={<FavoritList/>} />
        </Routes>
      </AuthProvider>
    </>





    // <div >
    //   {!availableItems ? "Loading..." :

    //     <div>
    //       <SignUp  items={availableItems} />
    //     </div>
    //   }

    // </div>
  );
}

export default App;
