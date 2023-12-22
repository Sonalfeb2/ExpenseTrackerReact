import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseTable from "./ExpenseList";
import { useRef, useState } from "react";
function ExpenseForm() {
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const cateInputRef = useRef();
  const [newExpense, setNewExpense] = useState();
  const [showAlert, setShowAlert] = useState({ message: "", active: false });
  const formHandler = async e => {
    e.preventDefault();
    const obj = {
      price: priceInputRef.current.value,
      des: desInputRef.current.value,
      cat: cateInputRef.current.value
    };
    const res = await fetch(
      "https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(obj)
      }
    );
    const data = await res.json();
    if (data) {
      setNewExpense(obj);
      setShowAlert({ message: "Expenses Added SuccessFully", active: true });
      setTimeout(() => {
        setShowAlert({ message: "", active: false });
      }, 2000);
    }
  };
  return (
    <div>
      {showAlert.active &&
        <div className="alert alert-dark w-50 mx-auto" role="alert">
          {showAlert.message}
        </div>}
      <Form
        className="w-50 mx-auto mb-3"
        style={{ background: "#008067", borderRadius: "24px" }}
        onSubmit={formHandler}
      >
        <div className="ps-3 pe-4">
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              ref={priceInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              required
              ref={desInputRef}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            required
            ref={cateInputRef}
          >
            <option>Select Category</option>
            <option value="Petrol">Petrol</option>
            <option value="Grocery">Grocery</option>
            <option value="Shopping">Shopping</option>
          </Form.Select>
          <Button variant="primary" type="submit" className="mb-3 w-100">
            Add Expense
          </Button>
        </div>
      </Form>
      <ExpenseTable newExpense={newExpense} />
    </div>
  );
}

export default ExpenseForm;
