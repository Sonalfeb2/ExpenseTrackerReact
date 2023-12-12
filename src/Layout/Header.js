
import { Link } from "react-router-dom";
import { Container, Row , Col } from "react-bootstrap";
const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={8}>Welcome Expense Tracker !!</Col>
        <Col sm={4} className="bg-info">Your Profile is incomplete.<Link to="update-profile"> Complete now</Link></Col>
      </Row>
      <hr />
    </Container>
  );
};
export default Header;
