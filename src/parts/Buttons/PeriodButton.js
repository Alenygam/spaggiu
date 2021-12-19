import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    font-size: 18px;
    background-color: transparent;
    border: none;
    height: 48px;
    margin: 2px;
    
    cursor: pointer;
    border-bottom: 2px solid ${(props) => props.isSelected ? '#B84A62' : '#fff'};
    color: #fff;
    transition: .5s;
    flex: 1;

    :hover {
        background-color: #07192A;
    }
`

export default function PeriodButton({setPeriod, period, index, selected}) {
    return (
        <Button onClick={() => setPeriod(period)} isSelected={selected}>{index + 1}° Periodo</Button>
    )
}
