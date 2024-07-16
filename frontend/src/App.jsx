import { Outlet } from "react-router-dom";
import Footer from "./admin/footer";
import Header from "./admin/header";

function App() {

  return (
    <>
    <Header />
    <main>
    <Outlet />
    </main>
    <Footer />
    </>
  );
}

export default App;
