import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, updateProfile , signOut} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    let [state, setState] = useState({
        email: "", password: "",
    });
    let navigate = useNavigate();
   
    const getInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state, [name]: value,
        })
    }

    const submitData = async (e) => {
        e.preventDefault();
        console.log(state);
        await signInWithEmailAndPassword(auth, state.email, state.password)
            .then((res) => {
                let user = res.user;
                updateProfile(user, {
                    displayName: state.displayName,
                })
                navigate("/dashboard");
                toast("login successfully..")
                setState({
                    email: "", password: "",
                })
            }).catch((err) => {
                toast.warning("user not found.")
            })
    }

    const signout = () => {
        signOut(auth).then((res)=>{
            navigate("/signup");
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    //css
    const button = {
        "backgroundColor": "#9300ff",
        "color": "white",
    }

    const input = {
        "border": "none",
        "backgroundColor": "white",
    }

    return (
        <>
            <div className="container py-5">
                <h2 style={{ "textAlign": "center" }} className="fw-bolder">Login</h2>
                <div className="py-5 d-flex justify-content-center align-items-center">
                    <form className="w-50" method="post" onSubmit={(e) => submitData(e)}>
                        <div>
                            <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="email" name="email" value={state.email} style={input} onChange={(e) => getInput(e)} className="form-control p-3 shadow" placeholder="Your Email" />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-envelope"></i></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="password" name="password" value={state.password} style={input} onChange={(e) => getInput(e)} className="form-control p-3 shadow" placeholder="Your Password" />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-key"></i></div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <button className="btn w-50 py-3 shadow fw-semibold" style={button}>Login<i className="fa-solid fa-arrow-right-to-bracket mx-2"></i></button>
                                <p className="fw-bold mx-2">or</p>
                                <button className="btn w-50 py-3 shadow fw-semibold" style={button} onClick={signout}>Sign Out<i className="fa-solid fa-arrow-right-from-bracket mx-2"></i></button>
               
                                                           </div>
                        </div>
                    </form>
                </div>
                <div className="">
                </div>
            </div>
            <ToastContainer />
        </>
    )
}