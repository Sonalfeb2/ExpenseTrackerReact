import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Alert, Toast, ToastContainer } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { AuthActions } from "../store/AuthReducer";
function Signup() {
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmInputRef = useRef();
  const [showError, setShowError] = useState({ active: false, message: "" });
  const [showloginpage, setShowloginpage] = useState(false);
  const SubmitHandler = async e => {
    e.preventDefault();
    let pass = passInputRef.current.value;
    let email = emailInputRef.current.value;
    if (showloginpage) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true
          })
        }
      );
      const data = await response.json();
      if (data.error) {
        setShowError({ active: true, message: data.error.message });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        emailInputRef.current.value = "";
        passInputRef.current.value = "";
      } else {
        
        localStorage.setItem('idToken',data.idToken);
        localStorage.setItem('userId',data.localId)
        setShowError({ active: "true", message: "login SuccessFully" });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        dispatch(AuthActions.login(data.localId))
        emailInputRef.current.value = "";
        passInputRef.current.value = "";
      }
    } else {
      let cpass = confirmInputRef.current.value;
      if (pass === cpass) {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: pass,
              returnSecureToken: true
            })
          }
        );
        const data = await response.json();
        if (data.error) {
          setShowError({ active: true, message: data.error.message });
          setTimeout(() => setShowError({ active: false, message: "" }), 3000);
          emailInputRef.current.value = "";
          passInputRef.current.value = "";
        } else {
          setShowError({ active: "true", message: "Signup SuccessFully" });
          setTimeout(() => setShowError({ active: false, message: "" }), 3000);
          emailInputRef.current.value = "";
          passInputRef.current.value = "";
          confirmInputRef.current.value = "";
        }
      } else {
        setShowError({
          active: true,
          message: "Password doesnot match with confirm"
        });
        setTimeout(() => setShowError({ active: false, message: "" }), 3000);
        passInputRef.current.value = "";
        confirmInputRef.current.value = "";
      }
    }
  };
  return (
    <div>
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
      <Card
        style={{ width: "20rem", marginTop: "10%" }}
        className=" mx-auto"
        onSubmit={SubmitHandler}
      >
        {showloginpage
          ? <p className="text-center w-100" variant="info">
              Login
            </p>
          : <p className="text-center w-100">Signup</p>}
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
          {!showloginpage &&
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmInputRef}
                required
              />
            </Form.Group>}
          <Button variant="primary" className="mb-3" type="submit">
            Submit
          </Button>
        </Form>
        <Alert
          variant="info"
          sm="2"
          onClick={() => setShowloginpage(!showloginpage)}
        >
          {showloginpage
            ? <p>Create an account ? Signup</p>
            : <p>Have an Account ? Login</p>}
            <p>Forget Your Password <Link to="forget-pass">Click Here</Link></p>
        </Alert>
      </Card>
    </div>
  );
}

export default Signup;
