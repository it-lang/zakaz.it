document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("Скрипт загружен и готов к работе.");

    loadServices(); // Вызов функции загрузки услуг
    setupRegistrationForm(); // Настройка формы регистрации
    showNotification("Добро пожаловать на Форум Услуг!"); // Показать приветственное уведомление
}

// Функция для загрузки услуг через AJAX
function loadServices() {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '<p>Загрузка услуг...</p>'; // Уведомление о загрузке

    fetch('get_services.php')
        .then(handleResponse)
        .then(renderServices)
        .catch(handleError);
}

// Обработка ответа от сервера
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Сетевая ошибка');
    }
    return response.json();
}

// Отображение услуг на странице
function renderServices(services) {
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = ''; // Очищаем предыдущее содержимое

    services.forEach(service => {
        const serviceDiv = createServiceElement(service);
        servicesList.appendChild(serviceDiv);
    });
}

// Создание элемента услуги
function createServiceElement(service) {
    const serviceDiv = document.createElement('div');
    serviceDiv.classList.add('service-item');
    serviceDiv.innerHTML = `
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p>Цена: ${service.price} руб.</p>
    `;
    return serviceDiv;
}

// Обработка ошибок
function handleError(error) {
    console.error('Ошибка при загрузке услуг:', error);
    const servicesList = document.getElementById('services-list');
    servicesList.innerHTML = '<p>Ошибка загрузки услуг. Попробуйте позже.</p>';
}

// Настройка формы регистрации
function setupRegistrationForm() {
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', validateRegistrationForm);
    }
}

// Валидация формы регистрации
function validateRegistrationForm(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !password) {
        showNotification("Пожалуйста, заполните все поля.");
        return;
    }

    if (!validateEmail(email)) {
        showNotification("Введите корректный адрес электронной почты.");
        return;
    }

    // Здесь можно отправить форму на сервер
    this.submit(); // Если все валидации пройдены, отправляем форму
}

// Валидация формата электронной почты
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Отображение уведомления
function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    notification.style.backgroundColor = "#28a745";
    notification.style.color = "#fff";
    notification.style.padding = "10px";
    notification.style.margin = "20px 0";
    notification.style.borderRadius = "5px";
    document.body.prepend(notification);

    // Анимация исчезновения уведомления
    setTimeout(() => {
        notification.style.opacity = 0; // Убираем уведомление
        setTimeout(() => notification.remove(), 500); // Удаляем его через 0.5 секунды
    }, 3000);
}