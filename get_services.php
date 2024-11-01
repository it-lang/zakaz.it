<?php
header('Content-Type: application/json');

// Пример данных, которые могли бы быть получены из базы данных
$orders = [
    ['id' => 1, 'status' => 'None', 'amount' => 1500],
    ['id' => 2, 'status' => 'None', 'amount' => 2300],
    // Добавьте больше заказов по мере необходимости
];

// Возвращаем данные как JSON
echo json_encode($orders);
?>
