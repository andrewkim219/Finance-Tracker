import { useNavigate } from "react-router-dom";
import { useState } from "react";

type InputBarProps = {
  onSubmit: (username: string, password: string, email?: string) => void;
  type: string;
};

export function InputBar({ onSubmit, type }: InputBarProps) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleBack() {
    navigate("/");
  }

  function handleSubmit() {
      (type === "Register" || type === "Update")
      ? onSubmit(username, password, email)
      : onSubmit(username, password);
  }

  return (
    <>
      <p>{type} Page</p>

      <label>Username: </label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />

      <label>Password: </label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />

      {type === "Register" && (
        <>
          <label>Email: </label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </>
      )}

      <button onClick={handleSubmit}>{type}</button>
      <button onClick={handleBack}>Back</button>
    </>
  );
}
