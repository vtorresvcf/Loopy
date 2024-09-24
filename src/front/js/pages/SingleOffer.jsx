import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "../component/ModalJobApply.jsx";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const offer = store.jobOffers.find((offer) => offer.id === parseInt(id));
    const isProgramador = store.user && store.user.profile_programador;

    useEffect(() => {
        if (offer) {
            actions.getNumeroPostulados(id).then((count) => {
                if (count !== null) {
                    setNumeroInscritos(count);
                }
            });
        }

        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(parseInt(id));
            setIsSubscribed(subscribed);
        }
    }, [id, offer, actions, store.user]);

    const handleApplyClick = async () => {
        if (!store.user || !store.user.profile_programador) {
            setModalMessage("Solo los programadores pueden inscribirse en esta oferta.");
            setModalType("warning");
            setShowLoginButton(!store.user);
            setIsModalOpen(true);
            return;
        }

        try {
            let result;
            if (isSubscribed) {
                result = await actions.unapplyFromJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(false);
                    setNumeroInscritos((prev) => prev - 1);
                } else {
                    throw new Error("Error al desinscribirse, intente nuevamente.");
                }
            } else {
                result = await actions.applyToJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(true);
                    setNumeroInscritos((prev) => prev + 1);
                } else {
                    throw new Error("Error al inscribirse, intente nuevamente.");
                }
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
        } finally {
            setIsModalOpen(true);
        }
    };

    const handleViewCompany = () => {
        navigate(`/Companyview/${id}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowLoginButton(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "short" };
        return date.toLocaleDateString("es-ES", options);
    };

    if (!offer) {
        return <div className="container my-5">Oferta no encontrada</div>;
    }

    return (
        <>
            <div className="container-single-offer my-4 p-0 wrapper">
                <h1 className="titulo-single-offers-page">¡Inscríbete y trabaja en proyectos innovadores!</h1>
                <div className="card single-offer-box shadow-sm p-3 shadow-lg mx-auto">
                    <div className="row align-items-center">
                        <div className="col-4 text-center">
                            <img
                                src="https://static.wixstatic.com/media/99e904_e49184c4e6fe4e14bb9ea13b5e9d009e~mv2.png/v1/fill/w_640,h_640,al_c,lg_1,q_90,enc_auto/99e904_e49184c4e6fe4e14bb9ea13b5e9d009e~mv2.png"
                                alt="Company Logo"
                                className="img-fluid rounded-circle"
                                style={{ width: "200px", height: "200px" }} // Imagen más grande
                            />
                            <div className="text-muted mt-2">
                                <span className="num-postulados">{numeroInscritos} Inscritos</span>
                            </div>
                        </div>
                        <div className="col-8 d-flex flex-column">
                            <h2 className="offer-title">{offer.name}</h2>
                            <p className="company-info" onClick={handleViewCompany}>
                                {offer.nombre_empresa} - {offer.localidad}
                            </p>
                            <p className="date-posted">Publicado el {formatDate(offer.fecha_publicacion)}</p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <hr />
                            <p className="offer-description">{offer.descripcion}</p>
                            <hr />
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <ul className="offer-details">
                                <li>📋 <strong>Requisitos mínimos:</strong> {offer.requisitos_minimos} </li>
                                <li>🌍 <strong>Idiomas:</strong> {offer.idiomas}</li>
                                <li>💸 <strong>Salario:</strong> {offer.salario}</li>
                                <li>🎓 <strong>Estudios mínimos:</strong> {offer.estudios_minimos}</li>
                                <li>🏠 <strong>Modalidad:</strong> {offer.modalidad}</li>
                                <li>📝 <strong>Tipo de contrato:</strong> {offer.tipo_contrato}</li>
                                <li>📍 <strong>Localidad:</strong> {offer.localidad}</li>
                            </ul>
                        </div>
                    </div>

                    {isProgramador && (
                        <div className="text-end mt-3">
                            <button className="btn btn-apply btn-lg" onClick={handleApplyClick}>
                                {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <ModalJobApply
                    message={modalMessage}
                    type={modalType}
                    onClose={handleCloseModal}
                    showLoginButton={showLoginButton}
                />
            )}
        </>
    );
};