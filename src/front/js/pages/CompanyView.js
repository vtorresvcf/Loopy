import React from 'react';
import CompanyProfile from '../component/companyview/CompanyProfile';
import AccordionSection from '../component/companyview/AccordionSection';
import OfferManager from '../component/companyview/OfferManager';

export const Companyview = () => {
    return (

        <div className="container">
            <div className='body'>
                <CompanyProfile />


                <AccordionSection title="Ofertas">
                    <div className="d-flex flex-wrap">
                        <OfferManager />

                    </div>
                </AccordionSection>
            </div>
        </div>

    );
};


