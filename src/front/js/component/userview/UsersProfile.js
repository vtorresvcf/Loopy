import React, { useState, useContext } from 'react';
import SkillRow from './CardHabilities';
import DefaultPhoto from "../../../img/img-perfil-default.jpg"

import { Context } from "../../store/appContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCoins, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';


const UsersProfile = () => {
    const { store } = useContext(Context);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        name: store.user?.name,
        username: store.user?.username,
        photo: store.user?.photo,
        phone: store.user?.phone,
        email: store.user?.email,
        country: store.user?.country,
        precio_hora: store.user?.profile_programador.precio_hora,
        tecnologias: store.user?.profile_programador.tecnologias,
        experiencia: store.user?.profile_programador.experiencia,
        descripcion: store.user?.profile_programador.descripcion,

    })

    const [selectedImage, setSelectedImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Guarda el archivo de imagen real para enviarlo después
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Establece la imagen como base64 para mostrarla en la vista previa
            };
            reader.readAsDataURL(file); // Lee la imagen como URL
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({
            photo: selectedImage
        })

    }

    console.log(formData)
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-12" style={styles.flexContainer}>
                    <div className="card mb-4" style={styles.profileCard}>

                        <form className='row' onSubmit={handleSubmit}>

                            <div className='col-md-3 '>




                                <img
                                    src={!previewImage ? DefaultPhoto : previewImage}
                                    alt="Vista previa"
                                    className="rounded-circle"
                                    width='200'
                                    height='200'
                                />
                                {edit && (
                                    <div className="mb-3">
                                        <label htmlFor="imageUpload" className="form-label">Subir Imagen</label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="imageUpload"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                )

                                }



                            </div>






                            <div className='col'>


                                <div className="d-flex align-items-center">
                                    <i className="fa fa-user fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                    <div className="form-floating mb-3">
                                        <input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control " id="floatingInput" disabled={!edit} placeholder="Nombre" />
                                        <label htmlFor="floatingInput">Nombre</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" name='username' value={formData.username} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Apellido" />
                                        <label htmlFor="floatingInput">Apellidos</label>
                                    </div>


                                </div>
                                <div className="d-flex align-items-center" >
                                    <FontAwesomeIcon icon={faEnvelope} style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }} />
                                    <div className="form-floating mb-3 w-75">
                                        <input type="email" name='email' value={formData.email} onChange={handleChange} className="form-control " id="floatingInput" disabled={!edit} placeholder="Email" />
                                        <label htmlFor="floatingInput">Email</label>
                                    </div>

                                </div>

                                <div className="d-flex align-items-center" >


                                    <FontAwesomeIcon icon={faCoins} style={{ width: '25px', height: '25px', color: "#6793AE", marginRight: '10px' }} />
                                    <div className="form-floating mb-3">
                                        <input type="number" name='precio_hora' value={formData?.precio_hora} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Precio hora" />
                                        <label htmlFor="floatingInput">Precio/Hora</label>
                                    </div>

                                </div>


                                <div className="d-flex align-items-center">

                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                                    />
                                    <div className="form-floating mb-3">
                                        <input type="tel" name='phone' value={formData?.phone} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Teléfono" />
                                        <label htmlFor="floatingInput">Teléfono</label>
                                    </div>



                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                    <div className="form-floating mb-3">
                                        <input type="text" name='phone' value={formData?.phone} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="País" />
                                        <label htmlFor="floatingInput">Pais</label>
                                    </div>


                                </div >
                                <div className='row'>
                                    <button onClick={() => setEdit(!edit)} type="button" className="btn btn-primary w-25 mx-2">Editar</button>
                                    <button type="submit" className="btn btn-primary w-25">Guardar</button>
                                </div>


                            </div>
                        </form>


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
