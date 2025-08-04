import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <>
      <p>Landing Page</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default LandingPage;
