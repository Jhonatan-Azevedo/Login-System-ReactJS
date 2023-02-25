import { useAuth } from "../../context/AuthProvider/useAuth";
import {useNavigate} from "react-router-dom"
import "./login.css"
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const auth = useAuth();
    const navigate = useNavigate();

    async function singIn(values: {email: string, password: string}) {
        try {
            await auth.authenticate(values.email, values.password)
            navigate("/profile")
        } catch (err) {
            console.error("Invalid email or password :(")
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
                        <button className="btn w-100 btn-custom" type="button" onClick={() => singIn({ email, password })}>
                            <span className="transition"></span>
                            <span className="gradient"></span>
                            <span className="label"> Sing In</span>
                        </button>
                    </div>
                    <div className="small w-100 text-center">
                        <p>Don't have an account? <a href="#" className="link-secondary text-decoration-none link-custom ">Register</a></p>
                    </div>
                </form>
            </div>
        </section>
    )
}