'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var wizardSetup = userDialog.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var fireBallWrap = userDialog.querySelector('.setup-fireball-wrap');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
  var form = userDialog.querySelector('.setup-wizard-form');

  var WIZARDS_QUANTITY = 4;

  var fireBallColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var coatColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var printWizards = function (data, quantity) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.printSimilarWizards = function () {
    similarListElement.innerHTML = '';
    var wizards = [];
    window.backend.load(function (response) {
      wizards = window.util.shuffleArray(response);
      printWizards(wizards, WIZARDS_QUANTITY);
    }, window.dialog.showErrorPopup);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var changeElemColor = function (elem, colors, inputSelector) {
    var color = colors[window.util.getRandomInt(0, colors.length)];
    if (elem.tagName.toLowerCase() === 'div') {
      elem.style.backgroundColor = color;
    } else {
      elem.style.fill = color;
    }
    var input = userDialog.querySelector(inputSelector);
    input.value = color;
  };

  wizardCoat.addEventListener('click', function (evt) {
    changeElemColor(evt.target, coatColors, 'input[name=coat-color]');
  });

  wizardEyes.addEventListener('click', function (evt) {
    changeElemColor(evt.target, eyesColors, 'input[name=eyes-color]');
  });

  fireBallWrap.addEventListener('click', function (evt) {
    changeElemColor(evt.target, fireBallColors, 'input[name=fireball-color]');
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), window.dialog.closeUserDialog, window.dialog.showErrorPopup);
    evt.preventDefault();
  });
})();
