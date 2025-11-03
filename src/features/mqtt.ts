import mqtt from "mqtt";
import toast from "react-hot-toast";
import { store } from "../store/store";
import { updateVehicleStatus } from "../store/live_data_slice";

function getTime() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

/* export const client = mqtt.connect(import.meta.env.VITE_MQTT, {
  clientId: `react_frontend_${Math.random().toString(16).slice(3)}`,
  clean: true,
  reconnectPeriod: 5000, // auto reconnect every 5s
}); */

let locationInterval: any = null;
let client: mqtt.MqttClient | null = null;

export default function userTracker(user: any) {
  const ua = navigator.userAgent;
  let limit = 0;
  let isOnline = false; // 🔹 Track connection state

  client = mqtt.connect(import.meta.env.VITE_MQTT, {
    clientId: `react_frontend_${Math.random().toString(16).slice(3)}`,
    clean: true,
    reconnectPeriod: 5000, // auto reconnect every 5s
  });

  if (!client) return;

  client.on("connect", () => {
    isOnline = true;
    //toast.success("✅ Connected to MQTT broker");

    user.vehicles.forEach((vehicle: any) => {
      // Subscribe to vehicles
      client?.subscribe(`user/processed/${vehicle}`, (err) => {
        if (err) console.log("Subscription error:", err);
        else console.log(`📡 Subscribed to ${vehicle}`);
      });
      toast.success(`📡 Subscribed to ${vehicle}`, {
        position: "bottom-center",
      });
    });
  });

  client.on("reconnect", () => {
    isOnline = false;
    //toast.error("🔄 Reconnecting to MQTT broker...");
  });

  client.on("offline", () => {
    isOnline = false;
    toast.error("⚠️ Server offline - network issue detected");
  });

  client.on("error", (err) => console.error("❌ MQTT Error:", err));

  client.on("message", (topic, message) => {
    if (!topic) return;
    store.dispatch(updateVehicleStatus(JSON.parse(message.toString())));
    console.log(JSON.parse(message.toString()));
  });

  // 🔁 Periodic location publishing
  if (ua.includes("Mobile")) {
    if (locationInterval) clearInterval(locationInterval);

    locationInterval = setInterval(() => {
      if (!isOnline) return; // 🚫 Skip if not connected or reconnecting

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const payload = {
            user: user,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            speed: pos.coords.speed || -1,
            timestamp: Date.now(),
            time: getTime(),
          };

          if (Date.now() - limit > 2500) {
            limit = Date.now();
            client?.publish(
              `user/location/${payload.user}`,
              JSON.stringify(payload)
            );
            toast.success("📡 Location Sent", {
              position: "bottom-right",
            });
          }
        },
        () => toast.error("Please turn on location services"),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }, 2000);
  }

  // Cleanup on unmount
  return () => {
    client?.end(true);
    toast.error("Disconnected from MQTT broker");
  };
}

export function cleanupMqtt() {
  if (locationInterval) {
    clearInterval(locationInterval);
    locationInterval = null;
  }

  if (client) {
    client.end(true);
    toast.error("Destroyed connection from MQTT broker");
  }
}
