import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth, store } from "../firebaseconfig";
import List from "./List";
import '../styles/Form.css'

const Form = () => {
  const [form, setForm] = useState({ name: "", task: "" });
  const [list, setList] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const history = useHistory();

  const closeSesion = () => {
    auth.signOut();
    history.push("/");
  };

  const getTask = async () => {
    const { docs } = await store.collection(usuario).get();
    const newArray = docs.map((item) => ({ id: item.id, ...item.data() }));
    setList(newArray);
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.uid);
      }
    });
    return () => {
      unSubscribe();
      auth.signOut();
      setUsuario(null);
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.task.trim()) {
      alert("Los campos están vacíos");
    } else {
      store.collection(usuario).add(form);
      getTask();
      setForm({ name: "", task: "" });
        
    }
  };

  return (
    <Fragment>
      <h2 className="form__title">Formulario</h2>
      <button onClick={closeSesion}>Cerrar sesión</button>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe el título de la tarea"
          onChange={handleChange}
          name="name"
          value={form.name}
        />
        <input
          type="text"
          placeholder="Esctibe la descripción"
          onChange={handleChange}
          name="task"
          value={form.task}
        />
        <input type="submit" value="Guardar" />
      </form>
      <ul>
        {usuario === null ? (
          <li>No hay usuario</li>
        ) : (
          <List
            setList={setList}
            list={list}
            getTask={getTask}
            usuario={usuario}
          />
        )}
      </ul>
    </Fragment>
  );
};

export default Form;
