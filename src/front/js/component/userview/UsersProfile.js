import React, { useState, useContext } from 'react';
import SkillRow from './CardHabilities';
import DefaultPhoto from "../../../img/img-perfil-default.jpg"

import { Context } from "../../store/appContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCoins, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';


const UsersProfile = () => {
    const { store, actions } = useContext(Context);
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


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        setFormData({ ...formData, photo: selectedImage })

        actions.editUser(formData, "Programador", token)


    }

    console.log(formData)
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-12" style={styles.flexContainer}>
                    <div className="card mb-4" style={styles.profileCard}>
                        {store.editar && (

                            <div class="alert alert-success text-center" role="alert">
                                {store.msg}
                            </div>

                        )}

                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='d-flex justify-content-center flex-column my-3'>
                                        <img
                                            src={!previewImage ? DefaultPhoto : previewImage}
                                            alt="Vista previa"
                                            className="rounded-circle  mx-auto"
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
                                        )}
                                    </div>
                                </div>

                                <div className='col-md-8'>
                                    <div className="d-flex align-items-center ">
                                        <i className="fa fa-user fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-50">
                                            <input type="text" name='name' value={formData.name} onChange={handleChange} className="form-control " id="floatingInput" disabled={!edit} placeholder="Nombre" />
                                            <label htmlFor="floatingInput">Nombre</label>


                                        </div>
                                        <div className="form-floating mb-3 w-50">
                                            <input type="text" name='username' value={formData.username} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Apellido" />
                                            <label htmlFor="floatingInput">Apellidos</label>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center" >
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }} />
                                        <div className="form-floating mb-3 w-50">
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
                                            <input type="text" name='country' value={formData?.country} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="País" />
                                            <label htmlFor="floatingInput">Pais</label>
                                        </div>


                                    </div >
                                    <div className="d-flex align-items-center">


                                        <i className="fa-solid fa-gears" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-75">
                                            <input type="text" name='tecnologias' value={formData?.tecnologias} onChange={handleChange} className="form-control w-100" id="floatingInput" disabled={!edit} placeholder="Tecnologías" />
                                            <label htmlFor="floatingInput">Tecnologias</label>
                                        </div>

                                    </div>

                                    <div className="d-flex align-items-center">

                                        <i className="fa-solid fa-comment" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <textarea class="form-control" name='descripcion' value={formData?.descripcion} onChange={handleChange} placeholder="Descripción" id="floatingTextarea2" disabled={!edit} style={{ height: "100px" }}></textarea>


                                    </div>

                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>


                                        <div className="form-floating mb-3 w-75">
                                            <input type="text" name='experiencia' value={formData?.experiencia} onChange={handleChange} className="form-control " id="floatingInput" disabled={!edit} placeholder="Experiencia" />
                                            <label htmlFor="floatingInput">Experiencia</label>
                                        </div>


                                    </div>

                                </div>

                            </div>




                            <div className='row'>
                                <button onClick={() => setEdit(!edit)} type="button" className="w-25 btn btn-primary mx-auto">{edit ? "Guardar" : "Editar"}</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        width: 'calc(100% - 10px)',
        height: '780px',
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
