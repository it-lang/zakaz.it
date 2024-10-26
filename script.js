document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        servicesList: document.getElementById('servicesList'),
        authButton: document.getElementById('authButton'),
        orderModal: document.getElementById('orderModal'),
        closeButton: document.querySelector('.close-button'),
        orderForm: document.getElementById('orderForm'),
        customerName: document.getElementById('customerName'),
        customerEmail: document.getElementById('customerEmail'),
        serviceNameField: document.getElementById('serviceName'),
        servicePriceField: document.getElementById('servicePrice'),
        adminPanel: document.querySelector('.admin-panel'),
        addServiceForm: document.getElementById('addServiceForm'),
        addAdminForm: document.getElementById('addAdminForm'),
        viewOrdersButton: document.getElementById('viewOrdersButton'),
        viewReviewsButton: document.getElementById('viewReviewsButton'),
        addDiscountButton: document.getElementById('addDiscountButton'),
        viewStatsButton: document.getElementById('viewStatsButton'),
        sendNotificationButton: document.getElementById('sendNotificationButton'),
        analyticsButton: document.getElementById('analyticsButton'),
        manageCategoriesButton: document.getElementById('manageCategoriesButton'),
        // Новые элементы для дополнительных функций
        activeOrdersButton: document.getElementById('activeOrdersButton'),
        searchOrderButton: document.getElementById('searchOrderButton'),
        updateOrderStatusButton: document.getElementById('updateOrderStatusButton'),
        deleteServiceButton: document.getElementById('deleteServiceButton'),
        editServicePriceButton: document.getElementById('editServicePriceButton'),
        filterServicesButton: document.getElementById('filterServicesButton'),
        blockUserButton: document.getElementById('blockUserButton'),
        assignLabelButton: document.getElementById('assignLabelButton'),
        userRolesButton: document.getElementById('userRolesButton'),
        exportDataButton: document.getElementById('exportDataButton')
    };

    const services = [
        { name: 'Заказ тг бота', description: '', price: 50 },
        { name: 'Заказ вк бота', description: '', price: 100 },
        { name: 'Заказ сайта', description: '', price: 200 }
    ];

    const masterAdminCredentials = { username: "mainadmin", password: "admin1234" };
    let currentUserRole = null;

    loadServices();

    function loadServices() {
        elements.servicesList.innerHTML = '';
        services.forEach(service => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${service.name}</h3>
                <p>Цена: ${service.price} тенге.</p>
                <p>${service.description}</p>
                <button class="order-button" data-service="${service.name}" data-price="${service.price}">Заказать</button>
            `;
            elements.servicesList.appendChild(li);
        });
        document.querySelectorAll('.order-button').forEach(button => {
            button.addEventListener('click', openOrderModal);
        });
    }

    elements.authButton.addEventListener('click', () => {
        const username = prompt('Введите имя пользователя:');
        const password = prompt('Введите пароль:');

        if (username === masterAdminCredentials.username && password === masterAdminCredentials.password) {
            currentUserRole = 'masterAdmin';
            elements.adminPanel.style.display = 'block';
            alert('Вы вошли как главный администратор.');
        } else if (username === 'admin' && password === 'adminpass') {
            currentUserRole = 'admin';
            elements.adminPanel.style.display = 'block';
            alert('Вы вошли как администратор.');
        } else {
            alert('Неверные учетные данные!');
        }
    });

    elements.addServiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newServiceName = document.getElementById('newServiceName').value;
        const newServiceDescription = document.getElementById('newServiceDescription').value;
        const newServicePrice = document.getElementById('newServicePrice').value;
        services.push({ name: newServiceName, description: newServiceDescription, price: Number(newServicePrice) });
        loadServices();
        alert('Услуга добавлена!');
    });

    elements.addAdminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newAdminName = document.getElementById('newAdminName').value;
        if (currentUserRole === 'masterAdmin') {
            alert(`Новый администратор "${newAdminName}" добавлен.`);
        } else {
            alert('Недостаточно прав для добавления администратора.');
        }
    });

    function openOrderModal(event) {
        const service = event.target.dataset.service;
        const price = event.target.dataset.price;
        elements.serviceNameField.value = service;
        elements.servicePriceField.value = price;
        elements.orderModal.style.display = 'block';
    }

    elements.closeButton.addEventListener('click', () => {
        elements.orderModal.style.display = 'none';
    });

    elements.orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderData = {
            name: elements.customerName.value,
            email: elements.customerEmail.value,
            service: elements.serviceNameField.value,
            price: elements.servicePriceField.value
        };
        alert(`Заказ оформлен успешно! 
        Имя: ${orderData.name}
        Email: ${orderData.email}
        Услуга: ${orderData.service}
        Цена: ${orderData.price} руб.`);
        elements.orderForm.reset();
        elements.orderModal.style.display = 'none';
    });

    // Функции для администраторов
    elements.viewOrdersButton.addEventListener('click', () => alert('Показ всех активных заказов.'));
    elements.viewReviewsButton.addEventListener('click', () => alert('Показ всех отзывов.'));
    elements.addDiscountButton.addEventListener('click', () => alert('Добавление скидки.'));
    elements.viewStatsButton.addEventListener('click', () => alert('Показ статистики.'));
    elements.sendNotificationButton.addEventListener('click', () => alert('Уведомление отправлено.'));

    // Функции для главного администратора
    elements.analyticsButton.addEventListener('click', () => alert('Просмотр аналитики.'));
    elements.manageCategoriesButton.addEventListener('click', () => alert('Управление категориями.'));
    elements.activeOrdersButton.addEventListener('click', () => alert('Просмотр активных заказов.'));
    elements.searchOrderButton.addEventListener('click', () => alert('Поиск заказа по ID.'));
    elements.updateOrderStatusButton.addEventListener('click', () => alert('Изменение статуса заказа.'));
    elements.deleteServiceButton.addEventListener('click', () => alert('Удаление услуги.'));
    elements.editServicePriceButton.addEventListener('click', () => alert('Редактирование цены услуги.'));
    elements.filterServicesButton.addEventListener('click', () => alert('Фильтрация услуг по категории.'));
    elements.blockUserButton.addEventListener('click', () => alert('Блокировка пользователя.'));
    elements.assignLabelButton.addEventListener('click', () => alert('Добавление меток к заказу.'));
    elements.userRolesButton.addEventListener('click', () => alert('Просмотр и изменение ролей пользователей.'));
    elements.exportDataButton.addEventListener('click', () => alert('Экспорт данных в файл.'));
});