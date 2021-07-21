import React from "react";
import LogSignFormS from "./LogSignFormS";
import BtnLogSign from "./BtnLogSign";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SecurityBar from "../SecurityBar";

interface Props {
  title: string;
  isSignIn?: boolean;
}

const ConfirmPword = ({ onChange }: any) => {
  return (
    <>
      <label htmlFor="confirm">Confirm Password</label>
      <input type="password" id="confirm" onChange={onChange} required />
    </>
  );
};

const LogInForm = ({ title, isSignIn }: Props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [barrProg, setBarProg] = useState<number>(-1);
  /* const [isSame, setIsSame] = useState<boolean>(false); */

  let history = useHistory();

  useEffect(() => {
    if (name && password && confirm === password) {
      setIsComplete(true);
    }
  }, [name, confirm, password]);

  useEffect(() => {});

  const Subscribe = () => {
    if (isComplete) {
      try {
        axios({
          method: "post",
          url: "http://localhost:5000/user/addUser",
          data: {
            name: name,
            password: password,
          },
        });
        history.push("/Login");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("i campi vanno tutti compilati");
    }
  };

  const LogIn = () => {
    /* axios({
        method: "post",
        url: "http://localhost:5000/user/login",
        data: {
          name: name,
          password: password,
        },
      }).then((res) => {
        localStorage["token"] = res.data.token;
        localStorage["isAdmin"] = res.data.isAdmin;
        history.push("/ToDo");
        
      }).catch(err => {
          if (err.response) {
            setIsError(true);
          }
      }); */
    try {
      axios({
        method: "post",
        url: "http://localhost:5000/user/login",
        data: {
          name: name,
          password: password,
        },
      }).then((res) => {
        if (res.data.found) {
          localStorage["token"] = res.data.data.token;
          localStorage["isAdmin"] = res.data.data.isAdmin;
          history.push("/ToDo");
        } else { setIsError(true); }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Step = (srt: string) => {
    const ValidEmail = new RegExp(srt);

    return ValidEmail;
  };

  return (
    <LogSignFormS>
      <h1>{title}</h1>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="password">PassWord</label>
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {isSignIn && <SecurityBar number={0} />}
      {isSignIn && (
        <ConfirmPword
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirm(e.target.value)
          }
        />
      )}
      {isError && (
        <p>
          user o password errati, riprova o{" "}
          <a href="http://localhost:3000/Register">Registrati</a>
        </p>
      )}
      <BtnLogSign onClick={(isSignIn && Subscribe) || LogIn}>
        {(isSignIn && "Registrati") || "Login"}
      </BtnLogSign>
    </LogSignFormS>
  );
};

export default LogInForm;
