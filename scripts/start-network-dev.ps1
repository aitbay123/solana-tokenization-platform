# PowerShell скрипт для запуска сервера с доступом из локальной сети

Write-Host "🚀 Запуск сервера разработки для локальной сети..." -ForegroundColor Green
Write-Host ""

# Получаем IP-адрес локальной сети
$networkAdapters = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" }

if ($networkAdapters) {
    $localIP = $networkAdapters[0].IPAddress
    Write-Host "📱 Доступ с других устройств в Wi-Fi сети:" -ForegroundColor Cyan
    Write-Host "   http://$localIP:3000" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💻 Локальный доступ:" -ForegroundColor Cyan
    Write-Host "   http://localhost:3000" -ForegroundColor Yellow
} else {
    $localIP = "localhost"
    Write-Host "⚠️  Не удалось определить IP-адрес локальной сети" -ForegroundColor Red
    Write-Host "   Используйте localhost для локального доступа" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⚠️  Убедитесь, что:" -ForegroundColor Yellow
Write-Host "   1. Все устройства подключены к одной Wi-Fi сети" -ForegroundColor White
Write-Host "   2. Брандмауэр не блокирует порт 3000" -ForegroundColor White
Write-Host "   3. На мобильных устройствах используйте IP-адрес выше" -ForegroundColor White
Write-Host ""

# Запускаем сервер
Write-Host "🔄 Запуск сервера..." -ForegroundColor Green
npm run dev:network
