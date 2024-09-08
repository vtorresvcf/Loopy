import React, { useEffect, useState, useContext } from 'react';
import ProfileImage from '../ProfileImage';
import { UserNameEdit } from './EditUserName';
import { EditUserPhone } from './EditUserPhone';
import { EditUserMail } from './EditUserMail';
import SkillRow from './CardHabilities';
import { EditUserPrice } from './EditUserPriceH';
import { EditUserCountry } from './EditUserCountry';
import { Context } from "../../store/appContext"

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
                            <div className="col-md-2" >
                                <ProfileImage />
                            </div>

                            <div className="col-md-7" >
                                <div className='row'>
                                    <UserNameEdit formdata={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
                                    <EditUserMail formdata={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
                                    <EditUserPrice formdata={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
                                    <EditUserPhone formdata={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
                                    <EditUserCountry formdata={formData} setFormData={setFormData} handleChange={handleChange} handleSubmit={handleSubmit} />
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
