import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { vehicleStatusData } from "../typesTs/dashboard";

interface initialState {
  vehicleStatus: vehicleStatusData[];
}

const initialState: initialState = {
  vehicleStatus: [],
};

const vehicleStatusDashboard = createSlice({
  name: "live",
  initialState,
  reducers: {
    setVehicleStatusUser: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
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
              time: action.payload.time,
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
