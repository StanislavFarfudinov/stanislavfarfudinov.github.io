$(document).ready(function () {

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


    ymaps.ready(init);
    var myMap;
    
    function init () {
        myMap = new ymaps.Map("map", {
            center: [57.5262, 38.3061], // Углич
            zoom: 11,
            controls: ['zoomControl'],
        }, {
            searchControlProvider: 'yandex#search'
        });
    
        // Обработка события, возникающего при щелчке
        // левой кнопкой мыши в любой точке карты.
        myMap.events.add('click', function (e) {
            let items = null; //обнуляем список
            $(".block-photo").empty();
                var coords = e.get('coords'); //получаем координаты
                //Open Balloon
                myMap.balloon.open(coords, {
                  contentHeader:'<p>Координаты - ' + [
                      coords[0].toPrecision(6),
                      coords[1].toPrecision(6)
                      ].join(', ') + '</p>',
                 // contentFooter:'<sup>Щелкните еще раз</sup>'
              });
                //обрщаемся к ВК МЕТОДУ
                VK.Api.call(
                  'photos.search',
                  {
                      count: 20,
                      lat: coords[0].toPrecision(6),
                      long: coords[1].toPrecision(6),
                      radius: '50',
                      v: '5.52',
                  }, function(r) { 
                    items = r.response.items;
                    let count = r.response.count;
                    $("#count").text(count);
                    $("#len").text(items.length);                         
                    for(let i = 0; i < items.length; i++) {
                     console.log(items[i].owner_id);
                     VK.Api.call(
                      'users.get',
                      {
                        user_ids: items[i].owner_id,
                        v: '5.52',
                      }, function(res_user) {
                        try { if(res_user.response.length === 1) console.log('true', res_user.response[i].first_name); }
                        catch(e) { console.log("Err serv."); }
                      try {
                      $(".block-photo").append("<div class='photo'><a href="+items[i].photo_1280+" target='_blank'><img src="+items[i].photo_130+"></a></div>");
                      } catch(e) {
                        console.log(e.message, e.name, e.stack);
                        $(".block-photo").append("<div class='photo'><p>Ссылка не найдена :(</p></div>");

                      }
                      })
                  }

                  console.log(r);
                  }
                );

        });
    
    }


})