import type { NextPage } from 'next'

import TaskForm from '../components/taskForm/taskForm'
import styles from "./styles.module.css"


const IndexPage: NextPage = () => {

  return (
    <div className={styles.container}>
      <TaskForm />
    </div>
  )
}

export default IndexPage
