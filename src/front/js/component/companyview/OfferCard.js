import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OfferCard = ({ title, description, oferta_id, fecha_publicacion, modalidad, experiencia_minima, n_postulados, tipo_contrato }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px', backgroundColor: '#6793AE' }}>
            <Card.Body>
                <Card.Title style={{ color: 'white', fontStyle: 'bold', textAlign: 'center' }}>{title}</Card.Title>
                <Card.Text style={{ color: 'white' }} ><strong>Tipo de contrato: </strong>{tipo_contrato}</Card.Text>
                <Card.Text style={{ color: 'white' }} ><strong>Experiencia minima: </strong>{experiencia_minima}</Card.Text>
                <Card.Text style={{ color: 'white' }} ><strong>Modalidad: </strong>{modalidad}</Card.Text>
                <Card.Text style={{ color: 'white' }}><strong>Descripción: </strong> {description}</Card.Text>
                <Card.Text style={{ color: 'white' }}><strong>Fecha de publicacion: </strong>{fecha_publicacion}</Card.Text>
                <Card.Text style={{ color: 'white' }}><strong>Nº de postulados: </strong>{n_postulados}</Card.Text>

                <Link to={"/postuladoslist/" + oferta_id}>
                    <button style={{ color: '#6793AE' }} type='button' className="ml-2 btn btn-light w-100" >Ver Postulados</button>

                </Link>


            </Card.Body>
        </Card >
    );
};

export default OfferCard;
