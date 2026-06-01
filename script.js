//Este guarda todas las preguntas del quiz.
// Cada elemento es un objeto con: pregunta, opciones y respuesta correcta.
const preguntas = [
  {
    pregunta: 'Que significa "Hello"?',
    opciones: ["Hola", "Buenas noches", "Bienvenido"],
    respuesta: "Hola"
  },
  {
    pregunta: 'Cuando usamos "Good night"?',
    opciones: ["Para saludar en la tarde", "Para despedirse en la noche",  "Para recibir a una persona"],
    respuesta: "Para despedirse en la noche"
  },
  {
    pregunta: 'Que significa "Welcome"?',
    opciones: ["Visitado", "Sin embargo", "Bienvenido"],
    respuesta: "Bienvenido"
  },
  {
    pregunta: "Para que se usa el simple past?",
    opciones: ["Para hablar de acciones del pasado", "Para comparar dos cosas", "Para contar lo que otra persona dijo"],
    respuesta: "Para hablar de acciones del pasado"
  },
  {
    pregunta: 'Que significa "Should"?',
    opciones: ["Deberia", "Despertarse", "Mas grande"],
    respuesta: "Deberia"
  },
  {
    pregunta: "Para que se usan los comparatives?",
    opciones: ["Para hablar de experiencias completadas", "Para saludar a alguien", "Para comparar dos cosas"],
    respuesta: "Para comparar dos cosas"
  },
  {
    pregunta: 'Que significa "Wake up"?',
    opciones: ["He terminado", "Buenas tardes", "Despertarse"],
    respuesta: "Despertarse"
  },
  {
    pregunta: "Para que se usa el future perfect?",
    opciones: ["Para acciones que estaran completadas en el futuro", "Para acciones que ocurrieron en el pasado", "Para recibir a una persona"],
    respuesta: "Para acciones que estaran completadas en el futuro"
  },
  {
    pregunta: "Para que se usa la passive voice?",
    opciones: ["Para comparar dos cosas", "Cuando la accion es mas importante que quien la realiza", "Para dar consejos"],
    respuesta: "Cuando la accion es mas importante que quien la realiza"
  },
  {
    pregunta: 'Que significa "However"?',
    opciones: ["Sin embargo", "Por lo tanto", "No obstante"],
    respuesta: "Sin embargo"
  }
];
// document.querySelector busca un elemento del HTML usando su id, clase o etiqueta.
// Aqui guardamos elementos en variables para poder cambiar su texto o estilo despues.
const pregunta = document.querySelector("#pregunta");
const mensaje = document.querySelector("#mensaje");
const contador = document.querySelector("#contador");
const siguiente = document.querySelector("#siguiente");
// querySelectorAll busca varios elementos. En este caso toma los 3 botones con class="opcion".
const botones = document.querySelectorAll(".opcion");
// let se usa cuando el valor puede cambiar durante el juego.
// numeroPregunta empieza en 0 
let numeroPregunta = 0;
let puntos = 0;
// Esta funcion carga en pantalla la pregunta actual.
// Tambien limpia el mensaje anterior y vuelve a activar los botones
function mostrarPregunta() {
  const actual = preguntas[numeroPregunta];
  // textContent cambia el texto visible de un elemento HTML
  pregunta.textContent = actual.pregunta;
  mensaje.textContent = "";
  contador.textContent = "Pregunta " + (numeroPregunta + 1) + " de " + preguntas.length + " | Puntos: " + puntos;
  // forEach recorre todos los botones de respuesta uno por uno
  // posicion vale 0, 1 y 2 para tomar cada opcion 
  botones.forEach(function (boton, posicion) {
    boton.textContent = actual.opciones[posicion];
    boton.disabled = false;
  });
}
// Esta funcion revisa la respuesta que eligio el usuario.
// El parametro evento trae informacion del clic, por ejemplo que boton fue presionado por el usuario.
function revisarRespuesta(evento) {
  const botonSeleccionado = evento.target;
  const respuestaUsuario = botonSeleccionado.textContent;
  const respuestaCorrecta = preguntas[numeroPregunta].respuesta;
  // Desactivamos los botones para que el usuario no responda dos veces la misma pregunta.
  botones.forEach(function (boton) {
    boton.disabled = true;
  });
  // if compara la respuesta del usuario con la respuesta correcta.
  // Si son iguales, suma un punto; si no, muestra cual era la correcta.
  if (respuestaUsuario === respuestaCorrecta) {
    mensaje.textContent = "Respuesta correcta";
    puntos = puntos + 1;
  } else {
    mensaje.textContent = "Respuesta incorrecta. La respuesta era: " + respuestaCorrecta;
  }
  contador.textContent = "Pregunta " + (numeroPregunta + 1) + " de " + preguntas.length + " | Puntos: " + puntos;
}
// addEventListener hace que algo pase cuando ocurre una accion.
// Aqui cada boton revisa la respuesta cuando el usuario le da clic.
botones.forEach(function (boton) {
  boton.addEventListener("click", revisarRespuesta);
});
// Este evento se ejecuta cuando el usuario toca el boton Siguiente.
siguiente.addEventListener("click", function () {
  numeroPregunta = numeroPregunta + 1;
  // Si todavia hay preguntas, muestra la siguiente.
  // Si ya no hay, muestra el resultado final y esconde los botones.
  if (numeroPregunta < preguntas.length) {
    mostrarPregunta();
  } else {
    pregunta.textContent = "Practica terminada";
    mensaje.textContent = "Tu punteo final es: " + puntos + " de " + preguntas.length;
    contador.textContent = "";
    siguiente.disabled = true;

    botones.forEach(function (boton) {
      boton.style.display = "none";
    });
  }
});

// Esta linea inicia el quiz cuando se abre Practica.html.
mostrarPregunta();