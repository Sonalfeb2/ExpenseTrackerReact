import { Container, Form, Row, Col, Button, Toast, ToastContainer } from "react-bootstrap";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const ForgetPass = () => {
  const emailInputRef = useRef();
  const navigate = useNavigate();
  const [showError, setShowError] = useState({ active: false, message: "" });
  const InputHandler = async e => {
    e.preventDefault();
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value
        })
      }
    )
      .then(res => res.json())
      .then(data => {
        setShowError({ active: "true", message: "Link Sent SuccessFully" });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        navigate('/signup')
      });
  };
  return (
    <Container>
      <h2>Forget Password</h2>
      <Form onSubmit={InputHandler}>
        <Row className="justify-content-md-center">
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control size="sm" type="email" required ref={emailInputRef} />
          </Col>
        </Row>

        <Button variant="success" className="mt-3" type="submit">
          Reset
        </Button>
        <Button variant="danger" className="mt-3 ms-2" onClick={()=>navigate('/signup')}>
          Back to Signup
        </Button>
      </Form>
      {showError.active &&
        <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Message</strong>
            </Toast.Header>
            <Toast.Body>
              {showError.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>}
    </Container>
  );
};
export default ForgetPass;
