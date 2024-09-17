import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/PostuladosList.css';
import { Link } from "react-router-dom";

export const PostuladosList = () => {
    const { store, actions } = useContext(Context);
    const { oferta_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postulados, setPostulados] = useState([]);

    useEffect(() => {
        const fetchPostulados = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/oferta/${oferta_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setPostulados(Array.isArray(data.oferta.postulados) ? data.oferta.postulados : null);
                } else {
                    setError(data.msg);
                }
            } catch (error) {
                setError('Error al obtener los postulados');
            } finally {
                setLoading(false);
            }
        };

        if (oferta_id) {
            fetchPostulados();
        }
    }, [oferta_id, store.token]);



    return (
        <div className="container mt-4">
            <div className="postulados-box-header text-center">
                <h2 className="postulados-header text-secondary fw-bold">
                    Es hora de <span className="color-title-postulado">contactar!</span>
                </h2>
                <p className="text-secondary p-header">
                    Cada vez más cerca de encontrar el candidato perfecto
                </p>
            </div>
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center text-secondary">{error}</p>}
            {!Array.isArray(postulados) && !loading && (
                <p className="text-center text-danger">No se encontraron postulados o el formato de datos es incorrecto.</p>
            )}
            {Array.isArray(postulados) && postulados.length === 0 && !loading && (
                <p className="text-center text-warning">No hay postulados disponibles para esta oferta.</p>
            )}
            <div className="row">
                {Array.isArray(postulados) && postulados.map((postulado) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex mx-auto" key={postulado.user_id}>
                        <div className="card card-box h-100 shadow-sm">
                            <img
                                className="foto-perfil mx-auto"
                                src="https://static.vecteezy.com/system/resources/previews/002/205/989/non_2x/user-profile-icon-free-vector.jpg"
                                alt=""
                            />
                            <div className="card-body card-body-body">
                                <p className="postulados-card-text">
                                    <strong>Email:</strong> {postulado.email}
                                </p>
                                <p className="postulados-card-text">
                                    <strong>Descripcion:</strong> {postulado.programador.descripcion}
                                </p>
                                <p className="postulados-card-text">
                                    <strong>Experiencia:</strong> {postulado.programador.experiencia}
                                </p>
                                <p className="postulados-card-text">
                                    <strong>Precio hora:</strong> {postulado.programador.precio_hora}
                                </p>

                                <Link to={`/Form_Contact_Postulados/${postulado.user_id}`}>
                                    <button className="boton-contactar">Contactar</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};