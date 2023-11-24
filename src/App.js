import PageNotFound from './components/Pagenotfound';
import './App.css';
import Home from './components/Home'
import Search from './components/Search'
import { Route, Routes } from "react-router-dom";
import Restaurantpage from './components/Restaurantpage'
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
function App() {

  let getuserdata = () => {


    let token = localStorage.getItem('token')

    if (token === null) {
      return null
    } else {
      let data = jwtDecode(token)
      return data
    }
  }

  let [user, setUser] = useState(getuserdata());

  return (
    <>
      <div className="container-fluid">
        <Routes>
          {/* <Route path="/" element=  {<Home />} /> */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/restaurant/:id" element={<Restaurantpage user={user} />} />
          <Route path="/Search/:meal_id/:meal_type_name" element={<Search user={user} />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>

    </>

  );
}

export default App;
