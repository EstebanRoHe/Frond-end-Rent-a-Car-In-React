import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import carServices from "../services/carServices";
import typeCarServices from "../services/typecarServices";
import Swal from "sweetalert2";


const CarUpdate = props => {
    const { id_car } = useParams();
    const [Type, setType] = useState(null);
    const initialCarState = {
        id_car: null,
        licence_plate: "",
        description: "",
        image: "",
        cylinder_capacity: "",
        capacity: "",
        model_year: "",
        typeCar:{}

    }

    const [Car, setCar] = useState(initialCarState);
    const [TypeCar, setTypeCar] = useState([]);
    

    const getCar = id_car => {
        carServices.get(id_car)
            .then(response => {
                setCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getList();
        if (id_car)
            getCar(id_car);
    }, [id_car]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCar({ ...Car, [name]: value });
    }


    const getList = () => {
        typeCarServices.getAll()
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const updateCar = () => {
        carServices.update(Car.id_car, Car)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Vehiculo Actualizado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                  })
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (

        <div class="card  ">


            <div class="card-body ">
                <h4>Actualizar Vehículo del Id : {Car.id_car}</h4>
                <blockquote class="blockquote mb-0 ">

                    <form novalidate onSubmit={ e =>{
                        e.preventDefault()
                        updateCar()
                    }}


                        class="row g-3 needs-validation my-3  border = 1" >

                        <div class="col-md-3 position-relative">
                            <label for="licence_plate" class="form-label ">Placa</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                    <i class="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" class="form-control" id="licence_plate" value={Car.licence_plate}
                                    onChange={handleInputChange} name="licence_plate" required />
                                <div class="valid-tooltip">
                                    Looks good!
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 position-relative">
                            <label for="description" class="form-label ">Marca</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                    <i class="bi bi-pencil-square"></i>
                                </span>
                                <input type="text" class="form-control" id="description" value={Car.description}
                                    onChange={handleInputChange} name="description" required />
                                <div class="valid-tooltip">
                                    Looks good!
                                </div>
                            </div>
                        </div>



                        <div class="col-md-3 position-relative">
                            <label for="image" class="form-label ">Imagen</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-image"></i>
                                </span>
                                <input type="text" class="form-control" id="image" value={Car.image}
                                    onChange={handleInputChange} name="image" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid emil.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="cylinder_capacity" class="form-label">Cilindraje</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-gear-wide-connected"></i>
                                </span>
                                <input type="text" class="form-control" id="cylinder_capacity" value={Car.cylinder_capacity}
                                    onChange={handleInputChange} name="cylinder_capacity" required />
                                <div class="invalid-tooltip">
                                    Please choose a unique and valid username.
                                </div>
                            </div>

                        </div>



                        <div class="col-md-3 position-relative">
                            <label for="capacity" class="form-label">Capacidad</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-car-front"></i>
                                </span>
                                <input type="text" class="form-control" id="capacity" value={Car.capacity}
                                    onChange={handleInputChange} name="capacity" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>

 
                        <div class="col-md-3 position-relative">
                            <label for="model_year" class="form-label">Modelo</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-calendar-date"></i>
                                </span>
                                <input type="text" class="form-control" id="model_year" value={Car.model_year}
                                    onChange={handleInputChange} name="model_year" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 position-relative">
                            <label for="typeCar" class="form-label">Tipo</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-car-front-fill"></i>
                                </span>
                                <input type="text" class="form-control" id="typeCar" value={Car.typeCar.description}
                                     name="typeCar" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid password.
                                </div>
                            </div>
                        </div>


                        <div class="col-12">
                            <button class="btn btn-secondary my-3  mx-2 " type="submit">
                                <i class="bi bi-person-plus"> Actualizar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/CarList"}>
                                <i class="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>




    );
};

export default CarUpdate;