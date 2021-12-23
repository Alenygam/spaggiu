import React from 'react';
import styled from 'styled-components';

import MaterialIcon from 'material-icons-react';

const AbsenceCardContainer = styled.div`
    background-color: #B84A62;
    height: 50px;
    margin: 2.5px;
    border-radius: 10px;
    color: #fff;

    display: grid;
    grid-template-columns: 1fr 2fr .5fr;
`;

export default function AbsenceCardForPage({absence}) {
    return (
        <AbsenceCardContainer>
            <div style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 'auto 0',
            }}>
                {absence.evtDate}
            </div>
            <div style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 'auto 0',
            }}>
                {absence.justifReasonDesc && absence.justifReasonDesc}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <div style={{
                    margin: '5px 5px',
                }}>
                    <MaterialIcon icon={absence.isJustified ? "done" : "clear"} color="#ffffff" size={40}/>
                </div>
            </div>
        </AbsenceCardContainer>
    )
}
