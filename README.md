# Проект Movies Explorer
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

# Реализованные задачи:
- Проект адаптирован под различные разрешения экрана.
- Отзывчивая вёрстка, которая корректно тянется на всех промежуточных разрешениях.
- Отсутствуют ошибки валидации при сборке приложения или в валидаторе.
- В коде используется семантическая разметка: применяются семантические теги.
- Каркас макета реализован на Flex layout или Grid layout.
- Работа модальных окон настроена.
- Все формы валидируются и на стороне клиента.
- Работа с фильтром настроена. Если карточки уже были отображены на странице в блоке результатов, клик по чекбоксу «Короткометражки» приводит к повторной фильтрации результата. Запрос к API не выполняется повторно. Если запрос выполняется впервые, то работа с фильтром происходит после получения данных.
- Если пользователь закрыл вкладку, а после — вернулся на сайт, данные достаются из локального хранилища при монтировании компонента App.
- При клике на иконку «Лайк» в блоке карточки выполняется запрос к /movies нашего API.
- При попытке перейти на несуществующую страницу происходит редирект на страницу «404». Кнопка «Назад» работает корректно.

# Стек:
- HTML, CSS
- Javascript
- React
- Node.js
- Express.js
- Cookies
- API
- БЭМ