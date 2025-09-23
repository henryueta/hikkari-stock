import NavBar from "../../components/nav"
import TableManagement from "../../components/table-management"
import styles from "./index.module.css"

//produtos
//vendas

const Home = () => {
  return (
    <>
        <NavBar/>
        <section className={styles['homePageSection']}>
            <TableManagement type="product"/>
        </section>
    </>
  )
}

export default Home
