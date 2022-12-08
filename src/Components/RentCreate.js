import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";
import carServices from "../services/carServices";
import userServices from "../services/usernameServices";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

const RentCreate = () => {
    const initialRentState = {
        id_rent: null,
        username: null,
        car: null,
        date_rent: ""
    }

    const [Rent, setRent] = useState(initialRentState);
    const [RentArray, setRentRentArray] = useState([]);
    const [Username, setUsername] = useState([]);
    const [User, setUser] = useState(null);
    const [Car, setCar] = useState([]);
    const [CarSelect, setCarSelect] = useState(null);
    const [Validat, setValidat] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRent({ ...Rent, [name]: value });
        
    }

    const handleInputblur = event => {
        setCarSelect(JSON.parse(event.target.value))
        setErrors(validationErrror(CarSelect,Rent));

    }

    useEffect(() => {
        getListUser();
        getListCar();
        getListRent();
        if (Validat)
            newRent();
    }, [Validat]);

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

    const getListRent = () => {
        rentServices.getAll()
            .then(response => {
                setRentRentArray(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const createRent = (e) => {
        e.preventDefault();
        var data = { id_rent: Rent.id_rent, username: User, car: CarSelect, date_rent: Rent.date_rent }

        setErrors(validationErrror(CarSelect));
        console.log(errors,"create")
            if(Object.keys(errors).length===0){
        
            rentServices.create(data)
                .then(response => {
                    setRent({ username: response.data.User, car: response.data.CarSelect, date_rent: response.data.date_rent });
                    setValidat(true);
                    console.log(response.data);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Se Rento el Vehiculo Correctamente',
                        showConfirmButton: false,
                        timer: 2200
                    })
                })
                .catch(e => {
                    console.log(e);
                })
            }

    }

    const newRent = () => {
        setRent(initialRentState);
        setUsername([]);
        setCar([]);
        setValidat(false);

    }

    const validationErrror = (CarSelect) => {
        let errors = {};
        
        RentArray.forEach(rent => {
            if(rent.car.id_car === CarSelect.id_car) {
                errors.CarSelect = "Vehículo ya alquilado";
                
            }
        })

        return errors;
    }

    return (
        <div className="submit-form">
        <div class="card  ">


            <div class="card-body ">
                <h4>Alquilar</h4>
                <blockquote class="blockquote mb-0 ">

                    <form onSubmit={createRent}
                        class="row g-3 needs-validation my-3  border = 1" >


                        <div className="form-group">
                            <label for="username" class="form-label"> <i class="bi bi-person-add"> </i>Usuario</label>
                            <div className="form-group">
                                <select class="form-select" name="username" id="username"
                                    onChange={e=>{
                                        setUser(JSON.parse(e.target.value));
                                    }}>

                                    <option selected>Seleccioné un Usuario</option>
                                    {Username && Username.map(
                                        (username) => (
                                            <option value={JSON.stringify(username)}>{username.username}</option>
                                        ))}
                                </select>
                            </div>
                        </div>


                        <div className="form-group">
                        
                            <label for="car" class="form-label"> <i class="bi bi-car-front-fill"> </i>Vehículo</label>
                            <div className="form-group">
                            
                                <select class={((errors.CarSelect)?"is-invalid":"") +" form-select"} name="car" id="car"
                                    onBlur={handleInputblur}
                                    onChange={e=>{
                                        setCarSelect(JSON.parse(e.target.value));
                                    }}>

                                    <option selected>Seleccioné un Vehículo</option>
                                    {Car && Car.map(
                                        (car) => (
                                            <option value={JSON.stringify(car)}>{car.licence_plate}</option>
                                        ))}
                                </select>
                                <small className="invalid-feedback" id="helpId" >
                                <i class="bi bi-exclamation-circle"> {errors.CarSelect}</i>
                                </small>
                            </div>
                        </div>

                        <div class="col-md-3 position-relative">
                            <label for="date_rent" class="form-label "> <i class="bi bi-calendar-date"> </i> Fecha</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                    <i class="bi bi-pencil-square"></i>
                                </span>
                                <input type="date" class="form-control" id="date_rent" 
                                    value={Rent.date_rent}
                                    onChange={handleInputChange}
                                    name="date_rent" required />
                                
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
        </div>
    );
};

export default RentCreate;