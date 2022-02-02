import './App.css';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Icon from '@ant-design/icons'

import { list, listCleanup } from './redux/actions/list';
import { create, createCleanup } from './redux/actions/create';
import { deletes, deletesCleanup } from './redux/actions/delete';
import { List, message, Spin } from 'antd';

import { ReactComponent as Trash } from './helper/trash.svg';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)
  const listState = useSelector(s => s.list);
  const deleteState = useSelector(s => s.deletes);
  const createState = useSelector(s => s.create);
  const dispatch = useDispatch();
  const userSchema = Yup.object().shape({
    username: Yup.string().required(),
    first_name: Yup.string().required(),
    last_name: Yup.string(),
    date_of_birth: Yup.string().test('check date format', 'invalid date', (value) => moment(value, 'DD-MM-YYYY').isValid)
  })

  useEffect(() => {
    dispatch(list())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (listState.isSuccessful) {
      setUsers(listState.data);
      setLoading(false)
      dispatch(listCleanup());
    } else if (listState.error) {
      message.error(listState.error);
      setLoading(false)
      dispatch(listCleanup());
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listState])

  useEffect(() => {
    if (createState.isSuccessful) {
      message.success('user created successfully');
      setLoading(false)
      dispatch(list());
      dispatch(createCleanup());
    } else if (createState.error) {
      message.error(createState.error);
      setLoading(false);
      dispatch(createCleanup());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createState])

  useEffect(() => {
    if (deleteState.isSuccessful) {
      message.success('user deleted successfully');
      dispatch(list());
      setLoading(false)
      dispatch(deletesCleanup());
    } else if (deleteState.error) {
      message.error(deleteState.error);
      setLoading(false)
      dispatch(deletesCleanup());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteState])

  return (
    <div className="App">
        { loading && <Spin /> }
        <Formik 
          className='top-form'
          validationSchema={userSchema} 
          initialValues={{
            username: '', first_name: '', last_name: '', date_of_birth: ''
          }} 
          onSubmit={(values)=>{dispatch(create(values)); setLoading(true);}}
        >
          {
            ({
              values, handleBlur, handleChange, handleSubmit, errors
            }) => (
              <form onSubmit={handleSubmit}>
                <div id='top' style={{display: 'flex', width: '80%', flexGrow: '1'}}>
                <div className='input-container'>
                    <div className='input-group'>
                      <label htmlFor='first_name'>First name</label>
                      <input type='text' onChange={handleChange('first_name')} value={values.first_name} placeholder='First name' />
                      { errors.first_name && <p className='error-message'>{errors.first_name}</p> }
                    </div>
                    <div className='input-group'>
                      <label htmlFor='username'>Username</label>
                      <input type='text' onChange={handleChange('username')} value={values.username} placeholder='Username' />
                      { errors.username && <p className='error-message'>{errors.username}</p> }
                    </div>
                  </div>
                  <div className='input-container'>
                  <div className='input-group'>
                      <label htmlFor='last_name'>Last name</label>
                      <input type='text' onChange={handleChange('last_name')} value={values.last_name} placeholder='Last name' />
                      { errors.last_name && <p className='error-message'>{errors.last_name}</p> }
                    </div>
                    <div className='input-group'>
                      <label htmlFor='date_of_birth'>Date of Birth</label>
                      <input type='text' onChange={handleChange('date_of_birth')} value={values.date_of_birth} placeholder='Date of Birth' />
                      { errors.date_of_birth && <p className='error-message'>{errors.date_of_birth}</p> }
                    </div>
                  </div>
                  <div className='input-group input-container'>
                    <button type='submit'>Submit</button>
                  </div>
                </div>
                
              </form>
            )
          }
        </Formik>
      <div className='table'>
        <List
          dataSource={users}
          header={<div>Users</div>}
          renderItem={(item) => (
            <List.Item>
                <p className='avatar'>{item.first_name[0]}{item.last_name[0]}</p>
                <p className='username'>{item.username}</p>
                <p className='full-name'>{item.first_name} {item.last_name}</p>
                <p className='dob'>{item.date_of_birth}</p>
                <Icon component={Trash} onClick={()=>{dispatch(deletes(item.username)); setLoading(true);}} />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default App;
