import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Everest from "./pages/Everest.jsx";
import Blogs from "./pages/Blogs.jsx";
import MainLayout from "./layout/MainLayout.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import BlogDetail from "./sections/blog/BlogDetail.jsx";
import TripDetail from "./pages/TripDetail.jsx";
import PageDetail from "./pages/PageDetail.jsx";
import FAQ from "./sections/home/FAQ.jsx";
import ActivitiesDetail from "./sections/activities/activitiesdetail.jsx";
import DestinationDetail from "./sections/destination/DestinationDetail.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <div className="">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/everest" element={<Everest />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/package/:slug" element={<TripDetail />} />
            <Route path="/pagedetail/:slug" element={<PageDetail />} />
            <Route path="/activity/:slug" element={<ActivitiesDetail />} />
            <Route path="/destination/:slug" element={<DestinationDetail />} />
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
