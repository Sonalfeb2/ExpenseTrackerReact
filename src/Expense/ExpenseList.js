import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function ExpenseTable(props) {
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    let arr = []
    fetch(
      "https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense.json"
    )
      .then(res => res.json())
      .then(data => {
        for (let obj in data) {
          arr.push(data[obj]);
        }
        setExpenseList(arr)
      });
  }, []);
  useEffect(
    () => {
      if (props.newExpense) {
        setExpenseList(prev => [...prev, props.newExpense]);
      }
    },
    [props.newExpense]
  );
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
          </tr>
        </thead>
        <tbody>
          {expenseList.length > 0
            ? expenseList.map((list, index) =>
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
                </tr>
              )
            : <tr style={{ color: "red" }}>ZERO EXPENSE FOUND</tr>}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
