import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  vehicleStatus: {
    user: string;
    timestamp: number;
    time: string;
    lat: number;
    lng: number;
    speed: number;
  };
}

const initialState = {
  vehicleStatus: {
    user: "",
    timestamp: 0,
    time: "",
    lat: 0,
    lng: 0,
    speed: 0,
  },
};

const vehicleStatusDashboard = createSlice({
  name: "live",
  initialState,
  reducers: {
    setVehicleStatus: (state, action: PayloadAction<any>) => {
      state.vehicleStatus = action.payload;
    },
    updateVehicleStatus: (state, action: PayloadAction<any>) => {
      let data = action.payload;
      let vehicleAvailability = state.vehicleStatus?.user === data.user;
      if (vehicleAvailability) {
        state.vehicleStatus = data;
      }
    },
  },
});

export default vehicleStatusDashboard.reducer;
export const { setVehicleStatus, updateVehicleStatus } =
  vehicleStatusDashboard.actions;
