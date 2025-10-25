import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {   
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString =localStorage.getItem("todos")
    if(todoString){
   let todos=JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
    }
  }, [])
  

  const saveToLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggelFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  
  const handleEdit = (e, id) => {
    let t=todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
     let newTodos = todos.filter(item=>{
      return item.id !== id;
     });
    
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
     let newTodos = todos.filter(item=>{
      return item.id !== id;
     });
    
    setTodos(newTodos);
     saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
     saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
     saveToLS();
  };

  return(
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
      <h1 className="font-bold text-center">iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            // disabled={  }
            className="w-1/2 border-2 border-black rounded-xl p-2"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <input onChange={toggelFinished} type="checkbox" checked={showFinished}/> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todo to display</div>}
          {todos.map((item) => {
            return (showFinished || !item.isCompleted)&& (
              
              <div
                key={item.id}
                className="todo flex w-1/3 my-3 justify-between"
              >
                <div className="flex gap-5">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  id=""
                />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e)=>handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e)=>{handleDelete(e, item.id)}}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
