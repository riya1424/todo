import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { collection, getDocs , deleteDoc ,doc} from "firebase/firestore";
import { signInWithEmailAndPassword, updateProfile , signOut} from "firebase/auth";


export const ViewTask = () => {

    let useCollectionRef = collection(db, 'task');
    let [state, setState] = useState([]);
    let [user, setUser] = useState("");
    let navigate = useNavigate();
    //all login info in "user"
    //all tasks info in "state"
    useEffect(() => {

        const getTask = async () => {
            auth.onAuthStateChanged((user)=>{
                if(user){
                    setUser(user.displayName);
                }
                else{
                    navigate("/login");
                }
            })
            let getAll = await getDocs(useCollectionRef);
            // console.log(getAll.data);
            let record = [];
            getAll.docs.map((d) => {
                // console.log(d.id);
                // console.log(d.data());
                record.push({
                    id: d.id,
                    ...d.data(),
                })
            })
            setState(record);
        }
        getTask();
    }, [setState]);

    // const showCurrentUserTask = () => {
    //     const c_user = auth.currentUser;
    //     // console.log(c_user);
    //     const merge = Object.assign(state , c_user);
    //     console.log(merge); 
    //     // alert(merge.displayName);
    // }
    // showCurrentUserTask();  

    const viewAllRecord = async () => {
        let getAll = await getDocs(useCollectionRef);
            // console.log(getAll.data);
            let record = [];
            getAll.docs.map((d) => {
                // console.log(d.id);
                // console.log(d.data());
                record.push({
                    id: d.id,
                    ...d.data(),
                })
            })
            setState(record);
    }

    const deleteData = async (id_data) => {
        let userData = doc(db, "task", id_data);
        let remove = await deleteDoc(userData);
        viewAllRecord();
        // console.log("hi");
    }

    const signout = () => {
        signOut(auth).then((res)=>{
            navigate("/signup");
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    // css style 

    const home = {
        "backgroundColor": "white",
        "border": "3px solid #d62828",
        "borderRadius": "20px",
        "width": "250px",
    }

    const office = {
        "backgroundColor": "white",
        "border": "3px solid #003049",
        "borderRadius": "20px",
        "width": "250px",
    }

    const personal = {
        "backgroundColor": "white",
        "border": "3px solid #219ebc",
        "borderRadius": "20px",
        "width": "250px",
    }

    const other = {
        "backgroundColor": "white",
        "border": "3px solid #fbb703",
        "borderRadius": "20px",
        "width": "250px",
    }

    const h_icons = {
        "backgroundColor": "#d62828",
        "color": "white",
        "borderRadius": "10px"
    }

    const of_icons = {
        "backgroundColor": "#003049",
        "color": "white",
        "borderRadius": "10px"
    }

    const p_icons = {
        "backgroundColor": "#219ebc",
        "color": "white",
        "borderRadius": "10px"
    }

    const ot_icons = {
        "backgroundColor": "#fbb703",
        "color": "white",
        "borderRadius": "10px"
    }
    const button = {
        "backgroundColor": "#9300ff",
        "color": "white",
    }
    return (
        
        <>

            <div className="container py-5">
          <h2 style={{ "textAlign": "center" }} className="fw-bolder">View All Task</h2>
                <h5 style={{"textAlign" : "center"}} className="py-5 fw-semibold">Hello <b className="text-dark text-decoration-underline">{user}</b> !! Welcome To Your To-Do Tasks..!</h5>
                <div className="row justify-content-center align-items-center">
                    {state && state.filter((value , index) => {
                        
                        if(value.userName == user){
                            return value;
                        }
                    }).map((value, index) => {
                        // {value.type=='Home'?color1='red':value.type=='personal'?color1='green':color1}
                        if (value.type === "Home") {
                            return (
                            
                                <div style={home} className="p-4 m-3 text-center shadow">
                                    <p>{value.userName}</p>
                                    <p>{user}</p>
                                    <p className="fw-bold text-light p-1 rounded-pill shadow" style={{ "backgroundColor": "#d62828" }}>{value.type}</p>
                                    <h5 className="pt-3 fw-bold">{value.desc}</h5>
                                    <p className="py-1">{value.date}</p>
                                    <div className="icons d-flex justify-content-center">
                                        <button onClick={()=>deleteData(value.id)} className="btn"><i style={h_icons} className="fa-solid fa-trash p-3"></i></button>
                                        <button className="btn" onClick={()=>navigate("/edit/"+value.id)}><i style={h_icons} className="fa-solid fa-pen p-3"></i></button>
                                    </div>
                                </div>
                            )
                        }
                        else if(value.type === "Office"){
                            return(
                                <div style={office} className="p-4 m-3 text-center shadow">
                                    <p className="fw-bold text-light p-1 rounded-pill shadow" style={{ "backgroundColor": "#003049" }}>{value.type}</p>
                                    <h5 className="pt-3 fw-bold">{value.desc}</h5>
                                    <p className="py-1">{value.date}</p>
                                    <div className="icons d-flex justify-content-center">
                                        <button onClick={()=>deleteData(value.id)} className="btn"><i style={of_icons} className="fa-solid fa-trash p-3"></i></button>
                                        <button className="btn" onClick={()=>navigate("/edit/"+value.id)}><i style={of_icons} className="fa-solid fa-pen p-3"></i></button>
                                    </div>
                                </div>
                            )
                        }
                        else if(value.type === "Personal"){
                            return(
                                <div style={personal} className="p-4 m-3 text-center shadow">
                                    <p className="fw-bold text-light p-1 rounded-pill shadow" style={{ "backgroundColor": "#219ebc" }}>{value.type}</p>
                                    <h5 className="pt-3 fw-bold">{value.desc}</h5>
                                    <p className="py-1">{value.date}</p>
                                    <div className="icons d-flex justify-content-center">
                                        <button onClick={()=>deleteData(value.id)} className="btn"><i style={p_icons} className="fa-solid fa-trash p-3"></i></button>
                                        <button className="btn" onClick={()=>navigate("/edit/"+value.id)}><i style={p_icons} className="fa-solid fa-pen p-3"></i></button>
                                    </div>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div style={other} className="p-4 m-3 text-center shadow">
                                    <p className="fw-bold text-light p-1 rounded-pill shadow" style={{ "backgroundColor": "#fbb703" }}>{value.type}</p>
                                    <h5 className="pt-3 fw-bold">{value.desc}</h5>
                                    <p className="py-1">{value.date}</p>
                                    <div className="icons d-flex justify-content-center">
                                        <button onClick={()=>deleteData(value.id)} className="btn"><i style={ot_icons} className="fa-solid fa-trash p-3"></i></button>
                                        <button className="btn" onClick={()=>navigate("/edit/"+value.id)}><i style={ot_icons} className="fa-solid fa-pen p-3"></i></button>
                                    </div>
                                </div>
                            )
                        }
                    })
                    }
                </div>
            </div>
        </>
    )
}