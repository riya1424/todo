import {React , useState , useEffect} from "react";
import { useParams , useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection , getDoc, doc, updateDoc} from "firebase/firestore";

export const Update = () => {

    let navigate = useNavigate();
    let useCollectionRef = collection(db , 'task');
    let params = useParams();
    let [task , setTask] = useState({
        desc : "" , date : "" , type : "",
    })

    useEffect(()=>{
        const updateData = async () => {
            let userData = await doc(useCollectionRef , params.id);
            let singleRecord = await getDoc(userData);
            // console.log(singleRecord.data());
            setTask(singleRecord.data());
        }
        updateData();
    },[setTask])

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
        let record = doc(db , 'task' , params.id);
        await updateDoc(record , task);
        navigate('/');
        setTask({name : ""  , stream : "" , email : "" , contact : ""})
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

    return(
        <>
              <div className="container py-5">
                <h2 style={{ "textAlign": "center"}} className="fw-bolder">Update Your Task</h2>
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
                                <button className="btn w-100 p-3 shadow fw-semibold fs-6" style={button}>Update Task + </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}