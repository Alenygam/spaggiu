import LoginButton from '../../parts/Buttons/LoginButton';

export default function LoginForm() {
    return (
        <form
        style={{
            backgroundColor: "#FFFFFF",
            width: 263,
            height: 263,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-70%, -50%)',
            zIndex: 996,
            borderRadius: 12,
            boxShadow: '0 0 18px #D98324',
            padding: 15,
            color: '#0A2239',
            display: 'flex',
            flexDirection: 'column'
        }}
        >
            <div style={{flexGrow: 1}}>
                <p style={{fontSize: 18}}>Inserisci le tue credenziali di Spaggiari per continuare</p><br/><br/>

                <label for="userCode">Codice Personale</label><br/>
                <input 
                style={{
                    fontSize: 12,
                    border: '1px solid #606060', 
                    padding: 3,
                    borderRadius: 5,
                }} 
                type="text"
                id="userCode"
                name="userCode"
                /><br/><br/>
                
                <label for="password">Password</label><br/>
                <input 
                style={{
                    fontSize: 12,
                    border: '1px solid #606060', 
                    padding: 3,
                    borderRadius: 5,
                }} 
                type="password"
                id="password"
                name="password"
                />
            </div>
            <div style={{textAlign: 'center', marginTop: 24}}>
                <LoginButton>Login</LoginButton>
            </div>
        </form>
    )
}