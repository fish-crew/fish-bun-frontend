import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_LAT = "37.497625203";
export const DEFAULT_LNG = "127.03088379";
export const DEFAULT_ZOOM = 3;

export const INITIAL_STORE = {
  address: "",
  name: "",
  detail: "",
  id: null,
  lat: DEFAULT_LAT,
  lng: DEFAULT_LNG,
  nickname: "",
  regDate: "",
  likes: 0,
};

const mapSlice = createSlice({
  name: "map",
  initialState: {
    userLocation: { lat: DEFAULT_LAT, lng: DEFAULT_LNG },
    stores: [],
    selectedStore: null,
    registerStore: INITIAL_STORE,
  },
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload;
    },
    setRegisterStore: (state, action) => {
      state.registerStore = action.payload;
    },
  },
});

export const {
  setMap,
  setUserLocation,
  setStores,
  setLevel,
  setCenter,
  setSelectedStore,
  setCurrentLocation,
  setRegisterStore,
} = mapSlice.actions;
export default mapSlice.reducer;
