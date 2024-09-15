import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../../store/appContext";


export const EditFavoritesUserAccordion = () => {
    const { store } = useContext(Context);

    return (
        <>
            <div className="d-flex flex-column align-items-start" style={{
                color: 'black', fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
            }}>
                <p className="mb-0" style={{
                    color: 'black', fontFamily: 'Arial, sans-serif',
                    fontWeight: 'bold',
                }}>Favoritos</p>
                <div className="d-flex flex-wrap" >
                    {store.favorites?.map((favorite) => (
                        <div key={favorite.id} className="card m-2" style={{ width: '18rem', backgroundColor: 'white' }}>

                            <div className="card-body rounded" >

                                <h5 className="card-title"><strong>Empresa:</strong> {favorite.nombre_empresa} <span><FontAwesomeIcon icon={faStar} style={{ color: 'gold', marginLeft: '10px' }} /></span></h5>
                                <p className="card-text">
                                    <strong>Nombre oferta:</strong> {favorite.name}<br />
                                    <strong>Modalidad:</strong> {favorite.modalidad}<br />
                                    <strong>Localidad:</strong> {favorite.localidad}<br />
                                    <strong>Fecha publicación:</strong> {favorite.fecha_publicacion}
                                </p>

                            </div>
                        </div>
                    ))}


                </div>

            </div>

        </>
    );
};
