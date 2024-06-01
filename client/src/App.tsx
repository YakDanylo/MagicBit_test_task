import "./App.css";
import Form from "./components/FormFolder/Form";
import User from "./components/UserFolder/User";
import { useState } from "react";
function App() {
  const [user, setUser] = useState<{ email: string; number: string }>({
    email: "",
    number: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [userNotFound, setUserNotFound] = useState<boolean>(false);
  function setUserState(email: string, number: string) {
    setUser({ email: email, number: number });
  }
  return (
    <div className="App">
      <Form
        setUser={setUserState}
        setLoading={setLoading}
        loading={loading}
        setUserNotFound={setUserNotFound}
      />
      <User user={user} loading={loading} userNotFound={userNotFound} />
    </div>
  );
}

export default App;
