import { useEffect, useLayoutEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../store/ExpenseReducer";
function ExpenseTable(props) {
  const dispatch = useDispatch();
  const storeExpenseList = useSelector(state => state.expense.list);
  const isPremiumActivate = useSelector(state => state.expense.activatePremium);
  useLayoutEffect(() => {
    if (isPremiumActivate) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  });
  const getData = async () => {
    let arr = [];
    await axios(
      "https://expensetrackerlist-default-rtdb.firebaseio.com/expense.json"
    )
      .then(res => {
        for (let obj in res.data) {
          arr.push({ id: obj, ...res.data[obj] });
        }
      })
      .catch(err => console.log(err));
    if (arr !== undefined) {
      dispatch(ExpenseSliceActions.fetchExpense(arr));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDelete = async id => {
    await axios.delete(
      `https://expensetrackerlist-default-rtdb.firebaseio.com//expense/${id}.json`
    );
    getData();
  };
 
  return (
    <div className="w-80">
      <h1>Expense List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {storeExpenseList !== undefined
            ? storeExpenseList.map((list, index) =>
                <tr key={index}>
                  <td>
                    {index}
                  </td>
                  <td>
                    Rs: {list.price}
                  </td>
                  <td>
                    {list.des}
                  </td>
                  <td>
                    {list.cat}
                  </td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => props.editHandler(list.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(list.id)}
                    >
                      Delete
                    </Button>
                    {list.price >= 10000 &&
                      <Button
                        variant="info"
                        onClick={() =>
                          dispatch(ExpenseSliceActions.activatePremium())}
                      >
                        Activate Premium
                      </Button>}
                  </td>
                </tr>
              )
            : <tr style={{ color: "red" }}>
                <td>ZERO EXPENSE FOUND</td>
              </tr>}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
