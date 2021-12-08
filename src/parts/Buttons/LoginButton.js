import React from 'react';
import styled from 'styled-components';

function Button({onClick, children}) {
  const ButtonStyle = styled.button`
    margin: .5em;
    padding: .5em 1.25em;
    font-size: 1.5em;
    border-radius: .5em;
    background-color: #B84A62;
    color: #FFFFFF;
    transition: .5s;

    :hover {
      color: #0A2239;
      background-color: #F6E9EB;
    }
  `

  return (
    <ButtonStyle onClick={onClick}>
      {children}
    </ButtonStyle>
  )
}

export default Button
