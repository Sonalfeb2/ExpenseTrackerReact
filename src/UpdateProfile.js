import { useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const UpdateProfile = () => {
  const nameinputRef = useRef();
  const urlInputRef = useRef();
  const InputHandler = async(e) => {
    e.preventDefault();
    const tokenId = JSON.parse(localStorage.getItem('id'));
  
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCYNOpI0OEGmCAOJsAmLIIFICI97RaoUK8",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          idToken : tokenId,
          displayName: nameinputRef.current.value,
          photoUrl: urlInputRef.current.value,
          returnSecureToken: true
        })
      }
    );
    const data = await response.json();
    nameinputRef.current.value = '';
    urlInputRef.current.value = '';
    console.log(data);
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
    </Container>
  );
};
export default UpdateProfile;
