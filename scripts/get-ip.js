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

console.log('🌐 IP-адрес для доступа из локальной сети:');
console.log(`   http://${localIP}:${port}`);
console.log('');
console.log('📱 Используйте этот адрес на других устройствах в той же Wi-Fi сети');
console.log('💻 Для локального доступа используйте: http://localhost:' + port);
