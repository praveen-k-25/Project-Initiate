import mqtt from "mqtt";
import toast from "react-hot-toast";
import { store } from "../store/store";
import { updateVehicleStatus } from "../store/live_data_slice";
import useDebounce from "./useDebounce";

function getTime() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export const client = mqtt.connect(import.meta.env.VITE_MQTT, {
  clientId: `react_frontend_${Math.random().toString(16).slice(3)}`,
  clean: true,
  //reconnectPeriod: 5000, // auto reconnect every 5s
});

let locationInterval: any = null;

export default function usertracker(user: any) {
  const ua = navigator.userAgent;
  let limit = 0;

  client.on("connect", () => {
    toast.success("✅ MQTT Connected");

    if (ua.includes("Mobile")) {
      if (locationInterval) clearInterval(locationInterval);

      locationInterval = setInterval(() => {
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
                time: getTime(),
              };

              //("📡 Publishing location", payload);
              if (Date.now() - limit > 4500) {
                limit = Date.now();
                toast.success("Location updated");
                client.publish(
                  `user/location/${payload.user}`,
                  JSON.stringify(payload)
                );
              }
            },
            (err) => console.error("❌ Geolocation error:", err)
          );
        } else {
          toast.error("Location tracking error");
        }
      }, 5000);
    } else {
      toast.error("Please use a mobile device to track your location.");
    }

    client.subscribe(`user/location/${user.id}`, (err) => {
      if (err) {
        console.log("Subscription error:", err);
      } else {
        console.log(`Subscribed to ${user.id}`);
      }
    });

    client.on("message", (topic, message) => {
      topic;
      store.dispatch(updateVehicleStatus(JSON.parse(message.toString())));
    });
  });

  client.on("close", () => console.log("❌ MQTT Disconnected"));
  client.on("error", (err) => console.error("❌ MQTT Error:", err));

  // Cleanup function
  return () => {
    client.end(true);
    console.log("🛑 MQTT connection closed");
  };
}

export function cleanupMqtt() {
  if (locationInterval) {
    clearInterval(locationInterval);
    locationInterval = null;
  }

  if (client) {
    client.end(true);
    console.log("🧹 MQTT disconnected and interval cleared");
  }
}
