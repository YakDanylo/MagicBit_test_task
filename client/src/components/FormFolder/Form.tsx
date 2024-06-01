import { useState, useRef } from "react";
import styles from "./Form.module.css";
interface FormProps {
  setUser: (email: string, number: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  setUserNotFound: (userNotFound: boolean) => void;
}
function Form({ setUser, setLoading, loading, setUserNotFound }: FormProps) {
  const controllerRef = useRef<AbortController | null>(null);
  const [email, setEmail] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [emailInputError, setEmailInputError] = useState<boolean>(false);
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    if (
      e.target.value.includes("@") &&
      e.target.value.includes(".") &&
      e.target.value.length > 5
    ) {
      setEmailInputError(false);
    } else {
      setEmailInputError(true);
    }
  }
  function handleNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(+e.target.value.replaceAll("-", "")) || e.target.value.length > 8)
      return;
    const value = e.target.value.replace(/-/g, "");
    let result = "";

    for (let i = 0; i < value.length; i += 2) {
      if (i > 0) {
        result += "-";
      }
      result += value.slice(i, i + 2);
    }

    setNumber(result);
  }

  function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (emailInputError) return;
    if (!email) {
      alert("Please enter email");
      return;
    }
    console.log(loading);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const fetchData = async () => {
      setLoading(true);
      setUser("", "");
      setUserNotFound(false);
      controllerRef.current = new AbortController();
      const { signal } = controllerRef.current;
      try {
        const res = await fetch("http://localhost:8000/getuser", {
          method: "POST",
          body: JSON.stringify({ email, number }),
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });
        const data = await res.json();
        setUser(data.email, data.number);

        setLoading(false);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Request was aborted");
        } else {
          console.log(err);
          setUserNotFound(true);
          setLoading(false);
        }
      }
    };
    fetchData();
  }

  return (
    <div>
      <form className={styles.form}>
        <div className={styles.form__email}>
          <label>Enter email</label>
          <input type="text" onChange={(e) => handleEmailChange(e)} />
        </div>
        {emailInputError && (
          <div className={styles.form__emailError}>Enter a valid email</div>
        )}
        <div className={styles.form__number}>
          <label>Enter number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => handleNumberChange(e)}
          />
        </div>
        <button className={styles.form__button} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
