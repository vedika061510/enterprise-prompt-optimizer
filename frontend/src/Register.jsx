import { useState } from "react";
import axios from "axios";

function Register() {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/register",
        null,
        {
          params: {
            username,
            email,
            password
          }
        }
      );

      alert(
        "Registered Successfully"
      );

    } catch (err) {

      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;