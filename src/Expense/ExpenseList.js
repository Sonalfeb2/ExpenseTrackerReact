import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button } from "react-bootstrap";
function ExpenseTable(props) {
    
  const [expenseList, setExpenseList] = useState([]);
  const getData = async () =>{
    let arr = [];
    await axios(
      "https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense.json"
    )
      .then(res => {
        for (let obj in res.data) {
          arr.push({ id: obj, ...res.data[obj] });
        }
      })
      .catch(err => console.log(err));
      
      setExpenseList(arr)
  }
  useEffect(() => {
     getData();
  }, []);
  useEffect(
    () => {
      if (props.newExpense) {
        setExpenseList(prev => [...prev, props.newExpense]);
      }
    },
    [props.newExpense]
  );
  const handleDelete = async(id)=>{
    await axios.delete(`https://expensetrackerauth-8f7b2-default-rtdb.firebaseio.com/expense/${id}.json`);
    getData()


  }
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
                  <td>
                    <Button variant="info" onClick={()=>props.editHandler(list.id)}>Edit</Button>
                    <Button variant="danger"  onClick={()=>handleDelete(list.id)}>Delete</Button>
                  </td>
                </tr>
              )
            : <tr style={{ color: "red" }}><td>ZERO EXPENSE FOUND</td></tr>}
        </tbody>
      </Table>
    </div>
  );
}

export default ExpenseTable;
