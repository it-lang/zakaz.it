<?php
header('Content-Type: application/json');

$ordersFile = 'orders.json';

// Получаем данные из POST-запроса
$status = $_POST['status'] ?? 'В обработке'; // статус заказа
$amount = $_POST['amount'] ?? 0; // сумма заказа

// Проверяем, чтобы сумма была числом и больше нуля
if (!is_numeric($amount) || $amount <= 0) {
    echo json_encode(['success' => false, 'message' => 'Некорректная сумма заказа.']);
    exit;
}

// Загружаем существующие заказы
if (file_exists($ordersFile)) {
    $currentOrders = json_decode(file_get_contents($ordersFile), true);
} else {
    $currentOrders = [];
}

// Добавляем новый заказ
$newOrder = [
    'id' => count($currentOrders) + 1,
    'status' => $status,
    'amount' => (float)$amount,
    'created_at' => date('Y-m-d H:i:s')
];

$currentOrders[] = $newOrder;

// Сохраняем обновленный список заказов в файл
file_put_contents($ordersFile, json_encode($currentOrders, JSON_PRETTY_PRINT));

// Возвращаем успех
echo json_encode(['success' => true, 'message' => 'Заказ успешно создан.']);
?>
