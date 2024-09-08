import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from "../../store/appContext"

export const EditUserCountry = ({ increaseProgress }) => {
    const [showModal, setShowModal] = useState(false);
    const [newUserCountry, setNewUserCountry] = useState("");
    const { store } = useContext(Context);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        setNewUserCountry(newUserCountry);
        handleClose();
        increaseProgress(10);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave(e);
        }
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{
                color: 'Black', fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold', fontSize: '25px',
            }}>
                <p className="mb-0">
                    <i className="fa-solid fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>
                    País: <p className='text-white'>{store.user?.country}</p>
                </p>

                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ width: '15px', height: '15px', }} />
                </button>
            </div >

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar País</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formUserPhone">
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={newUserCountry}
                                onChange={(e) => setNewUserCountry(e.target.value)}
                                placeholder="Número de teléfono"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="secondary" onClick={handleSave} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
