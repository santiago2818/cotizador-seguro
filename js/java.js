const precios = {
  americano: {
    chevrolet: 30000,
    ford: 32000,
    dodge: 28000
  },
  europeo: {
    audi: 40000,
    volkswagen: 38000,
    porsche: 50000
  },
  japones: {
    mitsubishi: 20000,
    mazda: 22000,
    toyota: 19000
  }
};

const porcentajeDescuentoAnio = 3;

const porcentajeCobertura = {
  premium: 1.5,
  medio: 1.2,
  basico: 1.1
};

function obtenerValorElemento(id) {
  return document.getElementById(id).value;
}

function mostrarResultado(resultado) {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = resultado;
}

function guardarSeleccionUsuario(seleccionUsuario) {
  localStorage.setItem("seleccionUsuario", JSON.stringify(seleccionUsuario));
}

function cargarSeleccionUsuario() {
  const seleccionGuardada = localStorage.getItem("seleccionUsuario");
  if (seleccionGuardada) {
    const { tipoModelo, marca, anio, cobertura } = JSON.parse(seleccionGuardada);
    document.getElementById("marca-modelo").value = `${tipoModelo}-${marca}`;
    document.getElementById("anio").value = anio;
    document.getElementById("cobertura").value = cobertura;
  }
}

function calcularDescuentoAnio(diferenciaAnio, precioBase) {
  return (diferenciaAnio * porcentajeDescuentoAnio * precioBase) / 100;
}

function validarSeleccion(tipoModelo, marca, anio, cobertura) {
  if (!tipoModelo || !marca || !anio || !cobertura) {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const parsedAnio = parseInt(anio);
  if (isNaN(parsedAnio) || parsedAnio < 1900 || parsedAnio > currentYear) {
    return false;
  }

  return true;
}

function calcularSeguro(event) {
  event.preventDefault();

  const tipoModeloMarca = obtenerValorElemento("marca-modelo");
  const [tipoModelo, marca] = tipoModeloMarca.split("-");

  const anio = obtenerValorElemento("anio");
  const cobertura = obtenerValorElemento("cobertura");

  if (!validarSeleccion(tipoModelo, marca, anio, cobertura)) {
    mostrarResultado("Por favor, selecciona todas las opciones válidas.");
    return;
  }

  const precioBase = precios[tipoModelo][marca];
  const diferenciaAnio = new Date().getFullYear() - anio;
  const descuentoAnio = calcularDescuentoAnio(diferenciaAnio, precioBase);
  const precioSinDescuento = precioBase - descuentoAnio;
  const precioConCobertura = precioSinDescuento * porcentajeCobertura[cobertura];
  const precioTotal = precioConCobertura.toFixed(2);

  const resultado = `El costo total de tu poliza es de $${precioTotal}`;
  mostrarResultado(resultado);

  const seleccionUsuario = {
    tipoModelo,
    marca,
    anio,
    cobertura
  };
  guardarSeleccionUsuario(seleccionUsuario);
}

window.addEventListener("load", cargarSeleccionUsuario);

const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", calcularSeguro);
