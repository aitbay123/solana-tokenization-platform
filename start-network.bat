@echo off
echo 🚀 Запуск сервера разработки для локальной сети...
echo.

REM Получаем IP-адрес
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    set ip=!ip: =!
    goto :found
)
:found

echo 📱 Доступ с других устройств в Wi-Fi сети:
echo    http://%ip%:3000
echo.
echo 💻 Локальный доступ:
echo    http://localhost:3000
echo.
echo ⚠️  Убедитесь, что:
echo    1. Все устройства подключены к одной Wi-Fi сети
echo    2. Брандмауэр не блокирует порт 3000
echo    3. На мобильных устройствах используйте IP-адрес выше
echo.

REM Запускаем сервер
echo 🔄 Запуск сервера...
npm run dev:network
pause
