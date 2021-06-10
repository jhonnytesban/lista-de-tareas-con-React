import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { auth, store } from "../firebaseconfig";
import List from "./List";
import '../styles/Form.css'

const Form = () => {
  const [form, setForm] = useState({ name: "", number: "" });
  const [list, setList] = useState([]);
  const [usuario, setUsuario] = useState(null);

  const history = useHistory();

  const closeSesion = () => {
    auth.signOut();
    history.push("/");
  };

  const getTask = async (user) => {
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

    if (!form.name.trim() || !form.number.trim()) {
      alert("Los campos están vacíos");
    } else {
          store.collection(usuario).add(form);
          getTask();
          setForm({ name: "", number: "" });
          console.log(usuario);
        
    }
  };

  return (
    <Fragment>
      <h2 className="form__title">Formulario</h2>
      <button onClick={closeSesion}>Cerrar sesión</button>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe el nombre"
          onChange={handleChange}
          name="name"
          value={form.name}
        />
        <input
          type="number"
          placeholder="Esctibe el número"
          onChange={handleChange}
          name="number"
          value={form.number}
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
          />
        )}
      </ul>
    </Fragment>
  );
};

export default Form;
