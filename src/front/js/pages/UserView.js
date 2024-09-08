import React from 'react';
import UsersProfile from '../component/userview/UsersProfile';
import UserDescription from '../component/userview/UserDescripcion';
import { EditDescriptionUserAccordion } from '../component/userview/DescriptionUserAccordion';
import UserExperience from '../component/userview/UserExperience';
import UserProjects from '../component/userview/UserProjects';
import UserFavs from '../component/userview/UserFavs';
import { EditFavoritesUserAccordion } from '../component/userview/FavsUserAccordion';
import { EditExperienceUserAccordion } from '../component/userview/experinceUserAccordion';
import EditProjectsAccordion from '../component/userview/projecstUserAccordion';
import '../../styles/userview.css';

export const Userview = () => {
    return (

        <div className="container contenedor">
            <div className='body'>
                <UsersProfile />


                <UserDescription title="Descripción">
                    <EditDescriptionUserAccordion />
                </UserDescription>

                <UserExperience title="Experiencia">
                    <EditExperienceUserAccordion />
                </UserExperience>

                <UserFavs title="Favs">
                    <EditFavoritesUserAccordion />
                </UserFavs>


                <UserProjects title="Proyectos">
                    <EditProjectsAccordion />
                </UserProjects>




            </div>
        </div>

    )
};


