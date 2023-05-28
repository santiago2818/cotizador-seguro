// Precios base por tipo de modelo y marca
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

// Porcentaje de descuento por año
const porcentajeDescuentoAnio = 3;

// Porcentaje de incremento por cobertura
const porcentajeCobertura = {
  premium: 1.5,
  medio: 1.2,
  basico: 1.1
};

function calcularSeguro() {
  const marcaModeloInput = document.getElementById("marca-modelo");
  const tipoModeloMarca = marcaModeloInput.value;
  const [tipoModelo, marca] = tipoModeloMarca.split("-");
  
  const anioInput = document.getElementById("anio");
  const anio = anioInput.value;

  const coberturaInput = document.getElementById("cobertura");
  const cobertura = coberturaInput.value;

  const precioBase = precios[tipoModelo][marca];
  const diferenciaAnio = new Date().getFullYear() - anio;
  const descuentoAnio = (diferenciaAnio * porcentajeDescuentoAnio * precioBase) / 100;
  const precioSinDescuento = precioBase - descuentoAnio;
  const precioConCobertura = precioSinDescuento * porcentajeCobertura[cobertura];
  const precioTotal = precioConCobertura.toFixed(2);

  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = `El costo total de tu seguro es de $${precioTotal}`;
}