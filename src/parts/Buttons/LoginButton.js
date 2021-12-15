import React from 'react';
import styled from 'styled-components';
  
const ButtonStyle = styled.button`
  width: 113px;
  height: 30px;
  border-radius: .5em;
  background-color: #B84A62;
  color: #FFFFFF;
  transition: .5s;
  font-family: 'Smooch', sans-serif;

  :hover {
    color: #0A2239;
    background-color: #F6E9EB;
  }
`

function Button({onClick, children}) {
  return (
    <ButtonStyle onClick={onClick}>
      {children}
    </ButtonStyle>
  )
}

export default Button
