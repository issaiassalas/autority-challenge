import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTasks } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { todoFetchAction } from "../../../features/todo/todoSlice";
import { createTask, getTaskById, updateTask } from "../../api/todo.service";
import styles from "./styles.module.css";

interface propParams {
  id?: number
}

const initialState = {
  id: null,
  name: "",
  description: "",
  author: "",
  isComplete: false,
  updatedAt: null,
  createdAt: null,
  deletedAt: null,
}

const TaskForm = ({id}: propParams) => {
  const [task, setTask] = useState(initialState)
  const [errors, setErrors] = useState([])
  const router: NextRouter = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      createTask(task).then(result => {
        if (!result.errors) {
          dispatch(todoFetchAction())
          toast.success('Task saved!')
          router.push(`/edit/${result.id}`)
        } else {
          setErrors(result.errors)
        }
      });
    } else {
      updateTask(id, task).then(result => {
        if (!result.errors) {
          dispatch(todoFetchAction())
          toast.success('Task saved!')
        } else {
          toast.error('Error on save!')
          setErrors(result.errors)
        }
      })
    }
  }

  const handleOnChange = (e, value=undefined) => {
    setTask({
      ...task,
      [e.target.name]: value ===undefined? e.target.value: value
    })
  }

  useEffect(() => {
    if (id) {
      getTaskById(id).then(result => {
        if (result.status === 404) {
          router.push('/')
        } else {
          result.json().then(setTask)
        }
      })
    }
  }, [id])

  return <div className={styles.formContainer}>
  <form onSubmit={handleSubmit} className={styles.formControl}>
    <h2><FaTasks /> Task</h2>
    <ul>
      {errors.length > 0 && errors.map((item, index) => 
        <li key={index}><MdOutlineErrorOutline /> {item.msg}</li>
      )}
    </ul>
    <input name="name" onChange={handleOnChange} value={task.name} placeholder="Task Name"/>
    <input name="author" onChange={handleOnChange} value={task.author} placeholder="Task Author"/>
    <textarea name="description" onChange={handleOnChange} cols={30} rows={6} value={task.description} placeholder="Task Description"></textarea>
    <div>
      <input onChange={(e) => handleOnChange(e, !task.isComplete)} type="checkbox" name="isComplete" checked={task.isComplete}/>
      <label htmlFor="isComplete">IsComplete</label>
    </div>
    <button type="submit"><IoIosSave /></button>
  </form>

  </div>
}

export default TaskForm;