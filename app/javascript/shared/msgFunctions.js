export function header(info, context) {
  console.log(info)
// Supprimez les textes existants s'ils existent déjà
if (context.nameText) {
  context.nameText.destroy();
}

if (context.levelText) {
  context.levelText.destroy();
}

if (context.foundText) {
  context.foundText.destroy();
}

if (context.employeesText) {
  context.employeesText.destroy();
}

context.nameText = context.add.text(10, 10, 'Projet ' + info.name, { fontSize: '25px', fill: '#fff' });
context.nameText.setDepth(2);
context.levelText = context.add.text(10, 40, 'Niveau ' + info.level, { fontSize: '20px', fill: '#1EDD88' });
context.levelText.setDepth(2);
context.foundText = context.add.text(10, 60, 'Fonds ' + info.project_funds + ' €', { fontSize: '20px', fill: '#1EDD88' });
context.foundText.setDepth(2);
context.employeesText = context.add.text(10, 80, 'Employé(s) : ' + info.project_employees, { fontSize: '20px', fill: '#1EDD88' });
context.employeesText.setDepth(2)
}

export function showWormText(context) {
  // Mettez à jour la position du texte en fonction de la position du ver
  context.wormText.setPosition(context.worm.x + 200, context.worm.y - 20);
  // Affichez le texte avec les coordonnées du ver
  context.wormText.setText(
    `Position du ver : (${context.worm.x.toFixed(2)}, ${context.worm.y.toFixed(2)})`
  );

  // Affichez le texte pendant 2 secondes
  context.wormText.setVisible(true);
  context.time.delayedCall(2000, () => {
    context.wormText.setVisible(false);
  });
}

export function bottomText(message, context) {

  // Vérifiez si le message est déjà affiché
  if (context.isMessageDisplayed) {
    return;
  }

  // Marquez le message comme affiché
  context.isMessageDisplayed = true;

  // Rectangle de message
  // Créez un groupe pour le texte et le rectangle
  context.displayGroup = context.add.group();

  // Créez le rectangle avec le fond noir et la bordure en pointillés
  const backgroundRect = context.add.rectangle(context.sys.game.config.width / 2, context.sys.game.config.height - 25, context.sys.game.config.width - 20, 50, 0x000000);
  backgroundRect.setStrokeStyle(2, 0xFFFFFF, 1);
  backgroundRect.setOrigin(0.5, 0.5);
  backgroundRect.setAlpha(0); // Masquez initialement le rectangle

  // Ajoutez le rectangle au groupe
  context.displayGroup.add(backgroundRect);

  // Créez le texte du message
  const msgText = context.add.text(context.sys.game.config.width / 2, context.sys.game.config.height - 25, message, { fontSize: '20px', fill: '#FFFFFF', wordWrap: { width: context.sys.game.config.width - 40 } });
  msgText.setOrigin(0.5, 0.5);
  msgText.setAlpha(0); // Masquez initialement le texte

  // Ajoutez le texte au groupe
  context.displayGroup.add(msgText);

  // Animation du fade in
  context.tweens.add({
    targets: context.displayGroup.getChildren(),
    alpha: 1,
    ease: 'Linear',
    duration: 30, // Durée de l'animation d'apparition
    onComplete: () => {
      // Animation du fade out après 2 secondes
      context.tweens.add({
        targets: context.displayGroup.getChildren(),
        alpha: 0,
        ease: 'Linear',
        delay: 1000, // Délai avant le début de l'animation de disparition
        onComplete: () => {
          // Réinitialisez la variable après la disparition du message, permet au ver de rebouger
          context.isMessageDisplayed = false;
          // Supprimez le groupe après la disparition
          context.displayGroup.destroy(true);
        },
      });
    }
  });

}
