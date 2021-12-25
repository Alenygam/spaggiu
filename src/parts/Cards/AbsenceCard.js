import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/it'

import {Check, X} from 'phosphor-react';

const AbsenceCardContainer = styled.div`
    background-color: #F78D99;
    color: #000;
    width: 280px;
    height: 50px;
    margin: 2.5px;
    border-radius: 10px;

    display: flex;
    padding: 2px;
`;

export default function AbsenceCard({absence}) {
    moment.locale('it');
    const date = moment(new Date(absence.evtDate));
    return (
        <AbsenceCardContainer>
            <div style={{
                fontSize: 18,
                textAlign: 'center',
                margin: 'auto 0',
                flexGrow: 1
            }}>
                {date.format('DD MMMM yyyy')}
            </div>
            <div style={{
                margin: '5px 5px',
            }}>
                {absence.isJustified ? <Check size={40}/> : <X size={40}/>}
            </div>
        </AbsenceCardContainer>
    )
}
