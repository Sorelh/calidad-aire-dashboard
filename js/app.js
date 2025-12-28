// js/app.js

// =======================
// 1. Datos simulados
// =======================

const medicionActual = {
  temp: 24.5,
  hum: 55,
  iaq: 72,
  estado: "Moderada"
};

const configuracion = {
  intervaloSegundos: 60,
  rangoHoras: 24,
  umbralCritico: 100
};

const alertasRecientes = [
  {
    fecha: "2025-12-26 08:15",
    mensaje: "IAQ elevado en Laboratorio 1",
    nivel: "Advertencia"
  },
  {
    fecha: "2025-12-25 16:40",
    mensaje: "Calidad del aire crítica en Aula 203",
    nivel: "Crítica"
  }
];

const medicionesTabla = [
  { fecha: "2025-12-26 08:00", temp: 23.9, hum: 52, iaq: 65, estado: "Buena" },
  { fecha: "2025-12-26 07:30", temp: 23.5, hum: 50, iaq: 60, estado: "Buena" },
  { fecha: "2025-12-26 07:00", temp: 24.2, hum: 53, iaq: 70, estado: "Moderada" },
  { fecha: "2025-12-26 06:30", temp: 25.0, hum: 58, iaq: 85, estado: "Deficiente" }
];

// =======================
// 2. Inicialización
// =======================

document.addEventListener("DOMContentLoaded", () => {
  actualizarTarjetaEstadoActual(medicionActual);
  actualizarTarjetaConfiguracion(configuracion);
  pintarAlertas(alertasRecientes);
  pintarTablaMediciones(medicionesTabla);
});

// =======================
// 3. Funciones de UI
// =======================

function actualizarTarjetaEstadoActual(medicion) {
  const tempSpan = document.getElementById("temp-actual");
  const humSpan = document.getElementById("hum-actual");
  const iaqSpan = document.getElementById("iaq-actual");
  const tituloEstado = document.getElementById("estado-calidad");
  const badgeEstado = document.getElementById("etiqueta-estado");

  if (!tempSpan || !humSpan || !iaqSpan || !tituloEstado || !badgeEstado) {
    console.warn("Elementos de la tarjeta de estado actual no encontrados en el DOM.");
    return;
  }

  tempSpan.textContent = medicion.temp.toFixed(1);
  humSpan.textContent = medicion.hum.toFixed(0);
  iaqSpan.textContent = medicion.iaq;
  tituloEstado.textContent = medicion.estado;
  badgeEstado.textContent = medicion.estado;

  actualizarColorBadgeEstado(badgeEstado, medicion.estado);
}

function actualizarColorBadgeEstado(badge, estado) {
  badge.classList.remove("bg-secondary", "bg-success", "bg-warning", "bg-danger", "text-dark");

  if (estado === "Buena") {
    badge.classList.add("bg-success");
  } else if (estado === "Moderada") {
    badge.classList.add("bg-warning", "text-dark");
  } else {
    badge.classList.add("bg-danger");
  }
}

function actualizarTarjetaConfiguracion(cfg) {
  const intervalo = document.getElementById("config-intervalo");
  const rango = document.getElementById("config-rango");
  const umbral = document.getElementById("config-umbral");

  if (!intervalo || !rango || !umbral) {
    console.warn("Elementos de la tarjeta de configuración no encontrados en el DOM.");
    return;
  }

  intervalo.textContent = cfg.intervaloSegundos;
  rango.textContent = cfg.rangoHoras;
  umbral.textContent = cfg.umbralCritico;
}

function pintarAlertas(alertas) {
  const lista = document.getElementById("lista-alertas");

  if (!lista) {
    console.warn("Lista de alertas no encontrada en el DOM.");
    return;
  }

  lista.innerHTML = "";

  if (!alertas || alertas.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = "Sin alertas registradas.";
    lista.appendChild(li);
    return;
  }

  alertas.forEach(alerta => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";

    const contTexto = document.createElement("div");
    contTexto.innerHTML = `<strong>${alerta.fecha}</strong><br>${alerta.mensaje}`;

    const badge = document.createElement("span");
    badge.className = "badge rounded-pill";

    if (alerta.nivel === "Crítica") {
      badge.classList.add("bg-danger");
    } else if (alerta.nivel === "Advertencia") {
      badge.classList.add("bg-warning", "text-dark");
    } else {
      badge.classList.add("bg-secondary");
    }

    badge.textContent = alerta.nivel;

    li.appendChild(contTexto);
    li.appendChild(badge);
    lista.appendChild(li);
  });
}

function pintarTablaMediciones(mediciones) {
  const tbody = document.getElementById("tabla-mediciones");

  if (!tbody) {
    console.warn("Tabla de mediciones no encontrada en el DOM.");
    return;
  }

  tbody.innerHTML = "";

  if (!mediciones || mediciones.length === 0) {
    const filaVacia = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 5;
    celda.textContent = "No hay mediciones registradas.";
    filaVacia.appendChild(celda);
    tbody.appendChild(filaVacia);
    return;
  }

  mediciones.forEach(m => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${m.fecha}</td>
      <td>${m.temp.toFixed(1)}</td>
      <td>${m.hum.toFixed(0)}</td>
      <td>${m.iaq}</td>
      <td>${m.estado}</td>
    `;

    tbody.appendChild(fila);
  });
}
