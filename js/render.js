'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
  var similar = document.querySelector('.setup-similar');
  var similarList = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (data, quantity) {
    similarList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < quantity; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarList.appendChild(fragment);
    similar.classList.remove('hidden');
  };
})();
