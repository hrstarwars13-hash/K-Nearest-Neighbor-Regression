// K-Nearest Neighbor Regression Demo
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const kSelect = document.getElementById('k');
const classifyBtn = document.getElementById('classify');
const resetBtn = document.getElementById('reset');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const POINT_RADIUS = 7;
const UNKNOWN_RADIUS = 10;
const N_POINTS = 20;

let points = [];
let unknown = null;
let neighbors = [];

function randomPoint() {
  return {
    x: Math.random() * (WIDTH - 60) + 30,
    y: Math.random() * (HEIGHT - 60) + 30,
    value: Math.random() * 100
  };
}

function reset() {
  points = Array.from({length: N_POINTS}, randomPoint);
  unknown = randomPoint();
  neighbors = [];
  draw();
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // Draw all points
  for (const p of points) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, POINT_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = '#007bff';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#222';
    ctx.font = '12px Arial';
    ctx.fillText(p.value.toFixed(1), p.x + 10, p.y - 10);
  }
  // Draw unknown point
  ctx.beginPath();
  ctx.arc(unknown.x, unknown.y, UNKNOWN_RADIUS, 0, 2 * Math.PI);
  ctx.fillStyle = '#ff4136';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#222';
  ctx.font = 'bold 14px Arial';
  ctx.fillText('?', unknown.x + 12, unknown.y + 5);
  // Draw lines to neighbors
  if (neighbors.length > 0) {
    ctx.strokeStyle = '#2ecc40';
    ctx.lineWidth = 2;
    for (const n of neighbors) {
      ctx.beginPath();
      ctx.moveTo(unknown.x, unknown.y);
      ctx.lineTo(n.x, n.y);
      ctx.stroke();
    }
    // Show regression value
    const avg = neighbors.reduce((sum, p) => sum + p.value, 0) / neighbors.length;
    ctx.fillStyle = '#2ecc40';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Regression: ' + avg.toFixed(2), unknown.x + 15, unknown.y + 30);
  }
}

function classify() {
  const k = parseInt(kSelect.value);
  neighbors = points.slice().sort((a, b) => {
    const da = (a.x - unknown.x) ** 2 + (a.y - unknown.y) ** 2;
    const db = (b.x - unknown.x) ** 2 + (b.y - unknown.y) ** 2;
    return da - db;
  }).slice(0, k);
  draw();
}

classifyBtn.onclick = classify;
resetBtn.onclick = reset;

reset();
