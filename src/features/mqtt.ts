import mqtt from "mqtt";

export function usertracker() {
  const client = mqtt.connect(import.meta.env.VITE_MQTT);

  client.on("connect", () => {
    console.log("✅ Mqtt frontend Connected");

    const sentData = setInterval(() => {
      navigator.geolocation.getCurrentPosition((data) => {
        console.log(data);
      });
    });

    return clearInterval(sentData);
  });
}
