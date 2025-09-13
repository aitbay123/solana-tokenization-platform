const { exec } = require('child_process');
const os = require('os');

// Получаем IP-адрес локальной сети
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Пропускаем внутренние адреса и IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

const localIP = getLocalIP();
const port = process.env.PORT || 3000;

console.log('🚀 Запуск сервера разработки для локальной сети...');
console.log('');
console.log('📱 Доступ с других устройств в Wi-Fi сети:');
console.log(`   http://${localIP}:${port}`);
console.log('');
console.log('💻 Локальный доступ:');
console.log(`   http://localhost:${port}`);
console.log('');
console.log('⚠️  Убедитесь, что:');
console.log('   1. Все устройства подключены к одной Wi-Fi сети');
console.log('   2. Брандмауэр не блокирует порт', port);
console.log('   3. На мобильных устройствах используйте IP-адрес выше');
console.log('');

// Запускаем сервер с доступом из локальной сети
const server = exec(`next dev -H 0.0.0.0 -p ${port}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка запуска сервера: ${error}`);
    return;
  }
});

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

server.on('close', (code) => {
  console.log(`Сервер завершен с кодом ${code}`);
});
