import { useEffect, useState } from "react";

export const HomePage = ({ taskRefreshKey, onNavigate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadHomeData = async () => {
    try {
      setLoading(true);

      const tasksResponse = await fetch("http://localhost:3000/api/tasks");

      if (tasksResponse.ok) {
        const tasksData = await tasksResponse.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : []),
        );
      }
    } catch (error) {
      console.error("Error loading Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [taskRefreshKey]);

  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = allTasks - completedTasks;

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light"
        style={{ minHeight: "100vh" }}
      >
        <span className="fs-4 text-secondary text-center">Cargando...</span>
      </div>
    );
  }

  return (
    <main className="bg-light p-4" style={{ minHeight: "100vh" }}>
      <div className="container bg-white p-5 shadow rounded">
        <h1 className="fs-2 fw-light text-secondary mb-4">
          Bienvenido a tu{" "}
          <span className="fw-bold text-primary">Lista de Tareas</span>
        </h1>

        <div className="row g-4 border-top border-bottom py-4">
          <div
            className="col-md-3"
            onClick={() => onNavigate("tasks", "all")}
            style={{ cursor: "pointer" }}
          >
            <div className="p-3 bg-primary bg-opacity-10 border-start border-primary border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-primary">{allTasks}</h2>
              <p className="small text-secondary mt-1">Todas las Tareas</p>
            </div>
          </div>

          <div
            className="col-md-3"
            onClick={() => onNavigate("tasks", "completed")}
            style={{ cursor: "pointer" }}
          >
            <div className="p-3 bg-success bg-opacity-10 border-start border-success border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-success">{completedTasks}</h2>
              <p className="small text-secondary mt-1">Completadas</p>
            </div>
          </div>

          <div
            className="col-md-3"
            onClick={() => onNavigate("tasks", "pending")}
            style={{ cursor: "pointer" }}
          >
            <div className="p-3 bg-warning bg-opacity-10 border-start border-warning border-3 text-center rounded shadow-sm">
              <h2 className="fw-bold text-warning">{pendingTasks}</h2>
              <p className="small text-secondary mt-1">Pendientes</p>
            </div>
          </div>

          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <button
              onClick={() => onNavigate("tasks")}
              className="btn btn-primary w-100 fw-bold py-2"
            >
              Ir a las tareas
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
