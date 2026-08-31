import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Everest from "./pages/Everest.jsx";
import Blogs from "./pages/Blogs.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import PackageDetail from "./pages/PackageDetail.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BlogDetail from "./sections/blog/BlogDetail.jsx";
import TripDetail from "./pages/TripDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="overflow-x-hidden">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/everest" element={<Everest />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/package/:slug" element={<TripDetail />} />
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
