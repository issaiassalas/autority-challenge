import Link from "next/link"
import styles from "./styles.module.css"

const NavBar = () => {
  return <div>
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <Link className={styles.link} href="/">Tasks</Link>
      </li>
      <li className={styles.listItem}>
        <Link className={styles.link} href="/create">Create</Link>
      </li>
    </ul>
  </div>
}

export default NavBar