import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from './components/loginForm.tsx';
import { Main } from './components/main.tsx';
import { RegisterForm } from './components/registerForm.tsx';

export const App = () => {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/users/*' element={<Main />} />
        </Routes>
      </Router>
    </>
  );
};
