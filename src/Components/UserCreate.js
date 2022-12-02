import React, { useState, useEffect } from "react";
import userServices from "../services/usernameServices";
import { Link } from 'react-router-dom';


const UserCreate = () => {
    const initialUserState = {
        id_username: null,
        name: "",
        lastName: "",
        username: "",
        password: "",
        email: ""
    }

    const [User, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...User, [name]: value });
    }

    const createUser = () => {
        var date = { id_username: User.id_username, name: User.name, lastName: User.lastName, username: User.username, password: User.password, email: User.email }
        userServices.create(date)
            .then(response => {
                setUser({ name: response.data.name, lastName: response.data.lastName, username: response.data.username, password: response.data.password, email: response.data.email });
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

                    <form novalidate onSubmit={createUser}
                        class="row g-3 needs-validation my-3  border = 1" >

                        <div class="col-md-3 position-relative">
                            <label for="name" class="form-label ">Nombre</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-pencil-square"></i>
                                </span>
                            <input type="text" class="form-control" id="name" value={User.name} onChange={handleInputChange} name="name" required />
                            <div class="valid-tooltip">
                                Looks good!
                            </div>
                            </div>
                        </div>

                        <div class="col-md-3 position-relative">
                            <label for="lastName" class="form-label ">Apellido</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-pencil-square"></i>
                                </span>
                            <input type="text" class="form-control" id="lastName" value={User.lastName} onChange={handleInputChange} name="lastName" required />
                            <div class="valid-tooltip">
                                Looks good!
                            </div>
                            </div>
                        </div>



                        <div class="col-md-6 position-relative">
                            <label for="email" class="form-label ">Email</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-envelope-at"></i>
                                </span>
                                <input type="email" class="form-control" id="email" onChange={handleInputChange} name="email" required />
                                <div class="invalid-tooltip">
                                    Please provide a valid emil.
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 position-relative">
                            <label for="username" class="form-label">Usuario</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-person"></i>
                                </span>
                                <input type="text" class="form-control" id="username" value={User.username} onChange={handleInputChange} name="username" required />
                                <div class="invalid-tooltip">
                                    Please choose a unique and valid username.
                                </div>
                                </div>
                            
                        </div>
                        
                        <div class="col-md-3 position-relative">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-group has-validation">
                                <span class="input-group-text">
                                <i class="bi bi-key"></i>
                                </span>
                            <input type="password" class="form-control" id="password" onChange={handleInputChange} name="password" required />
                            <div class="invalid-tooltip">
                                Please provide a valid password.
                            </div>
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

    );
};

export default UserCreate;