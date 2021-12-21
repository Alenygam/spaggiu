import styled from 'styled-components';

const PrevNextCalendarButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    border: none;
    margin: 2px;
    height: 48px;
    
    cursor: pointer;
    border-bottom: 2px solid ${(props) => props.isSelected ? '#B84A62' : '#fff'};
    color: #fff;
    transition: .5s;
    flex: 1;

    :hover {
        background-color: #07192A;
    }
`

export default PrevNextCalendarButton;