import React, { useState, useEffect } from "react";
import carServices from "../services/carServices";
import typeCarServices from "../services/typecarServices";
import { Link } from 'react-router-dom';


const CarCreate = () => {
    const initialCarState = {
        id_car:null,
        licence_plate: "",
        description: "",
        color: "",
        cylinder_capacity: "",
        capacity: "",
        model_year: "",
        typeCar:{}

    }
   
    const [Car, setCar] = useState(initialCarState);
    const [TypeCar, setTypeCar] = useState([]);
    const [Type, setType] = useState(null);
    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCar({ ...Car, [name]: value });
    }

    useEffect(() => {
        getList();
    }, []);

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

    const createCar= () => {
        var date = { id_car: Car.id_car, licence_plate: Car.licence_plate, description: Car.description, 
            color: Car.color, cylinder_capacity: Car.cylinder_capacity, capacity: Car.capacity,
            model_year: Car.model_year, typeCar: Type}
        carServices.create(date)
            .then(response => {
                setCar({ licence_plate: response.data.licence_plate, description:response.data.description,
                color:response.data.color, cylinder_capacity:response.data.cylinder_capacity, 
                capacity:response.data.capacity, model_year:response.data.model_year, typeCar: response.data.Type});
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })


    }

    return (
        <div class="card  ">


            <div class="card-body ">
            <h4>Registrar</h4>
                <blockquote class="blockquote mb-0 ">

                    <form novalidate onSubmit={
                        e=>{
                            
                            createCar();
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
                            <label for="color" class="form-label ">Color</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-paint-bucket"></i>
                                </span>
                                <input type="text" class="form-control" id="color" value={Car.color}  
                                onChange={handleInputChange} name="color" required />
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
                            <input type="text" class="form-control" id="capacity"  value={Car.capacity} 
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
                            <input type="text" class="form-control" id="model_year"  value={Car.model_year} 
                            onChange={handleInputChange} name="model_year" required />
                            <div class="invalid-tooltip">
                                Please provide a valid password.
                            </div>
                            </div>
                        </div>

                        <div className="form-group">
                        <label for="typeCar" class="form-label"> <i class="bi bi-car-front-fill"> </i>Tipo de Vehiculo</label>
                            <div className="form-group">
                           
                                <select class="form-select" name="typeCar" id="typeCar" 
                                onChange={e => {
                                    console.log(JSON.parse(e.target.value))
                                    setType(JSON.parse(e.target.value))
                                }}>
                               
                                    <option selected>Seleccione un Tipo de Vehiculo</option>
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

    );
};

export default CarCreate;