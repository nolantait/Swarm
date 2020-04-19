Crafty.scene('main', () => {
  Crafty.background('#eee');

  const viewport = Crafty.viewport.rect();

  // Top edge
  Crafty.e('2D, Collision, Solid').attr({
    x: 0,
    y: 0,
    w: viewport._w,
    h: 10,
  });

  // Bottom edge
  Crafty.e('2D, Collision, Solid').attr({
    x: 0,
    y: viewport._h,
    w: viewport._w,
    h: 1,
  });

  // Left edge
  Crafty.e('2D, Collision, Solid').attr({
    x: 0,
    y: 0,
    w: 1,
    h: viewport._h,
  });

  // Right edge
  Crafty.e('2D, Collision, Solid').attr({
    x: viewport._w,
    y: 0,
    w: 1,
    h: viewport._h,
  });
});
