import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import { Outlet } from "react-router-dom";
const Root = (props) => {
  const idToken = JSON.parse(localStorage.getItem("id"));
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
          idToken: idToken
        })
      }
    );
    const data = await response.json();
    console.log(data);
  };
  const handleLogout = () =>{
    props.handleUserLogout();

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
