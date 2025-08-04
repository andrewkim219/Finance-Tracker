import { useContext, useEffect } from "react";
import { useLoginUserApi } from "../../api/userApi.ts";
import { AuthContext } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { InputBar } from "../../components/InputBar.tsx";

function LoginPage() {
  const { loginUser } = useLoginUserApi();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(username: string, password: string) {
    try {
      await loginUser({ username, password });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/home");
    }
  }, [isAuthenticated]);

  return (
    <>
      <p>Login Page</p>
      <InputBar onSubmit={handleLogin} type={"Login"} />
    </>
  );
}

export default LoginPage;
