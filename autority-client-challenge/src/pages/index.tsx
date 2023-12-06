import type { NextPage } from 'next'
import Head from 'next/head'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../app/store'
import { TodoState, setTodo } from '../features/todo/todoSlice'
import styles from '../styles/Home.module.css'
import { fetchAllTasks } from './api/todo.service'
import SearchBar from './components/searchBar/searchBar'
import { TaskCard } from './components/taskCard/taskCard'


const IndexPage: NextPage = () => {
  const todo: TodoState = useSelector<AppState>((state) => state.todo);
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchAllTasks();
      dispatch(setTodo({tasks, action: 'idle'}))
    }
    if (todo.action === 'fetch')
    fetchData().catch()

  }, [todo.action])

  return (
    <div className={styles.container}>
      <Head>
        <title>Autority Challenge</title>
      </Head>
      <SearchBar />
      <div className={styles.cards}>
        {todo.tasks.length > 0 && 
        todo.tasks.map(task => 
          <TaskCard key={task.id} task={task}/>
        )}

      </div>
    </div>
  )
}

export default IndexPage
