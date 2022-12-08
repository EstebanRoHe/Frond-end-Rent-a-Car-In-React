import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IndexRent = () => {
    const [Car, setCar] = useState([]);
    const [messaje, setMessaje]=("");
    let navigate = useNavigate;

    useEffect(() => {
        getList();
        
    }, []);

    const getList = () => {
        carServices.getAll()
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };


    return (

        <div className="container" >
            

            {Car && Car.map(
                (car) => (

                    <div class="card-body mb-3">
                        <div class="card col-sm-5 ">
                            <img src={car.image} class="card-img-top" alt="..." />
                            <div class="card-body ">
                                <h5 class="card-title" key={car.id_car}><i class="bi bi-car-front-fill"> </i>{car.description}</h5>
                                {car.typeCar.description == "4x4" ? (
                                <i class="bi bi-pencil-square"> Descripción :
                                Vehículo {car.typeCar.description}, 
                                para uso off road, uso familiar para llever a toda la familia con las mayor comodidad
                                </i>):(
                                <i class="bi bi-pencil-square"> Descripción :
                                Vehículo {car.typeCar.description}, para uso familiar para llevar a toda la familia con la mayor comodidad</i>)}
                                
                                
                            </div>
                            <ul class="list-group list-group-flush bg-dark">
                                <li class="list-group-item"><i class="bi bi-gear-wide-connected"> </i>Cilindraje : {car.cylinder_capacity}</li>
                                <li class="list-group-item"><i class="bi bi-car-front"> </i>Capacidad : {car.capacity} Personas</li>
                                <li class="list-group-item"><i class="bi bi-calendar-date"> </i>Modelo : {car.model_year}</li>
                                <li class="list-group-item"><i class="bi bi-car-front-fill"> </i>Tipo : {car.typeCar.description}</li>
                                <li class="list-group-item"><i class="bi bi-card-text"> </i>Placa : {car.licence_plate}</li>
                               
                            </ul>
                            <div class="card-body">
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Link className="btn btn-success" to={ + car }>
                                        <i class="bi bi-plus-circle"> Alquilar</i>
                                    </Link>
                                </div>
                            </div>


                        </div>
                        </div>
                    
                ))}
        </div>

    );
};

export default IndexRent;
