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
                    <h3 className="loginLogo">Akademisyen Makale Graph</h3>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                            {error === true ? (
                                <div className="error-message">Login Failure</div>
                            ) : (
                                "Admin Girişi"
                            )}
                        <input placeholder="Kullanıcı Adı" className="loginInput" type="Username" required ref={Username} />
                        <input placeholder="Şifre" className="loginInput" type="Password" required ref={Password} />
                        <button className="loginButton" type="submit" >
                            Giriş Yap
                        </button>
                        
                        <span className="loginForgot">Şifreni mi unuttun?</span>
                    </form>
                    <button className="loginButton" >
                            <a href="/displayGraph"></a>
                            Graph Görüntüle
                    </button>
                </div>
            </div>
        </div>
    );
}