import { useAuth } from "../../context/AuthProvider/useAuth";
import {useNavigate} from "react-router-dom"
import "./login.css"
import { useEffect, useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [loading, setloading] = useState<boolean>(false);

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const myAlert = document.querySelector("#alert") as HTMLElement;
        if (showAlert) {
            return myAlert.classList.add("fade");
        }

        return myAlert.classList.remove("fade");
    }, [showAlert])


    function timeout(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function singIn(email: string, password: string) {
        setloading(true)
        try {
            await auth.authenticate(email, password)
            navigate("/profile")
        } catch (err) {
            setShowAlert(true);
            console.error("Invalid email or password :(")
            setloading(false)
            await timeout(5000);
            setShowAlert(false)
            
        } finally {
            setloading(false)
        }
    }


    return (
        <section className="field-main-login d-flex justify-content-center align-items-center" style={{ width: '100vw', height: '100vh' }}>
            <div className="w-50 h-100 field-bg-login">

            </div>
            <div className="p-5 field-form-login">
                <form className="w-75 mx-auto">
                    <h4 className="mb-4">Access</h4>
                    <input className="border-0 border-bottom w-100 mb-3 p-2 outline-0" type='text' placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value) } />
                    <input className="border-0 border-bottom w-100 mb-3 p-2 outline-0" type='password' placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value) }/>
                    
                    <div className="small w-100 text-start mb-3">
                        <a href="#" className="link-secondary text-decoration-none link-custom ">Forgot password?</a>
                    </div>
                    <div className="w-100 text-center mb-3">
                        <button className="btn w-100 btn-custom" type="button" onClick={() => singIn(email, password)} disabled={loading}>
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label">
                                {
                                    loading ?
                                        <div className="spinner-border text-light spinner-border-sm" role="status"></div> :
                                        <span>Sing In</span>
                                }
                                
                            </span>
                        </button>
                    </div>
                    <div className="small w-100 text-center">
                        <p>Don't have an account? <a href="#" className="link-secondary text-decoration-none link-custom ">Register</a></p>
                    </div>

                    <div id="alert" className="alert alert-danger text-center fade" role="alert">
                        Invalid email or password :(
                    </div>
                </form>

                
            </div>
        </section>
    )
}