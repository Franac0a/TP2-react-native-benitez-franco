export const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <div
      className={`p-3 rounded shadow-sm border-start ${
        task.is_completed ? "border-success opacity-75" : "border-primary"
      }`}
    >
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="flex-grow-1">
          <h3
            className={`fs-5 fw-semibold ${
              task.is_completed
                ? "text-muted text-decoration-line-through"
                : "text-dark"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-muted small mb-2">
            {task.description || "Sin descripción"}
          </p>
          <span
            className={`badge ${
              task.is_completed
                ? "bg-success bg-opacity-25 text-success"
                : "bg-primary bg-opacity-25 text-primary"
            }`}
          >
            {task.is_completed ? "COMPLETADA" : "PENDIENTE"}
          </span>
        </div>

        <div className="d-flex gap-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="btn btn-sm btn-outline-primary"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-sm btn-outline-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
