import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import UserList from './Components/UserList';
import UserCreate from './Components/UserCreate';
import UserUpdate from './Components/UserUpdate';
import TypeCarList from './Components/TypeCarList';
import TypeCarCreate from './Components/TypeCarCreate';
import TypeCarUpDate from './Components/TypeCarUpdate';
import CarList from './Components/CarList';
import CarCreate from './Components/CarCreate';
import CarUpdate from './Components/CarUpdate';
import RentList from './Components/RentList';
import RentCreate from './Components/RentCreate';
import RentUpdate from './Components/RentUpdate';
import IndexRent from './Components/IndexRent';

function App() {

  return (
  <div>

    <nav className="navbar navbar-expand navbar-dark bg-dark ms-auto">
    <a href="/IndexRent" className="navbar-brand mx-2"> UNA</a>
      <div className="nav navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/UserList"} className="nav-item nav-link active">Usuarios</Link>
        </li>
        <li className="nav-item">
          <Link to={"/TypeCarList"} className="nav-item nav-link active">Tipo de Vehículos</Link>
        </li>
        <li className="nav-item">
          <Link to={"/CarList"} className="nav-item nav-link active">Vehículos</Link>
        </li>
        <li className="nav-item">
          <Link to={"/RentList"} className="nav-item nav-link active" >Rentar</Link>
        </li>
      </div>
    </nav>



    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/UserCreate" element={<UserCreate />} />
        <Route path="/UserUpdate/:id_username" element={<UserUpdate />} />
        <Route path="/TypeCarList" element={<TypeCarList />} />
        <Route path="/TypeCarCreate" element={<TypeCarCreate />} />
        <Route path="/TypeCarUpDate/:id_typeCar" element={<TypeCarUpDate />} />
        <Route path="/CarList" element={<CarList />} />
        <Route path="/CarCreate" element={<CarCreate />} />
        <Route path="/CarUpdate/:id_car" element={<CarUpdate />} />
        <Route path="/RentList" element={<RentList />} />
        <Route path="/RentCreate" element={<RentCreate />} />
        <Route path="/RentUpdate/:id_rent" element={<RentUpdate />} />
        <Route path="/IndexRent" element={<IndexRent />} />
      </Routes>
    </div>
  </div>);
};

export default App;




