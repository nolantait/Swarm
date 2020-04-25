export function orientTo(initial, target, maxSpeed) {
  const initialVector = new Crafty.math.Vector2D(
    initial.x,
    initial.y,
  );
  const targetVector = new Crafty.math.Vector2D(
    target.x,
    target.y,
  );

  const subVector = targetVector.subtract(initialVector).scaleToMagnitude(2);
  const velocity = initial.velocity();
  velocity.x = Crafty.math.clamp((velocity.x + subVector.x), -maxSpeed, maxSpeed);
  velocity.y = Crafty.math.clamp((velocity.y + subVector.y), -maxSpeed, maxSpeed);
}

export function probability(n) {
  return Math.random() < n;
}

export default orientTo;
