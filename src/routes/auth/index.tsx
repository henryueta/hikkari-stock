import Auth from "../../components/auth"
import styles from "./index.module.css"

const AuthPage = () => {
  return (
    <section className={styles["authPageSection"]}>

        Auth Page
        <Auth/>
    </section>
  )
}

export default AuthPage
