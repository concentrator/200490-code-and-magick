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

  var WIZARDS_QUANTITY = 4;

  var fireBallColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

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

  var generateWizards = function (data, quantity) {
    var wizards = [];
    var dataKeys = Object.keys(data);
    for (var i = 0; i < dataKeys.length; i++) {
      window.util.shuffleArray(data[dataKeys[i]]);
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
    return wizards;
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

  window.printSimilarWizards = function () {
    var wizards = generateWizards(wizardsData, WIZARDS_QUANTITY);
    similarListElement.innerHTML = '';
    printWizards(wizards, WIZARDS_QUANTITY);
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
})();
