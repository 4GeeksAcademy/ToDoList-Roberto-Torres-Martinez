import React, { useState, useEffect } from "react";

const ContainerList = () => {

    const [todoList, setTodoList] = useState([]);
    const [task, setTask] = useState("");
    const [alert, setAlert] = useState(false);

    const handleAddTask = () => {
        if (task !== "") {
            setTodoList([...todoList, task]);
            setTask("");
        }
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTask();
        }
    };

    useEffect(() => {
        if (todoList.length >= 8) {
            Swal.fire({
                title: "Quieres seguir agregando tareas?",
                icon: "question",
                draggable: true
            });
            setAlert(true);
        }
    }, [todoList,]);

    const deleteTask = (index) => {
        const filterTask = todoList.filter((task, taskIndex) => {
            return taskIndex !== index;
        });
        setTodoList(filterTask);
    }



    return (
        <>
            <div className="container" >
                <div className="row list">
                    <h1>ToDos</h1>
                    <input className="to-do-input" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={handleEnter} placeholder="Write a Task" />
                    <ul className="ul-tasks">
                        {todoList.length === 0 ? (
                            <li className="no-tasks"><p>No hay tareas, añadir tareas</p><i className="fa-regular fa-pen-to-square penIcon"></i></li>
                        ) : (
                            todoList.map((toDo, index) => (
                                <li className="li-task" key={index}>
                                    {toDo}
                                    <span className="cross-icon">
                                        <i onClick={() => deleteTask(index)} className="fa-solid fa-xmark"></i>
                                    </span>
                                </li>
                            ))
                        )}
                    </ul>

                    <button className="add-task" type="button" onClick={handleAddTask}>Add Task</button>
                </div>
            </div>
        </>
    );

};

export default ContainerList;