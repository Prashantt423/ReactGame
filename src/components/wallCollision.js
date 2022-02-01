export default function wallCollision(canvas, ballObj) {
  if (
    ballObj.y + ballObj.rad >= canvas.height ||
    ballObj.y - ballObj.rad <= 0
  ) {
    ballObj.dy *= -1;
  }
  if (ballObj.x + ballObj.rad >= canvas.width || ballObj.x - ballObj.rad <= 0) {
    ballObj.dx *= -1;
  }
}
