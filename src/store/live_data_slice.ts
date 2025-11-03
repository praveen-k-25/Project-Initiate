import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface vehicleStatus {
  user: string;
  timestamp: number;
  time: string;
  lat: number;
  lng: number;
  speed: number;
  status: string;
}

interface initialState {
  vehicleStatus: vehicleStatus[];
}

const initialState: initialState = {
  vehicleStatus: [],
};

const vehicleStatusDashboard = createSlice({
  name: "live",
  initialState,
  reducers: {
    setVehicleStatusUser: (state, action: PayloadAction<any>) => {
      state.vehicleStatus = action.payload.map((item: string) => ({
        user: item,
        timestamp: 0,
        time: 0,
        lat: 0,
        lng: 0,
        speed: 0,
        status: "",
      }));
    },

    updateVehicleStatus: (state, action: PayloadAction<any>) => {
      console.log(initialState.vehicleStatus);
      if (state.vehicleStatus.length > 0) {
        let data = state.vehicleStatus.map((item: any) => {
          if (item.user === action.payload.user) {
            return {
              ...item,
              timestamp: action.payload.timestamp,
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
