import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UpdateProfile = () => {
  
  return (
    <Container>
      <h2>Contact Details</h2>
      <Row className="justify-content-md-center">
        <Col>
          <Form.Label>Full Name</Form.Label>
          <Form.Control size="sm" type="text" />

          <Form.Label>Photo Url</Form.Label>
          <Form.Control size="sm" type="text" />
        </Col>
      </Row>

      <Button variant="danger" className="mt-3" type="submit">
        Submit
      </Button>
    </Container>
  );
};
export default UpdateProfile;
