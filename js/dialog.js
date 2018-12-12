'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = userDialog.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== userNameInput) {
      window.util.isEscEvent(evt, closeUserDialog);
    }
  };

  var openUserDialog = function () {
    window.printSimilarWizards();
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    userDialog.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  openSetupButton.addEventListener('click', openUserDialog);

  openSetupButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openUserDialog);
  });

  closeSetupButton.addEventListener('click', closeUserDialog);
  closeSetupButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeUserDialog);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
