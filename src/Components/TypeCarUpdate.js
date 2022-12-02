import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import typeCarServices from "../services/typecarServices";



const TypeCarUpDate = () => {
    const { id_typeCar } = useParams();

    const initialTypeCarState = {
        id_typeCar: null,
        description: ""
    }

    const [TypeCar, setTypeCar] = useState(initialTypeCarState);

    const getTypeCar = id_typeCar => {
        typeCarServices.get(id_typeCar)
            .then(response => {
                setTypeCar(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (id_typeCar)
            getTypeCar(id_typeCar);
    }, [id_typeCar]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTypeCar({ ...TypeCar, [name]: value });
    }

    const updateTypeCar = () => {
        typeCarServices.update(TypeCar.id_typeCar, TypeCar)
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
                <h5>Actualizar Tipo de Vehiculo del Id : {TypeCar.id_typeCar}</h5>
                <blockquote class="blockquote mb-0 ">

                    <form novalidate onSubmit={updateTypeCar}
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
                            <button class="btn btn-secondary my-3 mx-2" type="submit">
                                <i class="bi bi-gear"> Actualizar</i>
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

export default TypeCarUpDate;

