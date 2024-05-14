

import { useEffect, useLayoutEffect } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../store/ExpenseReducer";
function ExpenseTable(props) {
  const storeExpenseList = useSelector(state => state.expense.list);
  const isPremiumActivate = useSelector(state => state.expense.activatePremium);
  const userId = useSelector(state=>state.authentication.userId)
  useLayoutEffect(() => {
    if (isPremiumActivate) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  });
  
  const dispatch = useDispatch();
  const getData = async () => {
    let arr = [];
    await fetch(
      `https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/${userId}.json`
    ).then(res=>res.json()).then(data => {
        for (let obj in data) {
          arr.push({ id: obj, ...data[obj] });
        }
      })
      .catch(err => console.log(err));
    if (arr !== undefined) {
      
      dispatch(ExpenseSliceActions.fetchExpense(arr));
    }
  };
  useEffect(() => {
    if(!props.isUpdate){
    getData();}
  }, [props.isUpdate]);
  const handleDelete = async id => {
    await fetch(
      `https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/${userId}/${id}.json`,{
        method: 'DELETE'
      }
    );
    getData();
  };
  function makeCSV(data) {
    const arr = [["price", "des", "cat"]];
    for (let list of data) {
      let arr1 = [];
      arr1[0] = list.price;
      arr1[1] = list.des;
      arr1[2] = list.cat;
      arr.push(arr1);
    }
    return arr.map(r=>r).join('\n');
  }
  const blob1 = new Blob([makeCSV(storeExpenseList)]);
  const blob2 = new Blob(["Hello This is Sonal, Thanks for downloading"])
  return (
    <div className="w-80">
      <h1>Expense List</h1>
      <a href={URL.createObjectURL(blob1)} download={"file.csv"}>
        Download CSV File
      </a><br></br>
      <a href={URL.createObjectURL(blob2)} download={"text.txt"}>Download Text</a>
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
          {storeExpenseList.length!==0
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
                        {isPremiumActivate ? 'Disable Premium':'Activate Premium'}
                      </Button>}
                  </td>
                </tr>
              )
            : <tr>
                <td style={{ color: "red" }}>ZERO EXPENSE FOUND</td>
              </tr>}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
