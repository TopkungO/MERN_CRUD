import React ,{ useState }from 'react'
import { toast } from "react-toastify";
//function
import { registerHandler } from "../../functions/auth";

const Regi = ( {history} ) => {
    
    const [formData,setFormData] = useState({
        name:'',
        password:'',
        password2:''
    })

    const [loading,setLoading] =useState(false);

   const {name, password, password2} = formData;

   const onChange =(e) =>{
       setFormData({ ...formData, [e.target.name]:e.target.value})
   }

   const onSubmit =(e) =>{
       setLoading(true)
       e.preventDefault();
        if(password !== password2){
            toast.error("password not match");
            setLoading(false);
        }else{
            const newUser ={
                name,
                password
            }
            registerHandler(newUser)
                .then(res=>{
                    setLoading(false);
                    toast.success("register complete");
                    history.push("/")
                })
                .catch(err=>{
                    setLoading(false);
                     toast.error(err.response.data.msg);
                })

        }

   }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-md-6 offset-md-3">
                    {!loading
                        ?(<h1>register</h1>)
                        :(<h1>Loging</h1>)
                    }

                    <form onSubmit={onSubmit}>
                    <input 
                        className="form-control mb-2"
                        type="text" 
                        name="name" 
                        placeholder="UserName" 
                        autoFocus 
                        onChange={onChange}
                    />

                    <input 
                        className="form-control mb-2"
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={onChange}

                    />
                    <input 
                        className="form-control mb-2"
                        type="password" 
                        name="password2" 
                        placeholder="Confirm password"
                        onChange={onChange}

                    />

                    <button 
                        type="submit"
                        className="btn btn-success"
                        disabled={password.length < 6}
                    >
                        submit
                    </button>
                    </form>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Regi

