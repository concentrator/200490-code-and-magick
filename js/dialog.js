'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var dialogHandle = userDialog.querySelector('.upload');
  var userNameInput = userDialog.querySelector('.setup-user-name');
  var openSetupButton = document.querySelector('.setup-open');
  var closeSetupButton = userDialog.querySelector('.setup-close');
  var isUserDialogHidden = true;

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== userNameInput) {
      window.util.isEscEvent(evt, closeUserDialog);
    }
  };

  var onErrorPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeErrorPopup);
  };

  var closeErrorPopup = function () {
    var popup = document.querySelector('.error-popup');
    popup.remove();
    document.removeEventListener('keydown', onErrorPopupEscPress);
    if (!isUserDialogHidden) {
      document.addEventListener('keydown', onPopupEscPress);
    }
  };

  var openUserDialog = function () {
    window.printSimilarWizards();
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    isUserDialogHidden = false;
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    userDialog.removeAttribute('style');
    document.removeEventListener('keydown', onPopupEscPress);
    isUserDialogHidden = true;
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

  var showErrorPopup = function (error) {
    var errorPopup = document.createElement('div');
    errorPopup.classList.add('error-popup');
    errorPopup.innerHTML = '<p></p>';
    errorPopup.style.width = '300px';
    errorPopup.style.padding = '15px';
    errorPopup.style.position = 'fixed';
    errorPopup.style.top = '50%';
    errorPopup.style.left = '50%';
    errorPopup.style.marginLeft = '-165px';
    errorPopup.style.zIndex = '100';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.backgroundColor = '#c5c5c5';
    errorPopup.style.boxShadow = '5px 5px 10px 0 rgba(0,0,0,0.7)';
    errorPopup.style.color = 'red';
    errorPopup.innerText = error;
    document.body.appendChild(errorPopup);
    document.addEventListener('keydown', onErrorPopupEscPress, false);
    if (!isUserDialogHidden) {
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  window.dialog = {
    closeUserDialog: closeUserDialog,
    showErrorPopup: showErrorPopup
  };

})();
