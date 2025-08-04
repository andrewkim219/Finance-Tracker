import { useContext, useEffect } from "react";
import { useLoginUserApi } from "../../api/userApi.ts";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { InputBar } from "../../components/InputBar.tsx";

function LoginPage() {
  const { loginUser } = useLoginUserApi();
  const { isAuthenticated, setIsAuthenticated, currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(username: string, password: string) {
    try {
      const userData = await loginUser({ username, password });
      console.log(userData);
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home");
      console.log(currentUser)
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-container">
      <p>Login Page</p>
      <InputBar onSubmit={handleLogin} type={"Login"} />
    </div>
  );
}

export default LoginPage;
