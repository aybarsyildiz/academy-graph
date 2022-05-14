import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";   

export default function Login() {
    const Username = useRef();
    const Password = useRef();
    const { isFetching, dispatch, error } = useContext(AuthContext);


    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
            { Username: Username.current.value, Password: Password.current.value },
            dispatch
          );
    };

    return(
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Taxi Location</h3>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                            {error === true ? (
                                <div className="error-message">Login Failure</div>
                            ) : (
                                "Log In"
                            )}
                        <input placeholder="Username" className="loginInput" type="Username" required ref={Username} />
                        <input placeholder="Password" className="loginInput" type="Password" required ref={Password} />
                        <button className="loginButton" type="submit" >
                            Login
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                    </form>
                </div>
            </div>
        </div>
    );
}