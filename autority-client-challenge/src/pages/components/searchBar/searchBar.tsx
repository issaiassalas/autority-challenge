
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTodo } from "../../../features/todo/todoSlice";
import { fetchAllTasks } from "../../api/todo.service";
import styles from "./styles.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    fetchAllTasks(query).then(tasks => {
      dispatch(setTodo({tasks, action: 'idle'}))  
    })
  }, [query])

  return <div className={styles.container}>
  <input onChange={(e) => setQuery(e.target.value)}/>
</div>
}

export default SearchBar