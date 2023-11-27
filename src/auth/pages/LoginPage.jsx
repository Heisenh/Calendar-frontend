
import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import '../styles/loginPage.css';
import Swal from 'sweetalert2';


const loginForm = {
  loginEmail: '',
  loginPassword: ''
}

const registerForm = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordConfirm: ''
}


export const LoginPage = () => {

  const {errorMessage, startLogin, startRegisterUser} = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange
  } = useForm(loginForm);
  
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    onInputChange: onRegisterInputChange
  } = useForm(registerForm);


  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);


  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  };


  const registerSubmit = (event) => {
    event.preventDefault();

    if (registerPassword !== registerPasswordConfirm) {
      Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error');
      return;
    }

    startRegisterUser({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };


  return (
    <div className="container login-container">
      <div className="d-flex flex-row justify-content-center">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-5">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2 d-flex justify-content-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-5">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPasswordConfirm'
                value={registerPasswordConfirm}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-1 d-flex justify-content-center">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}