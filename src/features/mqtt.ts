import mqtt from "mqtt";

export function usertracker() {
  const client = mqtt.connect(import.meta.env.VITE_MQTT, {
    reconnectPeriod: 3000, // auto-reconnect every 3s
  });

  client.on("connect", () => {
    console.log("✅ Mqtt frontend Connected");

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const payload = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          speed: pos.coords.speed || 0,
          timestamp: Date.now(),
        };

        client.publish("user/location", JSON.stringify(payload));
      });
    }, 5000); // every 5 seconds

    // Stop interval when client disconnects
    client.on("close", () => {
      clearInterval(interval);
      console.log("❌ MQTT Disconnected, stopped sending location");
    });
  });

  client.on("error", (err) => {
    console.error("❌ MQTT Error:", err);
  });
}
