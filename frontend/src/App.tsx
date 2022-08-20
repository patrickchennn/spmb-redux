import { BrowserRouter,Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import MyTopNav from './components/MyTopNav';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";

import SpmbForm from "./pages/spmb_form/SpmbForm";
import Biodata from "./pages/spmb_form/Biodata";
import BerkasAdministrasi from "./pages/spmb_form/BerkasAdministrasi";
import DaftarUlang from "./pages/spmb_form/DaftarUlang";
import InfoSeleksi from "./pages/spmb_form/InfoSeleksi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MyTopNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />

          <Route path="/spmb-form" element={<SpmbForm />} />
          <Route path="/spmb-form/biodata" element={<Biodata />} />
          <Route path="/spmb-form/berkas-administrasi" element={<BerkasAdministrasi />} />
          <Route path="/spmb-form/info-seleksi" element={<InfoSeleksi />} />
          <Route path="/spmb-form/daftar-ulang" element={<DaftarUlang />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
