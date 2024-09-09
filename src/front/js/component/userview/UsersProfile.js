import React, { useEffect, useState, useContext } from 'react';
import ProfileImage from '../ProfileImage';
import SkillRow from './CardHabilities';

import { Context } from "../../store/appContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCoins, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const UsersProfile = () => {
    const { store } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        photo: "",
        email: "",
        country: "",
        precio_hora: "",
        tecnologias: "",
        experiencia: "",
        descripcion: "",

    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.namme]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

    }

    useEffect(() => {
        setFormData({
            name: `${store.user?.name}`,
            username: `${store.user?.username}`,
            photo: `${store.user?.photo}`,
            phone: `${store.user?.phone}`,
            email: `${store.user?.email}`,
            country: `${store.user?.country}`,
            precio_hora: `${store.user?.profile_programador.precio_hora}`,
            tecnologias: `${store.user?.profile_programador.tecnologias}`,
            experiencia: `${store.user?.profile_programador.experiencia}`,
            descripcion: `${store.user?.profile_programador.descripcion}`,
        })

    }, [])
    console.log(formData)
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-12" style={styles.flexContainer}>
                    <div className="card mb-4" style={styles.profileCard}>
                        <div className="row d-flex justify-content-between  align-items-center">
                            <div className="col-md-3" >
                                <ProfileImage />
                            </div>

                            <div className="col-md-9 " >
                                <div className='row mx-4'>
                                    <div className="d-flex align-items-center">
                                        <h1 className="mb-0 text-white">{store.user?.username}</h1>

                                        <div class="form-floating mb-3">
                                            <input type="text" name='name' value={formData.name} class="form-control" id="floatingInput" placeholder="Nombre" />
                                            <label for="floatingInput">Nombre</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input type="text" name='username' value={formData.username} class="form-control" id="floatingInput" placeholder="Apellido" />
                                            <label for="floatingInput">Apellidos</label>
                                        </div>


                                    </div>
                                    <div className="d-flex align-items-center" >
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }} />
                                        <div class="form-floating mb-3">
                                            <input type="email" name='email' value={formData.email} class="form-control" id="floatingInput" placeholder="Email" />
                                            <label for="floatingInput">Email</label>
                                        </div>

                                    </div>

                                    <div className="d-flex align-items-center" >


                                        <FontAwesomeIcon icon={faCoins} style={{ width: '25px', height: '25px', color: "#6793AE", marginRight: '10px' }} />
                                        <div class="form-floating mb-3">
                                            <input type="number" name='precio_hora' value={formData.precio_hora} class="form-control" id="floatingInput" placeholder="Precio hora" />
                                            <label for="floatingInput">OPrecio/Hora</label>
                                        </div>

                                    </div>


                                    <div className="d-flex align-items-center">

                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                                        />
                                        <div class="form-floating mb-3">
                                            <input type="tel" name='phone' value={formData.phone} class="form-control" id="floatingInput" placeholder="Teléfono" />
                                            <label for="floatingInput">Teléfono</label>
                                        </div>



                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div class="form-floating mb-3">
                                            <input type="text" name='phone' value={formData.phone} class="form-control" id="floatingInput" placeholder="País" />
                                            <label for="floatingInput">Pais</label>
                                        </div>


                                    </div >
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card" style={styles.skillCard}>
                        <SkillRow />
                    </div>
                </div>


            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '700px',
        margin: '5px',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '700px',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '700px',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
        marginLeft: '10px',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    priceContainer: {
        marginTop: '20px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
    },
    rightAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
    },
    userNameContainer: {
        marginBottom: '20px',
    },
    carrerSelectorContainer: {
        marginBottom: '20px',
    },
    starsContainer: {
        marginBottom: '20px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    skillCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        flex: 1,
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: '20px',
    },
};

export default UsersProfile;
