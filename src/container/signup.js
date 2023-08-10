import { React, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {

    let [state,setState] = useState({
        username : "" , email : "" , password : "",
    })

    const getInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state , [name] : value,
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        console.log(state);
        createUserWithEmailAndPassword(auth , state.email , state.password)
        .then((res)=>{
            let user = res.user;
            updateProfile(user,{
                displayName : state.username,
            })
            toast.success("register successfully..")
            setState({
                username : "" , email : "" , password : "",
            })
        }).catch((err)=>{
            toast.warning(err.message);
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
                <h2 style={{ "textAlign": "center" }} className="fw-bolder">Sign Up</h2>
                <div className="py-5 d-flex justify-content-center align-items-center">
                    <form className="w-50" method="post" onSubmit={(e)=>submitData(e)}>
                        <div>
                        <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="text" style={input} name="username" onChange={(e)=>getInput(e)} value={state.username} className="form-control p-3 shadow" placeholder="Your Username" />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-user"></i></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="email" style={input} name="email" onChange={(e)=>getInput(e)} value={state.email} className="form-control p-3 shadow" placeholder="Your Email" />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-envelope"></i></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="password" style={input} name="password" onChange={(e)=>getInput(e)} value={state.password} className="form-control p-3 shadow" id="inlineFormInputGroupUsername" placeholder="Your Password" />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-key"></i></div>
                                </div>
                            </div>
                            <div>
                                <button className="btn w-100 p-3 shadow fw-semibold" style={button}>Sign Up<i className="fa-solid fa-user mx-2"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}