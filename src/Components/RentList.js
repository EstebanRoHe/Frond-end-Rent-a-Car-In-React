import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";

import { Link, useNavigate } from "react-router-dom";

const RentList = () => {
    const [Rent, setRent] = useState([]);
    let navigate = useNavigate;

    useEffect(() => {
        getList();
    }, []);

    const getList = () => {
        
        rentServices.getAll()
            .then(response => {
                setRent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const remove = (id_rent) => {
        rentServices.remove(id_rent)
            .then(response => {
                console.log(response.data);
                navigate(getList());
            });
    };

    return (

        <div class="card text bg-light mb-3">
            <div class="card-header">
                <Link className="btn btn-secondary" to={"/RentCreate"}>
                <i class="bi bi-card-checklist"> Rentar un Vehiculo</i>
                    </Link>

            </div>

            <div class="card-body ">
                <div class="table-responsive">
                    <table class="table table-striped border = 1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Vehiculo</th>
                                <th scope="col">Fecha</th>
                                
                            </tr> 
                          
                        </thead>
                        <tbody>
                            {Rent && Rent.map(
                                (rent) => (
                                    <tr key={rent.id_rent}>
                                        <th scope="row">{rent.id_rent}</th>
                                        <td>{rent.username.username}</td>
                                        <td>{rent.car.licence_plate}</td>
                                        <td>{rent.date_rent}</td>
                                        
                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link className="btn btn-secondary" to={"/RentUpdate/" + rent.id_rent}>
                                                <i class="bi bi-gear"> Actualizar</i>
                                            </Link>
                                            
                                            <button className="btn btn-danger" onClick={() => remove(rent.id_rent)}>
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

export default RentList;