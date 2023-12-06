import { NextPage } from "next";
import { useRouter } from "next/router";
import TaskForm from "../components/taskForm/taskForm";
import styles from './styles.module.css';

const IndexPage: NextPage = () => {
  const router = useRouter();
  let queryId = router.query.id;
  let id = undefined;
  if (typeof queryId === 'string') {
    id = Number.parseInt(queryId);
  }
  return (
    <div className={styles.container}>
      <TaskForm id={id}/>
    </div>
  )
}

export default IndexPage
