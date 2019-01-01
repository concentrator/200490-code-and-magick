'use strict';

(function () {

  var userDialog = document.querySelector('.setup');

  var form = userDialog.querySelector('.setup-wizard-form');

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), window.dialog.closeUserDialog, window.dialog.showErrorPopup);
    evt.preventDefault();
  });

})();
