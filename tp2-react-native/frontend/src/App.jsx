import { Footer } from "./components/Footer.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { useState } from "react";
import { HomePage } from "./pages/HomePage.jsx";
import { TasksPage } from "./pages/TaskPage.jsx";

export const App = () => {
  const [taskRefreshKey, setTaskRefreshKey] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");
  const [currentFilter, setCurrentFilter] = useState("all");

  const handleTaskChange = () => setTaskRefreshKey((prev) => prev + 1);

  const handleNavigate = (page, filter = "all") => {
    setCurrentPage(page);
    setCurrentFilter(filter);
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />

      {currentPage === "home" ? (
        <HomePage taskRefreshKey={taskRefreshKey} onNavigate={handleNavigate} />
      ) : (
        <TasksPage
          onTasksChange={handleTaskChange}
          initialFilter={currentFilter}
        />
      )}

      <Footer />
    </>
  );
};
