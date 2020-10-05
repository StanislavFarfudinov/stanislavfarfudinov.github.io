$(document).ready(function () {

    ymaps.ready(init);
    var myMap;
    
    function init () {
        myMap = new ymaps.Map("map", {
            center: [57.5262, 38.3061], // Углич
            zoom: 11
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });
    
        // Обработка события, возникающего при щелчке
        // левой кнопкой мыши в любой точке карты.
        // При возникновении такого события откроем балун.
        myMap.events.add('click', function (e) {
            if (!myMap.balloon.isOpen()) {
                var coords = e.get('coords');
                console.log(coords);
               /* myMap.balloon.open(coords, {
                    contentHeader:'Событие!',
                    contentBody:'<p>Кто-то щелкнул по карте.</p>' +
                        '<p>Координаты щелчка: ' + [
                        coords[0].toPrecision(6),
                        coords[1].toPrecision(6)
                        ].join(', ') + '</p>',
                    contentFooter:'<sup>Щелкните еще раз</sup>'
                }); */
            }
            else {
                myMap.balloon.close();
            }
        });
    
        // Обработка события, возникающего при щелчке
        // правой кнопки мыши в любой точке карты.
        // При возникновении такого события покажем всплывающую подсказку
        // в точке щелчка.
        myMap.events.add('contextmenu', function (e) {
            myMap.hint.open(e.get('coords'), 'Кто-то щелкнул правой кнопкой');
        });
        
        // Скрываем хинт при открытии балуна.
        myMap.events.add('balloonopen', function (e) {
            myMap.hint.close();
        });
    }


  // Инициализация
  VK.init({
    apiId: 7506667
  });
 
  $('#vkLogin').on('click', function () {
 
    // Авторизация
    VK.Auth.login(
      // callback-функция, которая будет вызвана после авторизации
      function (response) {
 
        console.log(response);

 
        if (response.status === 'connected') { // авторизация прошла успешно

                var user = response.session.user; //  информация о пользователе

                console.log(user.id);
            /*
             user.first_name - имя;
             user.last_name - фамилия;
             user.href - ссылка на страницу в формате https://vk.com/domain;
             user.id  - идентификатор пользователя;
             user.nickname -  отчество или никнейм (если указано);
             */
            
 
        } else if (response.status === 'not_authorized') { // пользователь авторизован в ВКонтакте, но не разрешил доступ приложению;
 
        } else if (response.status === 'unknown') { // пользователь не авторизован ВКонтакте.
 
        }
 
      },
      // права доступа (integer)
      // допустимые значения:
      // AUDIO:8
      // FRIENDS:2
      // MATCHES:32
      // PHOTOS:4
      // QUESTIONS:64
      // VIDEO:16
      // WIKI:128
      VK.access.PHOTOS
    );
 
  });
 
  $('#vkUnLogin').on('click', function () {
 
    // Выход
    VK.Auth.logout(function (response) {
      console.log(response);
      // {session: null, status: "unknown", settings: undefined}
    });
 
  });
 
  $('#vkGetPhotos').on('click', function () {
 
    VK.Api.call(
      'photos.getAll', // название метода API https://vk.com/dev/methods
      // параметры:
      {
        v: '5.73', // версия API (обязательный параметр)
        count: 20, // количество фотографий
        //photo_sizes: 1,
      }, function (r) {
 
        var count = r.response.count; // кол-во полученных фотографий
        var items = r.response.items; // массив с фотографиями
        //console.log(items);
        //console.log(count);
        for(let i = 0; i < count-1; i++) {
            //console.log(items[i].photo_75, "4");
           // $("ul").append("<img src="+items[i].photo_75+">");
        }
      });
 
      VK.Api.call(
          'photos.search',
          {
              count: 100,
              lat: '30',
              long: '30',
              radius: '1000',
              v: '5.52',
          }, function(r) {
              let items = r.response.items;
              let count = r.response.count;
              
              for(let i = 0; i < count-1; i++) {
               
                console.log(items[i].photo_75, "5");
                $("ul").append("<img src="+items[i].photo_75+">");
            }

          }
      )

  });
});