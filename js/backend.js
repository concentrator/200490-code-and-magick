'use strict';
(function () {
  window.backend = {
    xhrResponseHandler: function (xhr, onLoad, onError) {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    },
    xhrErrorHanler: function (xhr, onError) {
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
    },
    xhrTimeoutHanler: function (xhr, onError, time) {
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = time;
    },
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        window.backend.xhrResponseHandler(xhr, onLoad, onError);
      });

      this.xhrErrorHanler(xhr, onError);
      this.xhrTimeoutHanler(xhr, onError, 1000);

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/code-and-magick/';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        window.backend.xhrResponseHandler(xhr, onLoad, onError);
      });

      this.xhrErrorHanler(xhr, onError);
      this.xhrTimeoutHanler(xhr, onError, 1000);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
