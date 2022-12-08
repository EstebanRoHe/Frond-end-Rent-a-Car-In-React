import React, { useState, useEffect } from "react";
import userServices from "../services/usernameServices";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const UserList = () => {
    const [User, setUser] = useState([]);
    let navigate = useNavigate;

    useEffect(() => {
        getList();
    }, []);
 
    const getList = () => {
        userServices.getAll()
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    const remove = (id_username) => {
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
                userServices.remove(id_username)
                .then(response => {
                    console.log(response.data);
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'Tu archivo ha sido eliminado',
                        'Correctamente'
                      )
                    navigate(getList());
                })  
              swalWithBootstrapButtons.fire(
                'Error!',
                'Tu archivo esta ligado a otro, Primero elimine el archivo ligado a este Correctamente'
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
                <Link className="btn btn-secondary" to={"/UserCreate"}>
                <i class="bi bi-person-plus"> Registrarse</i>
                    </Link>

            </div>

            <div class="card-body ">
                <div class="table-responsive">
                    <table class="table table-striped border = 1">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {User && User.map(
                                (username) => (
                                    <tr key={username.id_username}>
                                        <th scope="row">{username.id_username}</th>
                                        <td>{username.name}</td>
                                        <td>{username.lastName}</td>
                                        <td>{username.username}</td>
                                        <td>{username.email}</td>

                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                                <Link className="btn btn-secondary" to={"/UserUpdate/" + username.id_username}>
                                                <i class="bi bi-gear"> Actualizar</i>
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => remove(username.id_username)}>
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

export default UserList;