import React, { useState, useEffect } from "react";
import UserServices from "../services/usernameServices";
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";

const UserCreate = () => {

    const initialUserState = {
        id_username: null,
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: "",

    }

    const [User, setUser] = useState(initialUserState);
    const [userArray, setUserArray] = useState([]);
    const [errors, setErrors] = useState({});



    useEffect(() => {

        getList();

    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });

    };

    const handleInputblur = (event) => {
        handleInputChange(event);
        setErrors(validationErrror(User));

    };



    const getList = () => {
        UserServices.getAll()
            .then(response => {
                setUserArray(response.data);
                console.log(response.data);
            }).catch(e => {
                console.log(e);
            })
    }


    const createUser = (e) => {
        e.preventDefault();
        var data = {
            id_username: User.id_username, name: User.name, lastName: User.lastName,
            username: User.username, password: User.password, email: User.email
        };
        setErrors(validationErrror(User));

        if (Object.keys(errors).length === 0) {
            UserServices.create(data)
                .then(response => {
                    setUser({
                        name: response.data.name, lastName: response.data.lastName,
                        username: response.data.username, password: response.data.password, email: response.data.email
                    });

                    console.log(response.data);
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Usuario Registrado Correctamente',
                        showConfirmButton: false,
                        timer: 2200,
                    }).then(
                        newUser()
                    );


                })
                .catch(e => {
                    console.log(e);
                });

        }
    };


    const newUser = () => {
        setUser(initialUserState);

    }

    const validationErrror = (User) => {
        let errors = {}

        userArray.forEach(user => {
            if (user.email === User.email) {
                errors.email = "Email ya resgistrado"

            }
        })

        userArray.forEach(user => {
            if (user.username === User.username) {
                errors.username = "Username ya resgistrado"

            }
        })



        return errors;
    }

    return (
        <div className="submit-form">

            <div class="card  ">

                <div class="card-body ">
                    <h4>Registrar</h4>
                    <blockquote class="blockquote mb-0 ">

                        <form  onSubmit={createUser}
                        class="row g-3 needs-validation my-3  border = 1"
                           >

                            <div class="col-md-3 position-relative">
                                <label for="name" class="form-label ">Nombre</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-pencil-square"></i>
                                    </span>
                                    <input type="text" class="form-control" id="name" value={User.name}
                                        placeholder="John"
                                        onChange={handleInputChange} name="name" required />

                                </div>
                            </div>

                            <div class="col-md-3 position-relative">
                                <label for="lastName" class="form-label ">Apellido</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-pencil-square"></i>
                                    </span>
                                    <input type="text" class="form-control" id="lastName" value={User.lastName}
                                        placeholder="Rodríguez"
                                        onChange={handleInputChange} name="lastName" required />

                                </div>
                            </div>



                            <div class="col-md-6 position-relative">
                                <label for="email" class="form-label ">Email</label>
                                <div class="input-group has-validation ">
                                    <span class="input-group-text">
                                        <i class="bi bi-envelope-at"></i>
                                    </span>
                                    <input type="email" class={((errors.email) ? "is-invalid" : "") + " form-control"} 
                                    id="email" value={User.email}
                                        placeholder="john@gmail.com"
                                        onBlur={handleInputblur}
                                        onChange={handleInputChange}
                                        onKeyUp={handleInputblur}
                                        name="email" required />
                                    <small className="invalid-feedback" id="helpId" >
                                        <i class="bi bi-exclamation-circle"> {errors.email}</i>
                                        </small>


                                </div>
                            </div>
                            <div class="col-md-3 position-relative">
                                <label for="username" class="form-label">Usuario</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-person"></i>
                                    </span>
                                    <input type="text" class={((errors.username) ? "is-invalid" : "") + " form-control"} 
                                    id="username" value={User.username}
                                        placeholder="john@123"
                                        onBlur={handleInputblur}
                                        onChange={handleInputChange}
                                        onKeyUp={handleInputblur}
                                        name="username" required />
                                    <small className="invalid-feedback" id="helpId" >
                                        <i class="bi bi-exclamation-circle"> {errors.username}</i>
                                        </small>


                                </div>

                            </div>

                            <div class="col-md-3 position-relative">
                                <label for="password" class="form-label">Password</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text">
                                        <i class="bi bi-key"></i>
                                    </span>
                                    <input type="password" class="form-control" id="password" value={User.password}
                                        placeholder="Digite una contraseña"
                                        onChange={handleInputChange} name="password" required />

                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-secondary my-3  mx-2 " type="submit">
                                    <i class="bi bi-person-plus"> Registrar</i>
                                </button>
                                <Link className="btn btn-danger" to={"/"}>
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
export default UserCreate;



