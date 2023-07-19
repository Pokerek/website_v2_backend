import {
    useEffect
} from 'react';
import {
    Outlet,
    useSubmit,
} from 'react-router-dom'

import useAuth from "../../hooks/useAuth";
import Button from "../../components/custom/button";

import "./admin-page.scss";

const AdminPage = () => {
    const submit = useSubmit();
    const { login, logout } = useAuth();

    useEffect(() => {
        login();
    }, []);

    const handleLogout = () => {
        logout();
        submit(null, { method: "POST", action: "/admin/logout" })
    }

    return (
        <div className="admin-page">
            <h1>Admin page</h1>
            <div className="admin-page__actions">
                <Button navLink="/admin/write">Write a post</Button>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminPage;
