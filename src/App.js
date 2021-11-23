import { useState } from "react";
import "./App.css";
import { LoggedIn } from "./pages/LoggedIn";
import { Login } from "./pages/Login";

function App() {
  const [loginSuccess, setLoginSuccess] = useState(true);

  const onLoginSuccess = () => setLoginSuccess(true);

  return (
    <div>
      {!loginSuccess && <Login onLoginSuccess={onLoginSuccess} />}
      {loginSuccess && <LoggedIn />}
    </div>
  );
}

export default App;
