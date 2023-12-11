import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Alert, Toast , ToastContainer } from "react-bootstrap";
import { useRef, useState } from "react";
function Signup() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmInputRef = useRef();
  const [showError, setShowError] = useState({ active: false, message: "" });
  const SubmitHandler = e => {
    e.preventDefault();
    let pass = passInputRef.current.value;
    let cpass = confirmInputRef.current.value;
    if (pass === cpass) {
      console.log("hi");
    } else {
      setShowError({
        active: true,
        message: "Password doesnot match with confirm"
      });
      setTimeout(() => setShowError({ active: false, message: "" }), 3000);
      passInputRef.current.value= '';
      confirmInputRef.current.value=''
    }
  };
  return (
    <>
    {showError.active&& <ToastContainer
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
        </ToastContainer>
}
    <Card
      style={{ width: "20rem", marginTop: "10%" }}
      className=" mx-auto"
      onSubmit={SubmitHandler}
    >
      <Form className="mx-auto">
        <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailInputRef}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            ref={passInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmInputRef}
            required
          />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit">
          Submit
        </Button>
      </Form>
      <Alert variant="info" sm="2">
        Have an Account ? Login
      </Alert>
    </Card>
    </>
  );
}

export default Signup;
