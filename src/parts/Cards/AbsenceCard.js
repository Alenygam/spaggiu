import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import {Check, X} from 'phosphor-react';

const AbsenceCardContainer = styled.div`
    background-color: #F78D99;
    color: #000;
    width: 250px;
    height: 50px;
    margin: 2.5px;
    border-radius: 10px;

    display: grid;
    grid-template-columns: 1fr 1fr;
`;

export default function AbsenceCard({absence}) {
    const date = moment(new Date(absence.evtDate));
    return (
        <AbsenceCardContainer>
            <div style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 'auto 0',
            }}>
                {date.format('DD MMMM yyyy')}
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}>
                <div style={{
                    margin: '5px 5px',
                }}>
                    {absence.isJustified ? <Check size={40}/> : <X size={40}/>}
                </div>
            </div>
        </AbsenceCardContainer>
    )
}
