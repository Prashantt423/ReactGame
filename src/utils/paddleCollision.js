export default function paddleCollision(paddleProps, ballObj) {
  if (
    ballObj.x < paddleProps.x + paddleProps.width &&
    ballObj.x > paddleProps.x &&
    ballObj.y + ballObj.rad > paddleProps.y + paddleProps.height
  ) {
    // CHECK WHERE THE ballObj HIT THE paddleProps
    let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);

    // NORMALIZE THE VALUES
    collidePoint = collidePoint / (paddleProps.width / 2);

    // CALCULATE THE ANGLE OF THE ballObj
    let angle = (collidePoint * Math.PI) / 3;

    ballObj.dx = ballObj.speed * Math.sin(angle);
    ballObj.dy = -ballObj.speed * Math.cos(angle);
  }
}
