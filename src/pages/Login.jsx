import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        // Save user in parent state
        setUser(res.data);

        // ✅ Redirect to dashboard
        navigate("/dashboard");

      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Todo App</h1>
      <button onClick={() => login()} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
