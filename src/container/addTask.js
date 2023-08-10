import { React , useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db,auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

export const AddTask = () => {

    let navigate = useNavigate();
    let useCollectionRef = collection(db , 'task');
    let [state,setState] = useState([]);
    let [userName,setuserName] = useState('');
    let [task , setTask] = useState({
        desc : "" , date : "" , type : "",
    })

    useEffect(()=>{
        const getUserName = () =>{
            auth.onAuthStateChanged(user=>{
                // console.log(user.displayName)
                setuserName(user.displayName);
            })
        }
        getUserName();
    },setuserName);

    const getInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setTask({
            ...task, [name] : value,
        })
    }

    const submitData = async(e) => {
        e.preventDefault();
        console.log(task);
        task.userName= userName;
        let addData = await addDoc(useCollectionRef , task);
        navigate("/");
        setTask({
            desc : "" , date : "" , type : "",
        })
        console.log(addData)
    }
    //css
    const button = {
        "backgroundColor" : "#9300ff",
        "color" : "white",
    }

    const input = {
        "border" : "none",
        "backgroundColor" : "white",
    }

    return (
        <>
            <div className="container py-5">
                <h2 style={{ "textAlign": "center"}} className="fw-bolder">New Task</h2>
                <div className="py-5 d-flex justify-content-center align-items-center">
                    <form className="w-50" method="post" onSubmit={(e)=>submitData(e)}>
                        <div>
                            <div className="col-12 my-3">
                                <div className="input-group">
                                    <input type="text" name="desc" value={task.desc} onChange={(e)=>getInput(e)} style={input} className="form-control p-3 shadow" placeholder="Enter Task Here.." />
                                    <div style={input} className="input-group-text shadow mx-2 px-3"><i className="fa-solid fa-plus fw-bold"></i></div>
                                </div>
                            </div>
                            <div className="col-12 my-3">
                                <select style={input} name="type" value={task.type} onChange={(e)=>getInput(e)} className="form-select shadow p-3">
                                    <option>Select Type</option>
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Others</option>
                                </select>
                            </div>
                            <div className="col-12 my-3">
                                <input style={input} name="date" value={task.date} onChange={(e)=>getInput(e)} type="date" className="form-control p-3 shadow" />
                            </div>
                            <div>
                                <button className="btn w-100 p-3 shadow fw-semibold fs-6" style={button}>Add Task + </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}