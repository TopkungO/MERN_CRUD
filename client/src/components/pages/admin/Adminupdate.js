import React,{ useState,useEffect } from 'react'
import AdminNav from '../../layouts/AdminNav'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


import {updatePerson, getPersons} from "../../functions/person"


import { Link } from 'react-router-dom';

const Adminupdate = ({history,match}) => {

    const {user} =useSelector((state)=>({...state}));
    const [name,setName] =useState("");

    useEffect(() => {
        loadPerson(match.params.id,user.token);
    },[]);

    const loadPerson = (id,authtoken)=>{
        getPersons(id,authtoken)
            .then((res)=>{
                setName(res.data.name);
            }).catch(err =>{
                toast.error(err);
                console.log(err);
            })
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        updatePerson( { name }, match.params.id, user.token )
            .then(res=>{
                loadPerson(user.token);
                toast.success("Update "+res.data.name+" success");
                history.push("/admin/create-person");
            })
            .catch(err=>{
                toast.error(err.response);
            });

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    
                    <h4>UpdatePerson</h4>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>ชื่อ</label>
                            <input type="text" 
                                className="form-control" 
                                value={name}
                                autoFocus 
                                required
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>

                        <button className="btn btn-outline-primary">update</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Adminupdate
