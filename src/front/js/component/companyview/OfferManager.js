import React, { useState, useEffect, useContext } from 'react';
import OfferCard from './OfferCard';
import { ListOffers } from '../CardListOffers.jsx';
import { Context } from '../../store/appContext.js';


const OfferManager = ({ empleador_id }) => {
    const { store, actions } = useContext(Context);
    const [offers, setOffers] = useState([]);


    useEffect(() => {
        if (store.jobOffers.length > 0) {
            const employerOffers = store.jobOffers.filter(offer => offer.empleador_id === store.user?.profile_empleador.id);
            setOffers(employerOffers);
        }

    }, [store.jobOffers, empleador_id]);

    return (
        <div className='container'>

            <div className="d-flex flex-wrap justify-content-center">
                {offers.length > 1 ? (
                    offers.map((offer, index) => (
                        <OfferCard
                            key={index}
                            title={offer.name}
                            description={offer.descripcion}
                            fecha_publicacion={offer.fecha_publicacion}
                            oferta_id={offer.id}
                            modalidad={offer.modalidad}
                            experiencia_minima={offer.experiencia_minima}
                            tipo_contrato={offer.tipo_contrato}
                            n_postulados={offer.postulados.length}
                        />
                    ))
                ) : "No hay ofertas"}


            </div>


        </div>
    );
};

export default OfferManager;


