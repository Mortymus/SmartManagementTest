import { useState } from "react";
import { login } from '@taghub/api';

interface Props {
    onLogin: () => void;
}

function Login({ onLogin }: Props) {
    const [username, setUsername] = useState<string>('careers@tag-hub.com');
    const [password, setPassword] = useState<string>('oXDjVhS8UYqVix3E9AFi');
    const [userConsumerKey, setUserConsumerKey] = useState<string>('f880711b92da47c28549d6cdc280d654');
    const [loginClicked, setLoginClicked] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);
    const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [userConsumerKeyFocus, setUserConsumerKeyFocus] = useState<boolean>(false);

    async function handleLoginClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoginClicked(true);
        if (username && password && userConsumerKey) {
            try {
                await login(username, password, { consumerKey: userConsumerKey, init: true });                
                onLogin();
            }
            catch(error) {
                console.log("Failing");
                setLoginFailed(true);
                setUsername('');
                setPassword('');
                setUserConsumerKey('');
                console.log(error);
            }
        }
    }

    const placeholderFeedback = (userInput: string, value: string, focused: boolean) => {
        if (focused) {
            return '';
        }        
        if (loginFailed) {
            return `Please enter a valid ${userInput}`;
        }
        if (loginClicked && !value) {
            return `Please enter ${userInput}`;
        } else {
            return userInput.charAt(0).toUpperCase() + userInput.slice(1);
        }
    }
    
    return (        
        <div className="login-div">
            <h2 className="login-h2">Login to Taghub</h2>
            <form className="login-form">                
                <div className="login-input-div">
                    <input 
                        type="text"
                        placeholder={placeholderFeedback('username', username, usernameFocus)}
                        className="login-input"
                        value={username ?? ''}
                        onChange={e => setUsername(e.target.value)}
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => setUsernameFocus(false)}
                    />
                </div>

                <div className="login-input-div">
                    <input 
                        type="text"
                        placeholder={placeholderFeedback('password', password, passwordFocus)}
                        className="login-input"
                        value={password ?? ''}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                </div>

                <div className="login-input-div">
                    <input 
                        type="text"
                        placeholder={placeholderFeedback('Consumer key', userConsumerKey, userConsumerKeyFocus)}
                        className="login-input"
                        value={userConsumerKey ?? ''}
                        onChange={e => setUserConsumerKey(e.target.value)}
                        onFocus={() => setUserConsumerKeyFocus(true)}
                        onBlur={() => setUserConsumerKeyFocus(false)}                        
                    />
                </div>              
                <button 
                    className="login-button"
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </form>           
        </div>
    );
}

export default Login;