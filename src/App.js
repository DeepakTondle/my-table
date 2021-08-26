import './App.css';
import { Provider } from "react-redux";
import store from "./store";
import Home from "./component/home";

function App() {
  return (
    <div>
      <Provider store={store}>
        <Home/>
      </Provider>
    </div>
  );
}

export default App;
