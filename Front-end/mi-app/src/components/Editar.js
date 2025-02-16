import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const Editar = () => {
    const urlBase = "http://localhost:8080/crud-app/empleados";
    const {id} = useParams();

    const [empleado, setEmpleado] = useState({
        nombre: "",
        correo: ""
    });

    const { nombre, correo } = empleado;

    const cargarEmpleado = async () => {
        const respuesta = await axios.get(`${urlBase}/${id}`);
        setEmpleado(respuesta.data);
    }  

    useEffect(() => {
        cargarEmpleado();
    }, []); 

    const history = useHistory();

    const cambioValor = (e) => {
        setEmpleado({...empleado, [e.target.name]: e.target.value});
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        await axios.put(`${urlBase}/${id}`, empleado);
        console.log("Formulario enviado");
        console.log(nombre);
        console.log(correo);
        history.push("/");
    }

        return (
            <div className='card'>
                <div className='card-header'>
                {{id} ? `Editar Empleado ID: ${id}` : 'Crear Nuevo Empleado'}
                </div>
                <div className='card-body'>
                    <form onSubmit={enviarDatos}>
                        <div className='mb-3'>
                            <label htmlFor='' className='form-label'>Nombre</label>
                            <input type='text' name='nombre' onChange={cambioValor} id='nombre' value={empleado.nombre} className='form-control' placeholder='Digite el nombre' aria-describedby='helpId' required='true' />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='' className='form-label'>Correo</label>
                            <input type='email' name='correo' onChange={cambioValor} id='correo' value={empleado.correo} className='form-control' placeholder='Digite el correo' aria-describedby='helpId' required='true' />
                        </div>
                        
                        <div className='btn-group' role='group' aria-label=''>
                            <button type='submit' className='btn btn-success' to={"/crear"}>Editar Empleado</button>
                            <Link type='button' className='btn btn-danger' to={"/"}>Cancelar</Link>
                        </div>

                    </form>
                </div>
                <div className='card-footer text-muted'>
                </div>
            </div>
        );
    }


export default Editar;