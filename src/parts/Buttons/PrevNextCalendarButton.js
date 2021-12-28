import styled from 'styled-components';

const PrevNextCalendarButton = styled.button`
    font-size: 18px;
    background-color: transparent;
    border: none;
    margin: 2px;
    height: 48px;
    
    cursor: pointer;
    border-bottom: 2px solid #fff;
    color: #fff;
    transition: .5s;
    flex: 1;

    :hover {
        background-color: #1E1F2F;
    }
`

export default PrevNextCalendarButton;