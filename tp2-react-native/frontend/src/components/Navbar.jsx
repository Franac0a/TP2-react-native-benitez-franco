export const Navbar = ({ onNavigate }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid">
        <h1 className="navbar-brand fs-4 fw-bold">TP 2 INTEGRADOR</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <button
                onClick={() => onNavigate("home")}
                className="nav-link text-light btn btn-link border-0"
              >
                Inicio
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => onNavigate("tasks")}
                className="nav-link text-light btn btn-link border-0"
              >
                Tareas
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
