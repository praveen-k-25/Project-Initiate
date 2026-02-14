import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { vehicleStatusData } from "../typesTs/dashboard";

interface initialState {
  vehicleStatus: vehicleStatusData[];
}

const initialState: initialState = {
  vehicleStatus: [],
};

function getTime(d: string) {
  const date = new Date(d);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const vehicleStatusDashboard = createSlice({
  name: "live",
  initialState,
  reducers: {
    setVehicleStatusUser: (state, action: PayloadAction<any>) => {
      state.vehicleStatus = action.payload.map((item: any) => ({
        user: item.user,
        username: item.username,
        time: item.time,
        lat: item.lat,
        lng: item.lng,
        speed: item.speed,
        status: item.status,
      }));
    },

    updateVehicleStatus: (state, action: PayloadAction<any>) => {
      if (state.vehicleStatus.length > 0) {
        let data = state.vehicleStatus.map((item: any) => {
          if (item.user === action.payload.user) {
            return {
              ...item,
              time: getTime(action.payload.timestamp),
              lat: action.payload.lat,
              lng: action.payload.lng,
              speed: action.payload.speed,
              status: action.payload.status,
            };
          } else {
            return item;
          }
        });
        state.vehicleStatus = data;
      }
    },
  },
});

export default vehicleStatusDashboard.reducer;
export const { updateVehicleStatus, setVehicleStatusUser } =
  vehicleStatusDashboard.actions;
