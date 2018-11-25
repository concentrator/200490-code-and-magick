'use strict';

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsData = {
  firstNames: firstNames,
  lastNames: lastNames,
  coatColors: coatColors,
  eyesColors: eyesColors
};
var WIZARDS_QUANTITY = 4;
var wizards = [];

var shuffleArray = function (a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var generateWizards = function (data, quantity) {
  var dataKeys = Object.keys(data);
  for (var i = 0; i < dataKeys.length; i++) {
    shuffleArray(data[dataKeys[i]]);
  }
  for (var j = 0; j < quantity; j++) {
    var randomWizard = {};
    if (Math.floor(Math.random() * 2) === 0) {
      randomWizard.name = data.firstNames[j] + ' ' + data.lastNames[j];
    } else {
      randomWizard.name = data.lastNames[j] + ' ' + data.firstNames[j];
    }
    randomWizard.coatColor = data.coatColors[j];
    randomWizard.eyesColor = data.eyesColors[j];
    wizards.push(randomWizard);
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var printWizards = function (data, quantity) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(renderWizard(data[i]));
  }
  similarListElement.appendChild(fragment);
};

userDialog.classList.remove('hidden');

generateWizards(wizardsData, WIZARDS_QUANTITY);

printWizards(wizards, WIZARDS_QUANTITY);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
