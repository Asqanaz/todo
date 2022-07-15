import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { Checkbox } from "@mui/material"
import { AiFillEdit } from "react-icons/ai"

const App = () => {
    const [inputValue, setInputValue] = useState("")
    const [isEmpty, setIsEmpty] = useState(false)
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks.tasks)
    const inputRef = useRef()

    const addTask = value => {
        const task = {
            id: Math.round(Math.random() * 100),
            done: false,
            taskName: value
        }
        if (inputValue.length > 0) {
            dispatch({
                type: "ADD_TASK",
                payload: task
            })
            setInputValue("")
            inputRef.current.value = ""
            inputRef.current.focus()
            setIsEmpty(false)
        } else {
            setIsEmpty(true)
        }
    }

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }

    const handleCheckedChange = e => {
        dispatch({
            type: "TASK_CHECKED",
            payload: e.id
        })
    }

    const handleDeleteChange = e => {
        dispatch({
            type: "DELETE_TASK",
            payload: e.id
        })
    }

    const handleEditChange = e => {
        if(inputValue.length != 0){
            dispatch({
                type: "EDIT_TASK",
                id: e.id,
                value: inputValue
            })
        }
    }
    const deleteCheckedTasks = () => {
        dispatch({
            type: "DELETE_CHECKED_TASKS"
        })
    }
    
    return (
        <div className="container">
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    placeholder="Add a new daily task"
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick={() => addTask(inputValue)}
                >
                    Add to tasks
                </Button>
                <Button
                    onClick={deleteCheckedTasks}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                >
                    Delete
                </Button>
            </div>
            {isEmpty && <h2 style={{ color: "red" }}>Task cannot be empty</h2>}
            <div className="tasks-container">
                {tasks.length != 0 ? (
                    tasks.map(el => (
                        <div className="tasks-single-container" key={el.id}>
                            <Checkbox
                                onChange={handleCheckedChange.bind(this, el)}
                            />
                            <p
                                style={{
                                    textDecoration: el.done
                                        ? "line-through"
                                        : "none",
                                    fontSize: 16
                                }}
                            >
                                {el.taskName}
                            </p>
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon />}
                                onClick={handleDeleteChange.bind(this, el)}
                                color="error"
                            >
                                Delete
                            </Button>
                            <Button
                                startIcon={<AiFillEdit />}
                                variant="contained"
                                color="primary"
                                onClick={handleEditChange.bind(this, el)}
                            >
                                Edit
                            </Button>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2>Tasks are empty!</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App
