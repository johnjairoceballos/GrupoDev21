import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import useAuth from "../auth/useAuth";

const user = null;
// const user = {id:1, username: "pepe"}

export default function PrivateRoute({ component: Component, ...rest }) {
const auth = useAuth();

  return <Route {...rest}>{auth.user ? <Component /> : <Redirect to="/" />}</Route>;
}
