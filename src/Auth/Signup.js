import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Alert } from "react-bootstrap";
function Signup() {
  return (
    <Card style={{ width: "20rem", marginTop: "10%" }} className=" mx-auto">
      <Form className="mx-auto">
        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Submit
        </Button>
      </Form>
      <Alert variant="info" sm="2">Have an Account ? Login</Alert>
    </Card>
  );
}

export default Signup;
