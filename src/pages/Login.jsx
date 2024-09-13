import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Login() {
  const [email, setEmail] = useState("aman@example.com");
  const [password, setPassword] = useState("aman1220");
  const { login, isAuthenticated } = useAuth(); // Fix: Destructure from object
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault(); // Prevent form submission reload
    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        {" "}
        {/* Fix: Use onSubmit */}
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <Button type={"primary"}>Login</Button>
        </div>
      </form>
    </main>
  );
}
