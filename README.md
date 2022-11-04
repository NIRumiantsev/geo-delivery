# Локальная работа с приложением GeoDelivery

### 1. geo-delivery-db (База данных)
1.1 Установить на рабочей машине Docker (https://docs.docker.com/desktop/install/windows-install/)

1.2 Так же рекомендуется установить GUI для работы с MongoDB (https://www.mongodb.com/docs/manual/administration/install-community/)

1.3 Создать файл `.env` и скопировать в него содержимое `.env.dist`

1.4 Установить пользователя и пароль в файле .env

1.5 Выполнить команду `docker-compose up` в директории `geo-delivery-db`

### 2. geo-delivery-api (API)
2.1 Установить на рабочей машине актуальную версию Node.js и NPM (https://nodejs.org/en/download/)

2.2 В директории `geo-delivery-api` выполнить команду `npm install`

2.3 Создать файл `.env` и скопировать в него содержимое `.env.dist`

2.4 Заполнить поля в `.env` (`MONGO_LOGIN` и `MONGO_PASSWORD` должны совпадать с указанными в `geo-delivery-db`)

2.5 Выполнить команду `npm start`

### 3. geo-delivery (Клиент)
3.1 Проверить наличие Node.js и NPM (см п. 2.1)

3.2 В директории `geo-delivery-api` выполнить команду `npm install`

3.3 Создать файл `.env` и скопировать в него содержимое `.env.dist`

3.4 Заполнить поле `REACT_APP_API_HOST_URL`, указав URL-адрес, на котором работает geo-delivery-api (по умолчанию `http://localhost:3001/api`)

3.5 Выполнить команду `npm start`