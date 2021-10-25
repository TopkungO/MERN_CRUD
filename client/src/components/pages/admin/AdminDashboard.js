import React from 'react'
import AdminNav from '../../layouts/AdminNav'
const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav/>
                </div>
                <div>
                    <h1>admin dashborad</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
