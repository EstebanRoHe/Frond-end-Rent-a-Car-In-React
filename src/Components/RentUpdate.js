import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import rentServices from "../services/rentServices";
import userServices from "../services/usernameServices";
import carServices from "../services/carServices";

const RentUpdate = props => {
    const { id_rent } = useParams();

    const initialRentState = {
        id_rent: null,
        username: {},
        car: {},
        date_rent: ""

    }
    const [Rent, setRent] = useState(initialRentState);
    const [Username, setUsername] = useState([]);
    const [User, setUser] = useState(null);
    const [Car, setCar] = useState([]);


    const getRent = id_rent => {
        rentServices.get(id_rent)
            .then(response => {
                setRent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getListUser();
        getListCar();

        if (id_rent)
            getRent(id_rent);
    }, [id_rent]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
    }


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

    const updateRent = () => {
        rentServices.update(Rent.id_rent, Rent , Rent.username, Rent.car) 
            .then(response => {
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (

        <div class="card  ">


            <div class="card-body ">
                <h4>Actualizar Fecha de Alquiler del Id : {Rent.id_rent}</h4>
                <blockquote class="blockquote mb-0 ">

                    <form novalidate onSubmit={updateRent}


                        class="row g-3 needs-validation my-3  border = 1" >


                        <div class="col-md-3 position-relative">
                            <label for="username" class="form-label">Usuario</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-person-add"> </i>
                                </span>
                                <input type="text" class="form-control" id="username" value={Rent.username.username}
                                     name="username" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>


                        <div class="col-md-3 position-relative">
                            <label for="car" class="form-label">Vehiculo</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-car-front-fill"> </i>
                                </span>
                                <input type="text" class="form-control" id="car" value={Rent.car.licence_plate}
                                     name="car" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
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
                                <i class="bi bi-person-plus"> Actualizar</i>
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

export default RentUpdate;