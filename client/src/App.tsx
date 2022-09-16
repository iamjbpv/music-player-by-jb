import logo from "./logo.svg";
import "./App.scss";

import { BrowserRouter } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import store from "./store";
import AppMain from "./components/AppMain";
console.log('store.getState()',store.getState());
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppMain />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
