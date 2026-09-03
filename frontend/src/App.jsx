import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Everest from "./pages/Everest.jsx";
import Blogs from "./pages/Blogs.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BlogDetail from "./sections/blog/BlogDetail.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import PageDetail from "./pages/PageDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/everest" element={<Everest />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/package/:slug" element={<TripDetail />} />
            <Route path="/pagedetail/:slug" element={<PageDetail />} />
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
