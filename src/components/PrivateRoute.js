import {Navigate} from 'react-router-dom';
const PrivateRoute = ({children}) => {
    return isAuthenticated? children : <Navigate to="/login" replace={true} />
}
export default PrivateRoute;