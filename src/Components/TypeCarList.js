import React, { useState, useEffect } from "react";
import typeCarServices from "../services/typecarServices";
import { Link, useNavigate } from "react-router-dom";

const TypeCarList = () => {
    const [TypeCar, setTypeCar] = useState([]);
    let navigate = useNavigate;

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

    const remove = (id_typeCar) => {
        typeCarServices.remove(id_typeCar)
            .then(response => {
                console.log(response.data);
                navigate(getList());
            });
    };

    return (

        <div class="card text bg-light mb-3">
            <div class="card-header">
                <Link className="btn btn-secondary" to={"/TypeCarCreate"}>
                    <i class="bi bi-plus-circle"> Registrar Tipo de Vehiculo </i>

                </Link>

            </div>

            <div class="card-body ">
                <div class="table-responsive ">
                    <table class="table table-striped border = 1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Descripción</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {TypeCar && TypeCar.map(
                                (typecar) => (
                                    <tr key={typecar.id_typeCar}>
                                        <th scope="row">{typecar.id_typeCar}</th>
                                        <td>{typecar.description}</td>

                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link className="btn btn-secondary" to={"/TypeCarUpDate/" + typecar.id_typeCar}>
                                                <i class="bi bi-gear"> Actualizar</i>
                                            </Link>
                                                 <button className="btn btn-danger"
                                                onClick={() => remove(typecar.id_typeCar)}>
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

export default TypeCarList;