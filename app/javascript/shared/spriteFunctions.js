export function initSprite(context, x, y) {
  context.worm = context.physics.add.image(x, y, 'worm').setOrigin(0, 0).setScale(0.08);
  context.worm.setDepth(1);
  context.physics.world.enable(context.worm)
}


export function textSprite(context) {
  context.wormText = context.add.text(0, 0, '', { fontSize: '16px', fill: '#fff' });
  context.wormText.setOrigin(0.5);
  context.wormText.setDepth(2);
  context.wormText.setVisible(false);
}


