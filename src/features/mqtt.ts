import mqtt from "mqtt";

export default function usertracker(user: any) {
  const client = mqtt.connect(import.meta.env.VITE_MQTT, {
    clientId: `react_frontend_${Math.random().toString(16).slice(3)}`,
    clean: true,
    //reconnectPeriod: 5000, // auto reconnect every 5s
  });

  client.on("connect", () => {
    console.log("✅ MQTT Connected");

    setInterval(() => {
      // Start tracking once connected
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const payload = {
              user: user.id,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              speed: pos.coords.speed || -1,
              timestamp: Date.now(),
            };

            console.log("📡 Publishing location", payload);
            client.publish("user/location", JSON.stringify(payload));
          },
          (err) => console.error("❌ Geolocation error:", err)
        );
      } else {
        console.error("❌ Geolocation not supported in this browser.");
      }
    }, 3000);
  });

  client.on("close", () => console.log("❌ MQTT Disconnected"));
  client.on("error", (err) => console.error("❌ MQTT Error:", err));

  // Cleanup function
  return () => {
    client.end(true);
    console.log("🛑 MQTT connection closed");
  };
}
