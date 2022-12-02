import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import { Link, useNavigate } from "react-router-dom";

const CarList = () => {
    const [Car, setCar] = useState([]);
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

    const remove = (id_car) => {
        carServices.remove(id_car)
            .then(response => {
                console.log(response.data);
                navigate(getList());
            });
    };

    return (

        <div class="card text bg-light mb-3">
            <div class="card-header">
                <Link className="btn btn-secondary" to={"/CarCreate"}>
                <i class="bi bi-plus-circle"> Registrarse Vehiculo </i>
                    </Link>
 
            </div>

            <div class="card-body ">
                <div class="table-responsive">
                    <table class="table table-striped border = 1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Color</th>
                                <th scope="col">Cilindraje</th>
                                <th scope="col">Capacidad</th>
                                <th scope="col">Modelo</th>
                                <th scope="col">Tipo</th>
                            
                            </tr>
                          
                        </thead>
                        <tbody>
                            {Car && Car.map(
                                (car) => (
                                    <tr key={car.id_car}>
                                        <th scope="row">{car.id_car}</th>
                                        <td>{car.licence_plate}</td>
                                        <td>{car.description}</td>
                                        <td>{car.color}</td>
                                        <td>{car.cylinder_capacity}</td>
                                        <td>{car.capacity}</td>
                                        <td>{car.model_year}</td>
                                        <td>{car.typeCar.description}</td>

                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link className="btn btn-secondary" to={"/CarUpdate/" + car.id_car}>
                                                <i class="bi bi-gear"> Actualizar</i>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => remove(car.id_car)}>
                                            <i class="bi bi-x-circle"> Eliminar</i>
                                            </button>
                                            </div>

                                            </td>
                                    </tr>

                                )
                            )}
                        </tbody>

                    </table>

                </div>
            </div>
        </div>






    );
};

export default CarList;