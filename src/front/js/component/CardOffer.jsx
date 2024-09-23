import React, { useState, useContext, useEffect } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "./ModalJobApply.jsx";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { MdWork, MdPaid, MdOutlineTrendingUp } from "react-icons/md"; // Importando íconos

export const CardOffer = ({ id }) => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const offer = store.jobOffers.find((offer) => offer.id === id);
    if (!offer) return <div>Oferta no encontrada</div>;

    const checkIfFavorite = () => store.favorites?.some((fav) => fav.id === id);

    useEffect(() => {
        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(id);
            setIsSubscribed(subscribed);
        }

        actions.getNumeroPostulados(id).then((count) => {
            if (count !== null) {
                setNumeroInscritos(count);
            }
        });

        setIsFavorite(checkIfFavorite());
    }, [store.user, id, actions, store.favorites]);

    const handleViewDetails = () => navigate(`/singleoffer/${id}`);

    const handleFavoriteClick = async () => {
        if (!store.user) {
            setModalMessage("Debes estar registrado para agregar a favoritos.");
            setModalType("warning");
            setIsModalOpen(true);
            return;
        }

        const programador_id = store.user.profile_programador?.id || null;
        const empleador_id = store.user.profile_empleador?.id || null;
        const oferta_id = id;

        try {
            if (isFavorite) {
                const result = await actions.removeFavorite(programador_id, empleador_id, oferta_id);
                if (result) {
                    setIsFavorite(false);
                } else {
                    throw new Error("No se pudo eliminar de favoritos.");
                }
            } else {
                const result = await actions.addFavorite(programador_id, empleador_id, oferta_id);
                if (result) {
                    setIsFavorite(true);
                } else {
                    throw new Error("No se pudo agregar a favoritos.");
                }
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
            setIsModalOpen(true);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <>
            <div className="card-offer mt-3 p-3 d-flex mx-auto wrapper">
                <div className="card-offer-logo-container">
                    <img
                        className="card-offer-logo"
                        src="https://static.wixstatic.com/media/99e904_e49184c4e6fe4e14bb9ea13b5e9d009e~mv2.png/v1/fill/w_640,h_640,al_c,lg_1,q_90,enc_auto/99e904_e49184c4e6fe4e14bb9ea13b5e9d009e~mv2.png"
                        alt="Company Logo"
                    />
                </div>
                <div className="card-offer-content ms-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h2 className="card-offer-title mb-1">{offer.name}</h2>
                            <span className="card-offer-company" onClick={() => navigate(`/Companyview/${id}`)}>
                                {offer.nombre_empresa} - {offer.localidad}
                            </span>
                        </div>
                        <div className="ms-auto">
                            <div onClick={handleFavoriteClick} className="heart-icon">
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                            </div>
                        </div>
                    </div>
                    <ul className="card-offer-details list-unstyled mt-3">
                        <li className="detail-item"><MdWork /> Modalidad: {offer.modalidad}</li>
                        <li className="detail-item"><MdPaid /> Salario: {offer.salario}</li>
                        <li className="detail-item"><MdOutlineTrendingUp /> Experiencia: {offer.experiencia_minima}</li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-end mt-3">
                        <span className="text-muted small">Publicado: {formatDate(offer.fecha_publicacion)}</span>
                        <button onClick={handleViewDetails} className="btn btn-primary-detalles btn-sm">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && <ModalJobApply message={modalMessage} type={modalType} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};
