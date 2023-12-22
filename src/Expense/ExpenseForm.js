import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseTable from "./ExpenseList";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ExpenseForm() {
  const history = useNavigate();
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const cateInputRef = useRef();
  const [newExpense, setNewExpense] = useState();
  const [showAlert, setShowAlert] = useState({ message: "", active: false });
  const [isUpdate, setIsUpdate] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editHandler = id => {
    history("/?id=" + id);
    setIsUpdate(true);
    axios
      .get(
        `https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense/${id}.json`
      )
      .then(res => {
        priceInputRef.current.value = res.data.price;
        desInputRef.current.value = res.data.des;
        cateInputRef.current.value = res.data.cat;
      });
  };
  const formHandler = async e => {
    e.preventDefault();
    if (isUpdate) {
      const updateId = queryParams.get("id");
      await axios.put(
        `https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense/${updateId}.json`,
        {
          price: priceInputRef.current.value,
          des: desInputRef.current.value,
          cat: cateInputRef.current.value
        }
      );

      setShowAlert({ message: "Updated SuccessFully", active: true });
      setTimeout(() => {
        setShowAlert({ message: "", active: false });

        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
        history("/");
      }, 2000);
    } else {
      const obj = {
        price: priceInputRef.current.value,
        des: desInputRef.current.value,
        cat: cateInputRef.current.value
      };
      const data = await axios
        .post(
          "https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense.json",
          obj
        )
        .then(res => res.data)
        .catch(err => console.log(err));
      if (data) {
        setNewExpense(obj);
        setShowAlert({ message: "Expenses Added SuccessFully", active: true });
        setTimeout(() => {
          setShowAlert({ message: "", active: false });
        }, 2000);
        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
      }
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
            {isUpdate ? "Update" : "Add Expense"}
          </Button>
        </div>
      </Form>
      <ExpenseTable newExpense={newExpense} editHandler={editHandler} />
    </div>
  );
}

export default ExpenseForm;
