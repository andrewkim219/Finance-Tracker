import { InputBar } from "../../components/InputBar.tsx";
import { useUpdateUserApi } from "../../api/userApi.ts";

export function Settings() {
  const { updateUser } = useUpdateUserApi();

  async function handleUpdate(
    username: string,
    password: string,
    email?: string,
  ) {
    try {
      const user = {
        username,
        password,
        email: email || "",
      };
      await updateUser(user);
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to update settings. Please try again.");
    }
  }

  return (
    <>
      <p>Settings</p>
      <InputBar onSubmit={handleUpdate} type={"Update"} />
    </>
  );
}
