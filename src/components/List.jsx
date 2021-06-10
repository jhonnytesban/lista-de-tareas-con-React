import React, { Fragment, useEffect } from 'react';
import { auth, store } from '../firebaseconfig';
import '../styles/List.css'

const List = ({ list, getTask, setList }) => {

  const delUser = (id) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        store.collection(user.uid).doc(id).delete();
        getTask(user.uid);
      }
    });
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
          (list.map(item => <li className="list" key={item.id}>{item.name} --- {item.number}
            <button onClick={() => delUser(item.id)}>Borrar</button>
          </li> ))
          :
          (<li>No hay datos</li>)
      }
    </Fragment>
  );
}

export default List;
