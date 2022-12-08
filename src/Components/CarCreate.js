import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import typeCarServices from "../services/typecarServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";


const CarCreate = () => {


    const initialCarState = {
        id_car: null,
        licence_plate: "",
        description: "",
        image: "",
        cylinder_capacity: "",
        capacity: "",
        model_year: "",
        typeCar: null

    }

    const [Car, setCar] = useState(initialCarState);
    const [TypeCar, setTypeCar] = useState([]);
    const [Type, setType] = useState(null);
    const [errors, setErrors] = useState({});
    const [CarArray, setCarArray] = useState([]);
    const [Validat, setValidat] = useState(false);




    const handleInputChange = event => {
        const { name, value } = event.target;
        setCar({ ...Car, [name]: value });
    }

    const handleInputblur = event => {
        handleInputChange(event);
        setErrors(validationError(Car));
    }

    useEffect(() => {
        getList();
        getCar();
        if(Validat)
        newCar()
    }, [Validat]);



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

    const getCar = () => {
        carServices.getAll()
            .then(response => {
                setCarArray(response.data);
                console(response.data);
            }).catch(e => {
                console.log(e);
            })
    }

    const createCar = (e) => {
        e.preventDefault();
        var date = {
            id_car: Car.id_car, licence_plate: Car.licence_plate, description: Car.description,
            image: Car.image, cylinder_capacity: Car.cylinder_capacity, capacity: Car.capacity,
            model_year: Car.model_year, typeCar: Type
        }

        setErrors(validationError(Car));

        if(Object.keys(errors).length===0){
            
        carServices.create(date)
            .then(response => {
                setCar({
                    licence_plate: response.data.licence_plate, description: response.data.description,
                    image: response.data.image, cylinder_capacity: response.data.cylinder_capacity,
                    capacity: response.data.capacity, model_year: response.data.model_year, typeCar: response.data.Type
                });
                setValidat(true);
                console.log(response.data);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Vehículo Registrado Correctamente',
                    showConfirmButton: false,
                    timer: 2200
                })
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const newCar = () => {
        setCar(initialCarState);
        setTypeCar([]);
        setValidat(false);
    }

    const validationError = (Car) => {
        let errors = {}
 
        CarArray.forEach(car => {
            if (car.licence_plate === Car.licence_plate) {
                errors.licence_plate = "Este numero de placa ya existe";
            }
        })

        return errors;
    }



    return (
        <div className="submit-form">
            <div class="card  ">


                <div class="card-body ">
                    <h4>Registrar Vehículo</h4>
                    <blockquote class="blockquote mb-0 ">

                        <form onSubmit={createCar}
                            class="row g-3 needs-validation my-3  border = 1" >

                            <div class="col-md-3 position-relative">
                                <label for="licence_plate" class="form-label ">Placa</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-pencil-square"></i>
                                    </span>
                                    <input type="text" class={((errors.licence_plate) ? "is-invalid" : "") + " form-control"} 
                                    id="licence_plate"
                                        value={Car.licence_plate}
                                        placeholder="ABC - 1265"
                                        onBlur={handleInputblur}
                                        onKeyUp={handleInputblur}
                                        onChange={handleInputChange}
                                        name="licence_plate" required />
                                    <small className="invalid-feedback" id="helpId" >
                                    <i class="bi bi-exclamation-circle"> {errors.licence_plate}</i>
                                    </small>

                                </div>
                            </div> 

                            <div class="col-md-3 position-relative">
                                <label for="description" class="form-label ">Marca</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-pencil-square"></i>
                                    </span>
                                    <input type="text" class="form-control" id="description"
                                        value={Car.description}
                                        placeholder="Toyota, Porsche, etc..,"
                                        onChange={handleInputChange}
                                        name="description" required />

                                </div>
                            </div>

                            <div class="col-md-3 position-relative">
                                <label for="image" class="form-label ">Link Imagen</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-image"></i>
                                    </span>
                                    <input type="text" class="form-control" id="image"
                                        value={Car.image}
                                        placeholder="https://th.bing.com/th/id=ImgDet&rs=1"
                                        onChange={handleInputChange}
                                        name="image" />

                                </div>
                            </div>




                            <div class="col-md-3 position-relative">
                                <label for="cylinder_capacity" class="form-label">Cilindraje</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-gear-wide-connected"></i>
                                    </span>
                                    <input type="text" class="form-control" id="cylinder_capacity"
                                        value={Car.cylinder_capacity}
                                        placeholder="166 CV (124kW) 2694 cm 3. 2.8d"
                                        onChange={handleInputChange}
                                        name="cylinder_capacity" required />

                                </div>

                            </div>



                            <div class="col-md-3 position-relative">
                                <label for="capacity" class="form-label">Capacidad</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-car-front"></i>
                                    </span>
                                    <input type="text" class="form-control" id="capacity"
                                        value={Car.capacity}
                                        placeholder="2, 4, 5, 7, etc..."
                                        onChange={handleInputChange}
                                        name="capacity" required />

                                </div>
                            </div>


                            <div class="col-md-3 position-relative">
                                <label for="model_year" class="form-label">Modelo</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-calendar-date"></i>
                                    </span>
                                    <input type="text" class="form-control" id="model_year"
                                        value={Car.model_year}
                                        placeholder="Año 2020, 2022, 2018,etc..."
                                        onChange={handleInputChange}
                                        name="model_year" required />

                                </div>
                            </div>

                            <div className="form-group">
                                <label for="typeCar" class="form-label"> 
                                <i class="bi bi-car-front-fill"> </i>Tipo de Vehículo</label>
                                <div className="form-group">

                                    <select class="form-select" name="typeCar" id="typeCar"
                                        onChange={e => {
                                            console.log(JSON.parse(e.target.value))
                                            setType(JSON.parse(e.target.value))
                                        }}>

                                        <option selected>Seleccioné un Tipo de Vehículo</option>
                                        {TypeCar && TypeCar.map(
                                            (typeCar) => (
                                                <option value={JSON.stringify(typeCar)}>{typeCar.description}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>



                            <div class="col-12">
                                <button class="btn btn-secondary my-3  mx-2 " type="submit">
                                    <i class="bi bi-person-plus"> Registrar</i>
                                </button>
                                <Link className="btn btn-danger" to={"/CarList"}>
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

export default CarCreate;