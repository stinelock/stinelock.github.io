import { Routes, Route, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NavBar from "./compotents/NavBar";
import Footer from "./compotents/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

function HomePageWrapper() {
  const location = useLocation();
  const scrollTo = location.state?.scrollTo;

  return <HomePage scrollTo={scrollTo} />;
}
