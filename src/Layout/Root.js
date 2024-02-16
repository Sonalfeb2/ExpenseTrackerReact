import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/AuthReducer";
const Root = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.authentication.userId);
  const handleEmailVerification = async () => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: userId
        })
      }
    );
    const data = await response.json();
    console.log(data);
  };
  const handleLogout = () =>{
    dispatch(AuthActions.logout())

  }
  return (
    <Container fluid>
      <Row>
        <Col sm={6}>Welcome Expense Tracker !!</Col>
        <Col sm={3} className="bg-info">
          Your Profile is incomplete.<Link to="/update-profile">
          Complete now
          </Link>
        </Col>
        <Col lg={1}>
          <Button variant="success" onClick={handleEmailVerification}>
            Verify Email
          </Button>
        </Col>
        <Col sm={1}>
          <Button variant="danger" onClick={()=>handleLogout()}>
            Logout
          </Button>
        </Col>
      </Row>
      <hr />
      <Outlet />
    </Container>
  );
};
export default Root;
