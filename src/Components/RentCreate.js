import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";
import carServices from "../services/carServices";
import userServices from "../services/usernameServices";

import { Link } from 'react-router-dom';


const RentCreate = () => {
    const initialRentState = {
        id_rent: null,
        username: {},
        car: {},
        date_rent:""

    }
   
    const [Rent, setRent] = useState(initialRentState);
    const [Username, setUsername] = useState([]);
    const [User, setUser] = useState(null);
    const [Car, setCar] = useState([]);
    const [CarSelect, setCarSelect] = useState(null);
    
    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
    }

    useEffect(() => {
        getListUser();
        getListCar();
    }, []);

    const getListUser = () => {
        userServices.getAll()
            .then(response => {
                setUsername(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const getListCar = () => {
        carServices.getAll()
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const createRent= () => {
        var date = { id_rent: Rent.id_rent, username: User, car: CarSelect, date_rent: Rent.date_rent}
        rentServices.create(date)
            .then(response => {
                setRent({ username: response.data.User, car: response.data.CarSelect, date_rent: response.data.date_rent});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })


    }

    return (
        <div class="card  ">


            <div class="card-body ">
            <h4>Alquilar</h4>
                <blockquote class="blockquote mb-0 ">

                    <form novalidate onSubmit={createRent}
                        
                       
                        class="row g-3 needs-validation my-3  border = 1" >


                        <div className="form-group">
                        <label for="username" class="form-label"> <i class="bi bi-person-add"> </i>Usuario</label>
                            <div className="form-group">
                           
                                <select class="form-select" name="username" id="username" 
                                onChange={e => {
                                    console.log(JSON.parse(e.target.value))
                                    setUser(JSON.parse(e.target.value))
                                }}>
                               
                                    <option selected>Usuario</option>
                                    {Username && Username.map(
                                        (username) => (
                                            <option value={JSON.stringify(username)}>{username.username}</option>
                                        ))}
                                </select>
                            </div>
                        </div>


                        <div className="form-group">
                        <label for="car" class="form-label"> <i class="bi bi-car-front-fill"> </i>Vehiculo</label>
                            <div className="form-group">
                           
                                <select class="form-select" name="car" id="car" 
                                onChange={e => {
                                    console.log(JSON.parse(e.target.value))
                                    setCarSelect(JSON.parse(e.target.value))
                                }}>
                               
                                    <option selected>Seleccione un Vehiculo</option>
                                    {Car && Car.map(
                                        (car) => (
                                            <option value={JSON.stringify(car)}>{car.licence_plate}</option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div class="col-md-3 position-relative">
                            <label for="date_rent" class="form-label "> <i class="bi bi-calendar-date"> </i> Fecha</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-pencil-square"></i>
                                </span>
                            <input type="date" class="form-control" id="date_rent" value={Rent.date_rent} 
                            onChange={handleInputChange} name="date_rent" required />
                            <div class="valid-tooltip">
                                Looks good!
                            </div>
                            </div>
                        </div>



                        <div class="col-12">
                            <button class="btn btn-secondary my-3  mx-2 " type="submit">
                            <i class="bi bi-person-plus"> Alquilar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/RentList"}>  
                            <i class="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>

    );
};

export default RentCreate;