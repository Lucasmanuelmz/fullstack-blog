import { Outlet } from "react-router-dom";
import Footer from "./admin/footer";
import Header from "./admin/header";
import HomePage from "./public/home";

function App() {

  return (
    <>
    <Header />
    <main>
    <HomePage />
    </main>
    <Footer />
    </>
  )
}

export default App;
