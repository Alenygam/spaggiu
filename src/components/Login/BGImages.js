import React from 'react';
import computerSvg from '../../assets/undraw_secure_login_pdn4.svg';
import studyingSvg from '../../assets/undraw_studying_re_deca.svg';

export default function BGImages() {
    return (
        <>
            <img 
            src={computerSvg} 
            alt=""
            width="300"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-25%, -50%)',
                zIndex: 995
            }}
            />
            <img 
            src={studyingSvg} 
            alt=""
            height="350"
            width="350"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-100%, 10%)',
                zIndex: 995
            }}
            />
        </>
    )
}
