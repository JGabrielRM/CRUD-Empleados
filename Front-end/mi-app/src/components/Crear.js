import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Crear = () => {

    const [empleado, setEmpleado] = useState({
        nombre: "",
        correo: ""
    });

    const { nombre, correo } = empleado;
    const history = useHistory();

    const cambioValor = (e) => {
        setEmpleado({...empleado, [e.target.name]: e.target.value});
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/crud-app/empleados";
        await axios.post(urlBase, empleado);
        console.log("Formulario enviado");
        console.log(nombre);
        console.log(correo);
        history.push("/");
    }


    return (
        <div className='card'>
            <div className='card-header'>
                Crear Empleado
            </div>
            <div className='card-body'>
                <form onSubmit={enviarDatos}>
                    <div className='mb-3'>
                        <label htmlFor='nombre' className='form-label'>Nombre</label>
                        <input type='text' name='nombre' onChange={cambioValor} id='nombre' value={nombre} className='form-control' placeholder='Digite el nombre' aria-describedby='helpId' required="true" />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='correo' className='form-label'>Correo</label>
                        <input type='email' name='correo' onChange={cambioValor} id='correo' value={correo} className='form-control' placeholder='Digite el correo' aria-describedby='helpId' required="true" />
                    </div>
                    
                    <div className='btn-group' role='group' aria-label=''>
                        <button type='submit' className='btn btn-success'>Agregar Empleado</button>
                        <Link type='button' className='btn btn-danger' to={"/"}>Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Crear;
