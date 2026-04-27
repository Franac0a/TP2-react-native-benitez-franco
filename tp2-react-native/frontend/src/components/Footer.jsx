// export const Footer = () => {
//   const year = new Date().getFullYear();

//   return (
//     <footer className="bg-light text-center py-3 border-top fixed-bottom w-100">
//       <div className="container">
//         <p className="mb-1">
//           © {year} | Desarrollado por{" "}
//           <span className="fw-semibold">Benitez Franco Miguel</span>
//         </p>
//         <p className="text-muted mb-0">Todos los derechos reservados.</p>
//       </div>
//     </footer>
//   );
// };
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 p-4 mt-8 border-t border-gray-200 text-center text-sm text-gray-600">
      <p className="mb-1">
        &copy; {year}{" "}
        <span className="font-semibold">Martínez Javier Nicolás</span>
      </p>
      <p className="">TLP 2</p>
    </footer>
  );
};
