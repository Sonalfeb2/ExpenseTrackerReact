import { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Toast,
  ToastContainer
} from "react-bootstrap";

const UpdateProfile = () => {
  const nameinputRef = useRef();
  const urlInputRef = useRef();

  const [showError, setShowError] = useState({ active: false, message: "" });
  const tokenId = JSON.parse(localStorage.getItem("id"));
  useEffect(
    () => {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
        {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            idToken: tokenId
          })
        }
      )
        .then(res => res.json())
        .then(data => {
          nameinputRef.current.value = data.users[0].displayName
            ? data.users[0].displayName
            : "";
          urlInputRef.current.value = data.users[0].photoUrl
            ? data.users[0].photoUrl
            : "";
        });
    },
    [tokenId]
  );
  const InputHandler = async e => {
    e.preventDefault();

    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          idToken: tokenId,
          displayName: nameinputRef.current.value,
          photoUrl: urlInputRef.current.value,
          returnSecureToken: true
        })
      }
    );

    setShowError({ active: "true", message: "Updated SuccessFully" });
    setTimeout(() => setShowError({ active: false, message: "" }), 3000);
    nameinputRef.current.value = "";
    urlInputRef.current.value = "";
  };
  return (
    <Container>
      <h2>Contact Details</h2>
      <Form onSubmit={InputHandler}>
        <Row className="justify-content-md-center">
          <Col>
            <Form.Label>Full Name</Form.Label>
            <Form.Control size="sm" type="text" required ref={nameinputRef} />

            <Form.Label>Photo Url</Form.Label>
            <Form.Control size="sm" type="text" required ref={urlInputRef} />
          </Col>
        </Row>

        <Button variant="danger" className="mt-3" type="submit">
          Submit
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
export default UpdateProfile;
