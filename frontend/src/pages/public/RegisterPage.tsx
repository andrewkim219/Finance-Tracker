import { InputBar } from "../../components/InputBar.tsx";
import { useRegisterUserApi } from "../../api/userApi.ts";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { registerUser } = useRegisterUserApi();
  const navigate = useNavigate();

  async function handleRegister(
    username: string,
    password: string,
    email?: string,
  ) {
    try {
      if (!email) {
        throw new Error("Email is required for registration");
      }

      const credentials = {
        username,
        email,
        password,
      };
      await registerUser(credentials);
      console.log("Registration successful:", credentials);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <>
      <InputBar onSubmit={handleRegister} type={"Register"} />
    </>
  );
}

export default RegisterPage;
