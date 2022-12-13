const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let cw = window.innerWidth;
let ch = window.innerHeight;

canvas.width = cw;
canvas.height = ch;

let cascadaArray = [];
let conteo = 200;
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
      gradient.addColorStop(0.8, 'blue');
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
