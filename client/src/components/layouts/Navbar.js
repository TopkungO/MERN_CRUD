import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom"


import {
    HomeOutlined,
    LoginOutlined,
    UserAddOutlined,
    AppstoreOutlined,
    CaretDownOutlined
} from "@ant-design/icons";

//redux 
import { useDispatch ,useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const Navbar = () => {
  const dispatch =useDispatch();
  const { user } = useSelector((state) => ({...state}));
  const history =useHistory();

  const [current, setCurrent] = useState("mail");
  const { SubMenu } = Menu;
  const handleClick = (e) => {
    // console.log("click ", e);
    setCurrent({ current: e.key });
  };

  const logout = ()=>{
    dispatch({
      type:"LOGOUT",
      payload:null
    });
    history.push("/");
  }


  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="mail" icon={<HomeOutlined />}>
        <Link to="/" > home</Link>  
      </Menu.Item>

      <Menu.Item key="app"  icon={<AppstoreOutlined />}>
        person 
      </Menu.Item>

      {!user && (
      <Menu.Item className="NavReigister" key="register"  icon={<UserAddOutlined />}>
        <Link to="/register" > register</Link>  
      </Menu.Item>
      )}

      {!user && (
      <Menu.Item  className="float-right" key="login"  icon={<LoginOutlined />}>
        <Link to="/login" > login</Link>  
      </Menu.Item>
       )}

      {user && (
      <SubMenu key="SubMenu" 
        title={user.name} 
        className="float-right" 
        icon={<CaretDownOutlined/>}>
        <Menu.Item  
          key="logout"  
          icon={<LoginOutlined />} 
          onClick={logout}> 
          logout 
        </Menu.Item>
      </SubMenu>
       )}
    </Menu>
  );
};

export default Navbar;
