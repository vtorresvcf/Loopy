import React, { useContext, useState } from 'react';
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import CheckoutForm from "../../component/Checkout";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import DefaultPhoto from "../../../img/img-perfil-default.jpg"


const CompanyProfile = () => {
    const stripePromise = loadStripe("pk_test_51PsqIxG3cEcyZuNpill2BXWYLnqGWok6W48xAOpaOlq5BHME5440qc4FGMIzdoADAgiR77Q3VBP3tmrzLuVWmbOy00tZCSphPW");
    const { store, actions } = useContext(Context);
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        name: store.user?.name,
        username: store.user?.username,
        photo: store.user?.photo,
        phone: store.user?.phone,
        email: store.user?.email,
        country: store.user?.country,
        cif: store.user?.profile_empleador.cif,
        metodo_pago: store.user?.profile_empleador.metodo_pago,
        descripcion: store.user?.profile_empleador.descripcion

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
        actions.editUser(formData, "Empleador", token)
        setEdit(false)
    }
    return (
        <div style={styles.pageContainer}>
            <div className="row" style={styles.row}>
                <div className="col-lg-12" style={styles.flexContainer}>
                    <div className="card mb-4" style={styles.profileCard}>
                        {store.editar && (

                            <div className="alert alert-success text-center" role="alert">
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
                                        <div className="w-100 text-center mt-4">
                                            <h5>Suscripción actual</h5>
                                            {!store.user?.profile_empleador.premium ? <button type="button" disabled className="w-100 p-1 btn btn-outline-dark">Free</button> : <button type="button" disabled className="w-100 p-1 mx-2 btn btn-outline-success">Premium</button>}

                                            {!store.user?.profile_empleador.premium && (
                                                <button type="submit" className="mt-4 btn btn-primary mx-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Pasar la Suscripción a Premium
                                                </button>

                                            )}


                                            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Coste anual de la suscripción: 200€</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <div >
                                                                <Elements stripe={stripePromise}>
                                                                    {/* Load the checkout form */}
                                                                    <CheckoutForm />
                                                                </Elements>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                    </div>
                                </div>

                                <div className='col-md-8'>
                                    <div className="d-flex align-items-center">
                                        <i className="fa fa-user fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-50 ">
                                            <input type="text" name='name' value={formData.name} onChange={handleChange} className=" form-control " id="floatingInput" disabled={!edit} placeholder="Nombre" />
                                            <label htmlFor="floatingInput">Nombre</label>


                                        </div>
                                        <div className="form-floating mb-3 w-50 ">
                                            <input type="text" name='username' value={formData.username} onChange={handleChange} className=" mx-2 form-control" id="floatingInput" disabled={!edit} placeholder="Apellido" />
                                            <label className='mx-2' htmlFor="floatingInput">Apellidos</label>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center " >
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }} />
                                        <div className="form-floating mb-3 w-100 ">
                                            <input type="email" name='email' value={formData.email} onChange={handleChange} className="form-control " id="floatingInput" disabled={!edit} placeholder="Email" />
                                            <label htmlFor="floatingInput">Email</label>
                                        </div>

                                    </div>



                                    <div className="d-flex align-items-center ">

                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                                        />
                                        <div className="form-floating mb-3 w-100 ">
                                            <input type="tel" name='phone' value={formData?.phone} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Teléfono" />
                                            <label htmlFor="floatingInput">Teléfono</label>
                                        </div>



                                    </div>
                                    <div className="d-flex align-items-center ">
                                        <i className="fa-solid fa-flag" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-100">
                                            <input type="text" name='country' value={formData?.country} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="País" />
                                            <label htmlFor="floatingInput">Pais</label>
                                        </div>


                                    </div >
                                    <div className="d-flex align-items-center ">
                                        <i className="fa-solid fa-building" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-100">
                                            <input type="text" name='cif' value={formData?.cif} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="CIF" />
                                            <label htmlFor="floatingInput">CIF</label>
                                        </div>


                                    </div >
                                    <div className="d-flex align-items-center ">
                                        <i className="fa-solid fa-cash-register" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <div className="form-floating mb-3 w-100">
                                            <input type="text" name='metodo_pago' value={formData?.metodo_pago} onChange={handleChange} className="form-control" id="floatingInput" disabled={!edit} placeholder="Metodo de pago" />
                                            <label htmlFor="floatingInput">Metodo de pago</label>
                                        </div>


                                    </div >
                                    <div className="d-flex align-items-center">

                                        <i className="fa-solid fa-comment" style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}></i>

                                        <textarea className="form-control" name='descripcion' value={formData?.descripcion} onChange={handleChange} placeholder="Descripción" id="floatingTextarea2" disabled={!edit} style={{ height: "100px" }}></textarea>


                                    </div>


                                    <div className='row mx-auto ms-4'>
                                        <div className='col-md-6'>
                                            <button onClick={() => setEdit(!edit)} type="button" className=" w-100 btn btn-primary">Editar</button>
                                        </div>
                                        <div className='col-md-6'>
                                            <button type="submit" className="w-100 btn btn-success ">Guardar</button>
                                        </div>

                                    </div>


                                </div>

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
        height: 'auto',
        margin: '3rem auto 0 auto',
        padding: '0',
        boxSizing: 'border-box',
    },
    row: {
        height: '100%',
        margin: '0',
        padding: '0',
        display: 'flex',
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    profileColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '0',
        padding: '0',
    },
    profileImageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonEditContainer: {
        marginLeft: '30px',
    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
    },
    topLeftAligned: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '10px',
        marginBottom: '10px',
    },
    companyDescriptionContainer: {
        marginBottom: '10px',
        marginLeft: '30px',

    },
    contactContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '10px',
    },
    rightColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: '0',
    },
    rightAlignedContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    starsContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    countrySelectorContainer: {
        marginBottom: '20px',
        marginRight: '30px',
    },
    profileCard: {
        backgroundColor: '#bed5e2',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
    progressCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '10px',
        padding: '20px',
        border: 'none',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        height: '100%',
    },
};

export default CompanyProfile;
