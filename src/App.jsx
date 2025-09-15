import { Routes, Route, Router, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import PlaygroundPage from "./pages/PlaygroundPage";
import ContactPage from "./pages/ContactPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NavBar from "./compotents/NavBar";
import Footer from "./compotents/Footer";
import ScrollToTop from "./compotents/ScrollToTop";

function App() {
  return (
    <>
    <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePageWrapper />} />
        <Route path="/legeplads" element={<PlaygroundPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
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
