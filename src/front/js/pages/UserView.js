import React from 'react';
import UsersProfile from '../component/userview/UsersProfile';
import UserProjects from '../component/userview/UserProjects';
import UserFavs from '../component/userview/UserFavs';
import { EditFavoritesUserAccordion } from '../component/userview/FavsUserAccordion';
import EditProjectsAccordion from '../component/userview/projecstUserAccordion';
export const Userview = () => {
    return (

        <div className="container ">
            <div className='body wrapper'>
                <UsersProfile />

                <UserFavs title="Favoritos">
                    <EditFavoritesUserAccordion />
                </UserFavs>


                <UserProjects title="Proyectos">
                    <EditProjectsAccordion />
                </UserProjects>




            </div>
        </div>

    )
};


