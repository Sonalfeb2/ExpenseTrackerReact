
import { Link } from "react-router-dom";
import { Container, Row , Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
const Root = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={8}>Welcome Expense Tracker !!</Col>
        <Col sm={4} className="bg-info">Your Profile is incomplete.<Link to="/update-profile"> Complete now</Link></Col>
      </Row>
      <hr />
      <Outlet/>
    </Container>
  );
};
export default Root;
