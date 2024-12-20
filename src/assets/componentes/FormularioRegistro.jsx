import React, { useState } from "react";
import "./../estilos/FormularioRegistro.css";

function FormularioRegistro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [materias, setMaterias] = useState([{ nombre: "", fecha: "" }]);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const agregarMateria = () => {
    setMaterias([...materias, { nombre: "", fecha: "" }]);
  };

  const manejarCambioMateria = (index, campo, valor) => {
    const nuevasMaterias = [...materias];
    nuevasMaterias[index][campo] = valor;
    setMaterias(nuevasMaterias);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre || !correo || materias.some((m) => !m.nombre || !m.fecha)) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
    setMensajeEnviado(true);
  };

  return (
    <div className="formulario-registro">
      {!mensajeEnviado ? (
        <form onSubmit={manejarEnvio}>
          <h2>Registro de Datos Personales</h2>

          <div className="campo">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <h3>Materias cursadas</h3>
          {materias.map((materia, index) => (
            <div key={index} className="materia">
              <div className="campo">
                <label htmlFor={`materia-${index}`}>Materia:</label>
                <input
                  type="text"
                  id={`materia-${index}`}
                  value={materia.nombre}
                  onChange={(e) =>
                    manejarCambioMateria(index, "nombre", e.target.value)
                  }
                />
              </div>
              <div className="campo">
                <label htmlFor={`fecha-${index}`}>Fecha de cursado:</label>
                <input
                  type="date"
                  id={`fecha-${index}`}
                  value={materia.fecha}
                  onChange={(e) =>
                    manejarCambioMateria(index, "fecha", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button type="button" onClick={agregarMateria} className="boton-agregar">
            Agregar otra materia
          </button>

          <button type="submit" className="boton-enviar">
            Enviar
          </button>
        </form>
      ) : (
        <div className="mensaje">
          <h2>Gracias, {nombre}, por tu registro.</h2>
          <p>Resumen de materias cursadas:</p>
          <ul>
            {materias.map((materia, index) => (
              <li key={index}>
                {materia.nombre} - {materia.fecha}
              </li>
            ))}
          </ul>
          <p>¡Te contactaremos pronto!</p>
        </div>
      )}
    </div>
  );
}

export default FormularioRegistro;
