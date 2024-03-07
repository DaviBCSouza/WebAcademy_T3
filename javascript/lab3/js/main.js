// Inicializando o canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// Função para gerar um número aleatório
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// Função para gerar uma intensidade aleatória para cada componente de cor
function randomIntensity(color, maxVariation) {
  const intensity = random(-maxVariation, maxVariation); // Variação da intensidade limitada
  return Math.max(0, Math.min(255, color + intensity));
}

// Função para garantir que o valor esteja dentro do intervalo [0, 255]
function clamp(value) {
  return Math.max(0, Math.min(255, value));
}

// Mapeamento de cores comuns para cores RGB
const colorMap = {
  black: [0, 0, 0],
  blue: [0, 0, 255],
  brown: [165, 42, 42],
  cyan: [0, 255, 255],
  gray: [128, 128, 128],
  green: [0, 255, 0],
  lime: [0, 255, 0],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  navy: [0, 0, 128],
  orange: [255, 165, 0],
  pink: [255, 192, 203],
  purple: [128, 0, 128],
  red: [255, 0, 0],
  turquoise: [64, 224, 208],
  white: [255, 255, 255],
  yellow: [255, 255, 0],
};

let themeColor;

// Pedindo ao usuário a cor tema
let userColor;
do {
  userColor = prompt("Digite uma cor tema (em inglês):").toLowerCase();
  if (!(userColor in colorMap)) {
    alert("Cor não reconhecida. Por favor, digite outra cor.");
  }
} while (!(userColor in colorMap));

themeColor = colorMap[userColor];

// Definições da classe Shape
function Shape(x, y, velX, velY, color, size, shapeType) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  this.shapeType = shapeType;
}

// Função para desenhar a forma geométrica
Shape.prototype.draw = function () {
  ctx.beginPath();
  ctx.fillStyle = this.color;

  if (this.shapeType === "circle") {
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  } else if (this.shapeType === "square") {
    ctx.rect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );
  } else if (this.shapeType === "hexagon") {
    const numberOfSides = 6;
    const angle = (Math.PI * 2) / numberOfSides;
    ctx.moveTo(
      this.x + this.size * Math.cos(0),
      this.y + this.size * Math.sin(0)
    );

    for (let i = 1; i <= numberOfSides; i++) {
      ctx.lineTo(
        this.x + this.size * Math.cos(angle * i),
        this.y + this.size * Math.sin(angle * i)
      );
    }
  }

  ctx.fill();
};

// Função para verificação se a forma chegou na borda da tela
Shape.prototype.update = function () {
  if (this.x + this.size >= width || this.x - this.size <= 0) {
    this.velX = -this.velX;
  }

  if (this.y + this.size >= height || this.y - this.size <= 0) {
    this.velY = -this.velY;
  }

  this.x += this.velX;
  this.y += this.velY;
};

// Função para desenhar uma forma com cor e tamanhos especificados
function drawShape(x, y, color, size, shapeType) {
  ctx.beginPath();
  ctx.fillStyle = color;

  if (shapeType === "circle") {
    ctx.arc(x, y, size, 0, 2 * Math.PI);
  } else if (shapeType === "square") {
    ctx.rect(x - size, y - size, size * 2, size * 2);
  } else if (shapeType === "hexagon") {
    const numberOfSides = 6;
    const angle = (Math.PI * 2) / numberOfSides;
    ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let i = 1; i <= numberOfSides; i++) {
      ctx.lineTo(
        x + size * Math.cos(angle * i),
        y + size * Math.sin(angle * i)
      );
    }
  }

  ctx.fill();
}

// Função de detectação de colisão
Shape.prototype.collisionDetect = function () {
  for (const element of shapes) {
    if (this !== element) {
      const dx = this.x - element.x;
      const dy = this.y - element.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + element.size) {
        const shineColor = "rgba(255, 255, 255, 0.15)"; // Cor do brilho

        if (this.shapeType === "circle" && element.shapeType === "circle") {
          drawShape(this.x, this.y, shineColor, this.size + 10, "circle"); // Desenhar o brilho ao redor do círculo
        } else if (
          this.shapeType === "square" &&
          element.shapeType === "square"
        ) {
          drawShape(this.x, this.y, shineColor, this.size + 10, "square"); // Desenhar o brilho ao redor do quadrado
        } else if (
          this.shapeType === "hexagon" &&
          element.shapeType === "hexagon"
        ) {
          drawShape(this.x, this.y, shineColor, this.size + 10, "hexagon"); // Desenhar o brilho ao redor do hexágono
        }

        element.color = this.color;
      }
    }
  }
};

let shapes = [];

// Adicionando círculos
while (shapes.length < 10) {
  let size = random(10, 20);
  let ball = new Shape(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    "rgb(0, 0, 0)",
    size,
    "circle"
  );

  shapes.push(ball);
}

// Adicionando quadrados
while (shapes.length < 20) {
  let size = random(10, 20);
  let square = new Shape(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    "rgb(0, 0, 0)",
    size,
    "square"
  );

  shapes.push(square);
}

// Adicionando hexágonos
while (shapes.length < 30) {
  let size = random(10, 20);
  let hexagon = new Shape(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7),
    random(-7, 7),
    "rgb(0, 0, 0)",
    size,
    "hexagon"
  );

  shapes.push(hexagon);
}

// Atualizando a cor tema das formas
const redIntensity = themeColor[0];
const greenIntensity = themeColor[1];
const blueIntensity = themeColor[2];

let maxVariation = 50; // Variação padrão para outras cores
if (userColor === "black" || userColor === "gray" || userColor === "white") {
  maxVariation = 5; // Variação limitada para "black", "gray" e "white"
}

if (userColor === "red" || userColor === "blue" || userColor === "green") {
  maxVariation = 100; // Variação limitada para "red", "blue" e "green"
}

for (const element of shapes) {
  const red = randomIntensity(redIntensity, maxVariation);
  const green = randomIntensity(greenIntensity, maxVariation);
  const blue = randomIntensity(blueIntensity, maxVariation);
  element.color = `rgb(${red}, ${green}, ${blue})`;
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const element of shapes) {
    element.draw();
    element.update();
    element.collisionDetect();
  }

  // Chama recursivamente a função loop para o próximo quadro da animação
  requestAnimationFrame(loop);
}

// Inicia a animação chamando a função loop
loop();
