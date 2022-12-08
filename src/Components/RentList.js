import React, { useState, useEffect } from "react";
import rentServices from "../services/rentServices";
import Swal from "sweetalert2";

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

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Deseas eliminar este archivo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                rentServices.remove(id_rent)
                    .then(response => {
                        console.log(response.data);

                        navigate(getList());
                    })
                swalWithBootstrapButtons.fire(

                    'Eliminado!',
                    'Tu archivo ha sido eliminado',
                    'Correctamente'
                )

            } else if (

                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se ha eliminado nungun archivo'
                )
            }
        })
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
                                                <i class="bi bi-trash3"> Eliminar</i>
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


