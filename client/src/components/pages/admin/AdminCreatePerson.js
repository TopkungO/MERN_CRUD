import React,{ useState,useEffect } from 'react'
import AdminNav from '../../layouts/AdminNav'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Table} from 'antd';

import {createPerson, getPerson, removePerson } from "../../functions/person"

import { DeleteOutlined,EditOutlined} from "@ant-design/icons";
import { Progress } from 'antd';

import { Link } from 'react-router-dom';

const AdminCreatePerson = () => {
    const {user} =useSelector((state)=>({...state}));

    const [name,setName] =useState("");
    const [person,setperson] =useState([]);
    const [filename,setFilename] =useState("choose File");
    const [file,setFile]=useState('');

    const [uploadPerscentage,setUploadPerscentage]=useState(0)

    useEffect(() => {
        loadPerson(user.token);
    },[]);

    const loadPerson = (authtoken)=>{
        getPerson(authtoken)
            .then((res)=>{
                setperson(res.data);
            }).catch(err =>{
                toast.error(err);
                console.log(err);
            })
    }

    const onSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",file);
        formData.append('data',name);
        createPerson( formData , user.token,setUploadPerscentage)
            .then(res=>{
                setName=("");
                setFilename("choose File")
                setUploadPerscentage(0);
                loadPerson(user.token);
                toast.success("create "+res.data.name+" success");
            })
            .catch(err=>{
                toast.error(err.response);
            });

    }

    const handleRemove=(id)=>{
        if(window.confirm("Are you sure Delete")){
            removePerson( id,user.token )
            .then(res=>{
                loadPerson(user.token);
                toast.success("remove "+res.data.name+" success")
            })
            .catch(err=>{
                toast.error(err.response);
            });
        }
    }

    const columns=[
        {
            title:"ชื่อ",
            dataIndex:"name",
            key:"name"
        },{
            title:"Actions",
            render:(record)=>(
                <>
                    <span className="btn btn-sm "
                        onClick={()=>handleRemove(record._id)}>
                        <DeleteOutlined className="text-danger"/>
                    </span>
                    <Link to={"/admin/update-person/"+record._id}>
                        <span className="btn btn-sm  ">
                            <EditOutlined className="text-warning"/>
                        </span>
                    </Link>
                </>
            ) 
        }
        
    ]

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div className="col">
                    <h4>AdminCreatePerson</h4>

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>ชื่อ</label>
                            <input type="text" 
                                className="form-control" 
                                autoFocus 
                                value={name}
                                required
                                onChange={(e)=> setName(e.target.value)}
                            />
                        </div>
                        <div className="custom-file mb-4">
                            <input 
                                type="file" 
                                className="custom-file-input"
                                onChange={(e)=> {
                                    setFile(e.target.files[0])
                                    setFilename(e.target.files[0].name);
                                }}

                            />
                            <label className="custom-file-label" htmlFor="customfile">
                                {filename}
                            </label>
                        </div>
                        <Progress
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            percent={uploadPerscentage}
    />

                        <button className="btn btn-outline-primary">save</button>

                    </form>

                    <hr/>
                   <Table columns={columns} dataSource={person} rowKey="_id"/>
                </div>
            </div>
        </div>
    )
}

export default AdminCreatePerson
