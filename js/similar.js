'use strict';

(function () {
  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var WIZARDS_QUANTITY = 4;
  var wizards = [];
  var eyesColor;
  var coatColor;
  var fireballColor;

  var userDialog = document.querySelector('.setup');
  var wizardSetup = userDialog.querySelector('.setup-wizard');
  var wizardCoat = wizardSetup.querySelector('.wizard-coat');
  var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
  var fireBallWrap = userDialog.querySelector('.setup-fireball-wrap');

  var getRank = function (wizard) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }), WIZARDS_QUANTITY);
  };

  wizardCoat.addEventListener('click', function (evt) {
    var newColor = window.util.getRandomElement(COAT_COLORS);
    evt.target.style.fill = newColor;
    coatColor = newColor;
    updateWizards();
  });

  wizardEyes.addEventListener('click', function (evt) {
    var newColor = window.util.getRandomElement(EYES_COLORS);
    evt.target.style.fill = newColor;
    eyesColor = newColor;
    updateWizards();
  });

  fireBallWrap.addEventListener('click', function (evt) {
    var newColor = window.util.getRandomElement(FIREBALL_COLORS);
    evt.target.style.backgroundColor = newColor;
    fireballColor = newColor;
    updateWizards();
  });

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  window.printSimilarWizards = function () {
    window.backend.load(successHandler, window.dialog.showErrorPopup);
  };

})();
