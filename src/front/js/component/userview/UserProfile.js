import React, { useState } from 'react';
import EditCompanyDescription from '../companyview/EditCompanyDescription';
import { EditCompanyMail } from '../companyview/EditCompanyMail';
import { EditCompanyPhone } from '../companyview/EditCompanyPhone';
import ProfileImage from '../ProfileImage';
import { EditCompanyName } from '../companyview/EditCompanyName';


const UserProfile = () => {


    return (
        <div>
            <div className="row">
                <div className="col-m-2">
                    <EditCompanyDescription />
                    <EditCompanyName />
                    <EditCompanyMail />
                    <EditCompanyPhone />
                    <ProfileImage />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
