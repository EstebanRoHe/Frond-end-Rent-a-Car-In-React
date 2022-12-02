import React, { useState} from "react";
import typeCarServices from "../services/typecarServices";
import { Link } from 'react-router-dom';


const TypeCarCreate = () => {
    const initialTypeCarState = {
        id_typeCar: null,
        description: ""
    }

    const [TypeCar, setTypeCar] = useState(initialTypeCarState);

    const handleInputChange = event => {
        const {name, value } = event.target;
        setTypeCar({...TypeCar, [name]: value });
    }

    

    const createTypeCar = () => {
        var date = { id_typeCar: TypeCar.id_typeCar, description: TypeCar.description}
        typeCarServices.create(date)
            .then(response => {  
                setTypeCar({description: response.data.description});
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

                    <form novalidate onSubmit={createTypeCar}
                        class="row g-3 needs-validation my-3  border = 1" >

                        <div class="col-md-3 position-relative">
                            <label for="description" class="form-label ">Descripción</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-pencil-square"></i>
                                </span>
                            <input type="text" class="form-control" id="description" value={TypeCar.description} onChange={handleInputChange} name="description" required />
                            <div class="valid-tooltip">
                                Looks good!
                            </div>
                            </div>
                        </div>

                        
                        <div class="col-12">
                            <button class="btn btn-secondary my-3  mx-2 " type="submit">
                            <i class="bi bi-person-plus"> Registrar</i>
                            </button>
                            <Link className="btn btn-danger" to={"/TypeCarList"}>
                                <i class="bi bi-x-circle"> Cancelar</i>
                            </Link>
                        </div>

                    </form>



                </blockquote>
            </div>
        </div>

    );
};

export default TypeCarCreate;