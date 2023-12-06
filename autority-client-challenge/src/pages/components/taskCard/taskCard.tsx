import { NextRouter, useRouter } from "next/router";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { FaClipboardCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { Task, todoFetchAction } from "../../../features/todo/todoSlice";
import { deleteTask, updateTask } from "../../api/todo.service";
import styles from "./styles.module.css";


export const TaskCard = ({task}: {task: Task}) => {
  const dispatch: AppDispatch = useDispatch();
  const router: NextRouter = useRouter();
  const handleChangeStatus = () => {
    updateTask(task.id, {...task, isComplete: !task.isComplete}).then(
      result => {
        dispatch(todoFetchAction())
        toast.success(`Task ${result.name} updated!`)
      }
    )
  }

  const handleDeleteTask = () => {
    deleteTask(task.id).then(
      result => {
        dispatch(todoFetchAction())
        toast.error(`Task ${result.name} delete!`)
      }
    )
  }

  const handleRedirect = () => {
    router.push(`/edit/${task.id}`)
  }

  return <section className={styles.card}>
    <h3>{task.name}</h3>
    <p><i>{task.author}</i></p>
    <p><b>{task.description}</b></p>
    <span>{task.isComplete ? "COMPLETED": "PENDING"}</span>
    <div >
      <button title="Change Status" onClick={handleChangeStatus} className={styles.btn}><FaClipboardCheck/></button>
      <button title="Edit task" onClick={handleRedirect}  className={styles.btn}><CiEdit /></button>
      <button title="Delete task" onClick={handleDeleteTask} className={styles.btn}><MdDeleteForever /></button>
    </div>
  </section>
}
