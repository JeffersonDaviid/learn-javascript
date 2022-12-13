let $formulario = document.getElementById('formulario');
const templateTodo = document.querySelector('.todo-template').content;

let listaTodo = [];

let fondos = [
   'https://www.xtrafondos.com/wallpapers/atardecer-morado-416.jpg',
   'https://www.xtrafondos.com/wallpapers/muele-de-madera-frente-al-mar-al-atardecer-9896.jpg',
   'https://www.xtrafondos.com/wallpapers/retrowave-puesta-del-sol-3062.jpg',
   'https://www.xtrafondos.com/wallpapers/platicas-al-atardecer-5182.jpg',
   'https://www.xtrafondos.com/wallpapers/bote-en-medio-del-mar-al-atardecer-8885.jpg',
   'https://www.xtrafondos.com/wallpapers/chica-anime-viendo-la-ciudad-10383.jpg',
   'https://www.xtrafondos.com/wallpapers/chica-con-guitarra-9035.jpg',
   'https://www.xtrafondos.com/wallpapers/chica-en-columpio-mirando-la-luna-7709.jpg',
   'https://www.xtrafondos.com/wallpapers/ninja-katana-sci-fi-city-neon-lights-5026.jpg',
   'https://www.xtrafondos.com/wallpapers/carretera-en-otono-6185.jpg',
   'https://www.xtrafondos.com/wallpapers/resoluciones/20/noche-con-estrellas_2560x1440_5155.jpg',
];

const numeroAleatorio = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1) + min);
};

const cambiarFondo = () => {
   const $body = document.querySelector('body');
   $body.style.backgroundImage = `url('${
      fondos[numeroAleatorio(0, fondos.length - 1)]
   }')`;
};

const agregarTodo = (todo) => {
   const objetoTodo = {
      nombre: todo,
      id: `${Date.now()}`,
   };
   listaTodo.push(objetoTodo);
};

function mostrarTask() {
   localStorage.setItem('tasks', JSON.stringify(listaTodo));

   // localStorage.clear();
   const $todoContainer = document.querySelector('.todo-list-container');

   $todoContainer.textContent = '';

   const fragment = document.createDocumentFragment();

   listaTodo.forEach((item) => {
      const clone = templateTodo.cloneNode(true);
      clone.querySelector('.todo').textContent = item.nombre;
      clone.querySelector('.btn-eliminar').dataset.id = item.id;

      fragment.appendChild(clone);
   });

   $todoContainer.appendChild(fragment);
}

$formulario.addEventListener('submit', (e) => {
   e.preventDefault();

   const data = new FormData($formulario);
   document.getElementById('input-user').value = '';
   const [listaTodo] = [...data.values()];
   if (!listaTodo.trim()) {
      alert('Hey amig@! No es posible dejar campos sin llenar :(');
      return;
   }
   agregarTodo(listaTodo);
   mostrarTask();
   //  cambiarFondo();
});

document.addEventListener('click', (e) => {
   if (e.target.dataset.id) {
      // 1 forma
      // if (e.target.matches(".btn-eliminar")) {
      //2 forma
      listaTodo = listaTodo.filter((item) => item.id !== e.target.dataset.id);
      mostrarTask();
   }
});

document.addEventListener('DOMContentLoaded', (e) => {
   if (localStorage.getItem('tasks')) {
      listaTodo = JSON.parse(localStorage.getItem('tasks'));
      mostrarTask();
   }
});

const sonido = document.getElementById('sonidos');
document.addEventListener('keypress', (e) => {
   let sonidoTecla = '<audio src="./src/tecla.ogg" autoplay></audio>';
   let sonidoEspacio = '<audio src="./src/espacio.ogg" autoplay></audio>';
   let sonidoEnter = '<audio src="./src/enter.mp3" autoplay></audio>';
   if (e.key === ' ') sonido.innerHTML = sonidoEspacio;
   else if (e.key === 'Enter') sonido.innerHTML = sonidoEnter;
   else sonido.innerHTML = sonidoTecla;
   // console.log(e.key);
});

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

let cascadaArray = [];
let conteo = 7;
let frame = 0;

class Cascada {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.direccionx = -2;
      this.peso = Math.random() * 1;
      this.size = Math.random() * 10 + 1;
      this.gradient = this.gradient();
   }
   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.gradient;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      this.x += this.direccionx;
      this.peso += 0.05;
      this.y += this.peso;

      if (this.y > ch) {
         this.x = Math.floor(Math.random() * cw) * 1.3;
         this.y = 0 - this.size;
         this.peso = Math.random() * 1;
      }
   }

   gradient() {
      let gradient = ctx.createLinearGradient(
         0,
         0,
         canvas.width,
         canvas.height
      );
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(0.2, 'yellow');
      gradient.addColorStop(0.4, 'green');
      gradient.addColorStop(0.6, 'cyan');
      gradient.addColorStop(0.8, 'lightblue');
      gradient.addColorStop(1, 'magenta');

      return gradient;
   }
}

let update = () => {
   if (cascadaArray.length < conteo) {
      let cascada = new Cascada(Math.floor(Math.random() * cw) * 1.3, 0);
      cascada.draw();
      cascadaArray.push(cascada);
   }
   for (let i = 0; i < cascadaArray.length; i++) {
      cascadaArray[i].draw();
   }

   ctx.fillStyle = 'rgba(0,0,0,0.05)';
   ctx.fillRect(0, 0, cw, ch);

   requestAnimationFrame(update);
   frame++;
};

update();
