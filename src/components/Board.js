import { useEffect, useRef } from 'react';
import React from 'react';
import './board.css';
import { BallMovement } from '../utils/BallMovement';
import data from '../data';
import wallCollision from './wallCollision';
import Paddle from './Paddle';
import paddleCollision from '../utils/paddleCollision';
import Brick from './Brick';
import BrickCollision from '../utils/BrickCollision';
import Player from './player';
export default function Board({ playerName }) {
  const { ballObj, brickObj, player, paddleProps } = data;
  const canvasRef = useRef();
  let bricks = [];
  player.name = playerName;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Player Info
      Player(ctx, player, canvas);
      // Assign Bricks
      let newBrickSet = Brick(5, bricks, canvas, brickObj);

      if (newBrickSet && newBrickSet.length > 0) {
        /* eslint-disable */
        bricks = newBrickSet;
      }

      // Display Bricks
      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      // Brick collision
      for (let i = 0; i < bricks.length; i++) {
        let effect = BrickCollision(ballObj, bricks[i]);
        if (effect.hit && !bricks[i].broke) {
          player.score++;
          bricks[i].broke = true;
          if (effect.axis && effect.axis === 'X') {
            ballObj.dx *= -1;
          }
          if (effect.axis && effect.axis === 'Y') {
            ballObj.dy *= -1;
          }
        }
      }

      // lower wall collision,,,live lost
      if (ballObj.y + ballObj.rad >= canvas.height) {
        ballObj.y = paddleProps.y + ballObj.rad;
        ballObj.x = paddleProps.x + paddleProps.width / 2;
        player.lives--;
      }

      // Ball Movement
      BallMovement(ctx, ballObj);

      // wall collision
      wallCollision(canvas, ballObj);

      if (player.lives !== 0) {
        requestAnimationFrame(render);
      } else {
        alert('Game Over!');
      }

      // paddle for shots
      Paddle(ctx, canvas, paddleProps);

      // paddle Collision
      paddleCollision(paddleProps, ballObj);
    };
    render();
  }, [ballObj, paddleProps]);

  useEffect(
    () => {
      // Paddle arrow key movement
      function MovePaddle() {
        window.addEventListener('keydown', function (event) {
          event.preventDefault();
          if (event.keyCode === 39) {
            // right key
            paddleProps.x += paddleProps.dx;
          }
          if (event.keyCode === 37) {
            // left key
            paddleProps.x -= paddleProps.dx;
          }
        });
      }
      MovePaddle();
    },
    /* eslint-disable */
    [window.onkeydown, paddleProps]
  );

  return (
    <>
      <canvas
        onMouseMove={(event) =>
          (paddleProps.x =
            event.clientX -
            (window.innerWidth < 900 ? 10 : (window.innerWidth * 20) / 200) -
            paddleProps.width / 2 -
            10)
        }
        ref={canvasRef}
        id='canvas'
        width={window.innerWidth}
        height={'550px'}
      ></canvas>
    </>
  );
}
