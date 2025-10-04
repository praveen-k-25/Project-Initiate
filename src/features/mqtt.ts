import mqtt from "mqtt";

export default function usertracker(user: any) {
  const client = mqtt.connect(import.meta.env.VITE_MQTT, {
    clientId: `react_frontend_${Math.random().toString(16).slice(3)}`,
    clean: true,
    //reconnectPeriod: 5000, // auto reconnect every 5s
  });

  client.on("connect", () => console.log("✅ MQTT Connected"));
  client.on("close", () => console.log("❌ MQTT Disconnected"));
  client.on("error", (err) => console.log("❌ MQTT Error", err));

  const interval = setInterval(() => {
    if (client.connected) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const payload = {
          user: user.id,
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          speed: pos.coords.speed || -1,
          timestamp: Date.now(),
        };
        client.publish("user/location", JSON.stringify(payload));
      });
    }
  }, 5000);

  return () => {
    clearInterval(interval);
    client.end(true);
  };
}
