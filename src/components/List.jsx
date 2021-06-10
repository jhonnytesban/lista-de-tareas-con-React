import React, { Fragment, useEffect } from 'react';
import { store } from '../firebaseconfig';
import '../styles/List.css'

const List = ({ list, getTask, setList, usuario }) => {

  const delUser = (id) => {
    store.collection(usuario).doc(id).delete();
    getTask();
  };

  useEffect(() => {
    getTask()
    return () => {
      setList([])
    }
  }, []);

  return (
    <Fragment>
      {
        list.length !== 0 ?
          (list.map(item => <li className="list" key={item.id}>{item.name} --- {item.task}
            <button onClick={() => delUser(item.id)}>Borrar</button>
          </li> ))
          :
          (<li>No hay datos</li>)
      }
    </Fragment>
  );
}

export default List;
