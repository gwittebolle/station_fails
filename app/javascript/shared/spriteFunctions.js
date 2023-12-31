export function initSprite(context, x, y) {
  context.worm = context.physics.add.image(x, y, 'worm').setOrigin(0, 0).setScale(0.06);
  context.worm.setDepth(1);
  context.physics.world.enable(context.worm);
}

export function initShark(context, x, y, z) {
  context.shark = context.physics.add.image(x, y, 'shark').setOrigin(0, 0).setScale(0.4);
  context.shark.setDepth(1);

  // Store the initial position
  context.shark.initialX = x;
  context.shark.initialY = y;

  // Set up a tween to make the shark oscillate within a random 64-pixel range
  const randomX = Phaser.Math.RND.between(0, z);
  const randomY = Phaser.Math.RND.between(0, z);
  const randomSpeed = Phaser.Math.RND.between(1000, 3000);


  // Set up a tween to make the shark oscillate within a 64-pixel range
  context.tweens.add({
    targets: context.shark,
    x: x + randomX,
    y: y + randomY,
    ease: 'Linear',
    duration: randomSpeed,
    yoyo: true,
    repeat: -1,

  });
  return context.shark;
}

export function initXShark(context, x, y, z) {
  context.shark = context.physics.add.image(x, y, 'shark').setOrigin(0, 0).setScale(0.4);
  context.shark.setDepth(1);

  // Store the initial position
  context.shark.initialX = x;
  context.shark.initialY = y;

  // Set up a tween to make the shark oscillate within a random 64-pixel range
  const randomX = z
  const randomY = 0
  const randomSpeed = Phaser.Math.RND.between(1000, 3000);


  // Set up a tween to make the shark oscillate within a 64-pixel range
  context.tweens.add({
    targets: context.shark,
    x: x + randomX,
    y: y + randomY,
    ease: 'Linear',
    duration: randomSpeed,
    yoyo: true,
    repeat: -1,

  });
  return context.shark;
}

export function initYShark(context, x, y, z) {
  context.shark = context.physics.add.image(x, y, 'shark').setOrigin(0, 0).setScale(0.4);
  context.shark.setDepth(1);

  // Store the initial position
  context.shark.initialX = x;
  context.shark.initialY = y;

  // Set up a tween to make the shark oscillate within a random 64-pixel range
  const randomX = 0;
  const randomY = z
  const randomSpeed = Phaser.Math.RND.between(1000, 3000);


  // Set up a tween to make the shark oscillate within a 64-pixel range
  context.tweens.add({
    targets: context.shark,
    x: x + randomX,
    y: y + randomY,
    ease: 'Linear',
    duration: randomSpeed,
    yoyo: true,
    repeat: -1,

  });
  return context.shark;
}

export function textSprite(context) {
  context.wormText = context.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
  context.wormText.setOrigin(0.5);
  context.wormText.setDepth(2);
  context.wormText.setVisible(false);
}
