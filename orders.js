document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('order-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const formData = new FormData(form);

        fetch('create_order.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                responseMessage.textContent = data.message;
                responseMessage.style.color = data.success ? 'green' : 'red';
                form.reset(); // Сбрасываем форму при успешном создании заказа
            })
            .catch(error => {
                console.error('Ошибка:', error);
                responseMessage.textContent = 'Произошла ошибка при создании заказа.';
                responseMessage.style.color = 'red';
            });
    });
});