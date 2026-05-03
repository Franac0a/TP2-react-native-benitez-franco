import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm.js";
import { TaskItem } from "../components/TaskItem.jsx";

export const TasksPage = ({ onTasksChange, initialFilter = "all" }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const { formState, setForm, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  const [idEdit, setIdEdit] = useState(null);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const showMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : data.tasks || []);
      } else {
        setTasks([]);
      }
    } catch {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (idEdit) {
      await handleUpdateTask();
    } else {
      await handleCreateTask();
    }
  };

  const handleSelectEdit = (task) => {
    setIdEdit(task.id);
    setForm({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  const handleCanceleEdit = () => {
    setIdEdit(null);
    handleReset();
  };

  const handleCreateTask = async () => {
    if (!formState.title) {
      showMessage("El título es obligatorio", "danger");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        showMessage("La tarea fue creada exitosamente");
        handleReset();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        showMessage(data.message || "Error al crear la tarea", "danger");
      }
    } catch {
      showMessage("Error de conexión con el servidor", "danger");
    }
  };

  const handleUpdateTask = async () => {
    if (!formState.title) {
      showMessage("El título es obligatorio", "danger");
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        showMessage("La tarea fue actualizada exitosamente");
        handleCanceleEdit();
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        showMessage(data.message || "Error al actualizar la tarea", "danger");
      }
    } catch {
      showMessage("Error de conexión con el servidor", "danger");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta tarea?"))
      return;

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showMessage("La tarea fue eliminada exitosamente");
        await fetchTasks();
        onTasksChange && onTasksChange();
      } else {
        const data = await res.json();
        showMessage(data.message || "Error al eliminar la tarea", "danger");
      }
    } catch {
      showMessage("Error de conexión con el servidor", "danger");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed" && !task.is_completed) return false;
    if (filter === "pending" && task.is_completed) return false;

    if (!searchQuery.trim()) {
      return true;
    }

    const normalizedSearch = searchQuery.trim().toLowerCase();
    return (
      task.title.toLowerCase().includes(normalizedSearch) ||
      (task.description || "").toLowerCase().includes(normalizedSearch)
    );
  });

  return (
    <main className="bg-light p-4 p-md-5" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="row g-4">
          <section className="col-lg-4">
            <div
              className="bg-white p-4 rounded shadow position-sticky"
              style={{ top: "100px" }}
            >
              <h2
                className={`fs-4 fw-semibold mb-4 ${
                  idEdit ? "text-warning" : "text-primary"
                }`}
              >
                {idEdit ? "Editar" : "Crear"} Tarea
              </h2>

              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div>
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                    placeholder="Ejemplo: Comprar pan"
                    className="form-control"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    value={formState.description}
                    onChange={handleChange}
                    placeholder="Detalles"
                    rows="4"
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-check">
                  <input
                    type="checkbox"
                    id="is_completed"
                    name="is_completed"
                    checked={formState.is_completed}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="is_completed" className="form-check-label">
                    Marcar como completada
                  </label>
                </div>

                <button
                  type="submit"
                  className={`btn text-white fw-semibold ${
                    idEdit ? "btn-warning" : "btn-primary"
                  }`}
                >
                  {idEdit ? "Actualizar tarea" : "Guardar tarea"}
                </button>

                {idEdit && (
                  <button
                    type="button"
                    onClick={handleCanceleEdit}
                    className="btn btn-secondary"
                  >
                    Cancelar edición
                  </button>
                )}
              </form>
            </div>
          </section>

          <section className="col-lg-8">
            <div className="border-bottom pb-2 mb-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
                <h2 className="fs-4 fw-semibold text-dark mb-0">Mis Tareas</h2>

                <div className="btn-group shadow-sm">
                  <button
                    className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("all")}
                  >
                    Todas
                  </button>
                  <button
                    className={`btn btn-sm ${filter === "completed" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setFilter("completed")}
                  >
                    Completadas
                  </button>
                  <button
                    className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => setFilter("pending")}
                  >
                    Pendientes
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="searchQuery" className="form-label">
                  Buscar tareas
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Buscar por título o descripción"
                  className="form-control"
                />
              </div>
            </div>

            {loading && (
              <p className="text-secondary fw-semibold">Cargando tareas...</p>
            )}

            {!loading && filteredTasks.length === 0 && (
              <p className="p-3 bg-warning bg-opacity-25 text-warning rounded">
                No hay tareas para mostrar en esta sección.
              </p>
            )}

            {!loading && filteredTasks.length > 0 && (
              <div className="d-flex flex-column gap-3">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={handleSelectEdit}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Toast Notificaciones */}
        {toast.show && (
          <div
            className="toast-container position-fixed bottom-0 end-0 p-3"
            style={{ zIndex: 1050 }}
          >
            <div
              className={`toast show align-items-center text-bg-${toast.type} border-0 shadow-lg`}
              role="alert"
            >
              <div className="d-flex">
                <div className="toast-body fw-semibold">{toast.message}</div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  onClick={() =>
                    setToast({ show: false, message: "", type: "success" })
                  }
                ></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
