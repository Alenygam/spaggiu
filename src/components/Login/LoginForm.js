import React from 'react';
import styled from 'styled-components';
import LoginButton from '../../parts/Buttons/LoginButton';
import lockedAgenda from '../../assets/Locked_agenda.svg';
import Spinner from 'react-spinkit';

const Form = styled.form`
    display: grid;
    grid-template-columns: 265px 240px;
    grid-gap: 50px;
    grid-auto-flow: row dense;
    position: relative;
    margin-top: 40px;

    @media only screen and (max-width: 600px) {
        grid-template-columns: 265px;
        grid-template-rows: 1fr 1fr;
        grid-auto-flow: column;
    }
`

const FormFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => props.isLoading ? 'filter: blur(20px);': ''}
    transition: .5s;
`

const Input = styled.input`
    font-size: 16px;
    border: 1px solid #14151F;
    background-color: #1E1F2F;
    height: 31px;
    line-height: 1.4;
    color: #FFF;
    padding: 3px;
    width: 100%;
`

const Title = styled.p`
    width: 100%;
    text-align: center;
    font-size: 72px;
    font-family: 'Smooch';
`

const ImageContainer = styled.div`
    ${(props) => props.isLoading ? 'filter: blur(20px);': ''}
    transition: .5s;
    @media only screen and (max-width: 600px) {
        display: none;
    }
`

function LoadingSpinner() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(2)',
        }}>
            <Spinner name="wandering-cubes" color="#F6A979"/>
        </div>
    )
}

export default function LoginForm({submitForm, loading}) {
    const uid = React.useRef();
    const passwd = React.useRef();

    return (
        <Form
        onSubmit={(event) => submitForm(event, uid.current.value, passwd.current.value)}
        >
            {loading && <LoadingSpinner/>}
            <FormFieldsContainer isLoading={loading}>
                <div>
                    <Title>Login</Title>
                    <p style={{textAlign: 'center'}}>Inserisci le tue credenziali di Spaggiari per continuare</p>
                </div>
                <div style={{marginTop: 21}}>
                    {/* For accessibility */}
                    <label htmlFor="userCode" style={{display: 'none'}}>Codice Personale</label>
                    <Input
                        ref={uid}
                        type="text"
                        id="userCode"
                        name="userCode"
                        placeholder="Codice Personale"
                    />
                    
                    <label htmlFor="password" style={{display: 'none'}}>Password</label>
                    <Input
                        ref={passwd}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                    />
                    <LoginButton>Log in</LoginButton>
                </div>
            </FormFieldsContainer>
            <ImageContainer isLoading={loading}>
                <img width={240} height={300} src={lockedAgenda} alt=""/>
            </ImageContainer>
        </Form>
    )
}