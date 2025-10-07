import "./styles/index.css";       // Tailwind base
import "./styles/geist-font.css"; // Fonts + global font-family
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import {BrowserRouter} from "react-router-dom";
import {persistor, store} from "./store/store.ts";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
