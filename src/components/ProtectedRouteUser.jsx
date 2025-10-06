import { Navigate } from "react-router-dom";

const ProtectedRouteUser = ({user, children}) => {
    if (!user){
        return <Navigate to="/"/>
    }

    return children;
}


export default ProtectedRouteUser;