function calcularSeguro() {
    const marcaModelo = document.getElementById("marca-modelo").value;
    const anio = document.getElementById("anio").value;
    const cobertura = document.getElementById("cobertura").value;
    
    let precio;
    
    switch (marcaModelo) {
      case "americano":
        precio = 30000;
        break;
      case "europeo":
        precio = 40000;
        break;
      case "japones":
        precio = 20000;
        break;
    }
    
    const diferenciaAnio = new Date().getFullYear() - anio;
    
    precio -= ((diferenciaAnio * 3) * precio) / 100;
    
    switch (cobertura) {
      case "premium":
        precio *= 1.5;
        break;
      case "medio":
        precio *= 1.2;
        break;
      case "basico":
        precio *= 1.1;
        break;
    }
    
    const resultadoElement = document.getElementById("resultado");
    
    resultadoElement.innerHTML = `El costo total de tu seguro es de $${precio.toFixed(2)}`;
  }
  