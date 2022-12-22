import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 3px 0;
    font-size: 18px;
    background-color: transparent;
    border: none;
    margin: 2px;
    min-width: 120px;
    
    cursor: pointer;
    border-bottom: 2px solid ${(props) => props.isSelected ? '#F78D99' : '#fff'};
    color: #fff;
    transition: .5s;
    flex: 1;

    :hover {
        background-color: #232436;
    }
`

export default function PeriodButton({setPeriod, period, index, selected}) {
    return (
        <Button onClick={() => setPeriod(period)} isSelected={selected}>{index + 1}° Periodo</Button>
    )
}
