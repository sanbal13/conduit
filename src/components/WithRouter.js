import {useNavigate, useParams} from 'react-router-dom';
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} navigate={navigate} params={params}/>;
    }
    return ComponentWithRouterProp;
  }
  export default withRouter;