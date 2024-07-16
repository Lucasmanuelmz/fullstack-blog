import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
    const [userAccount, setUserAccount] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: ''
    });

    const navigate = useNavigate()

    function handleSubmit() {
      axios.post('http://localhost:3000/user', userAccount)
      .then(response => {
        if(response.ok) {
        setInterval(() => {
          navigate('/dashboard')
        }, 3000)
        } else {
         <p>Nao foi possivel criar a sua conta</p>
            }
        }).then(error => {
            <p>Erro no servidor: {error.message}</p>
     })
    }
    
    function handleChange(e) {
      const {name, value} = e.target;
      setUserAccount(prevUserData => ({
        ...prevUserData,
      [name]: value,
      }))
    }
    return(
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Crie uma conta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nome de usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  value={userAccount.username}
                  onChange={handleChange}
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome:
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={userAccount.firstname}
                  onChange={handleChange}
                  name="firstname"
                  type="text"
                  required
                  autoComplete="first-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          <div>
              <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                Sobrenome:
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  value={userAccount.lastname}
                  onChange={handleChange}
                  name="lastname"
                  type="text"
                  required
                  autoComplete="last-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email:
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={userAccount.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Tel:
              </label>
              <div className="mt-2">
                <input
                  id="phone-number"
                  value={userAccount.phoneNumber}
                  onChange={handleChange}
                  name="phoneNumber"
                  type="tel"
                  required
                  autoComplete="phone-number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha:
                </label>
                <div className="text-sm">
                  <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Ja tem uma conta?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={userAccount.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Criar conta
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
          Você já possui uma conta conosco?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Entra na conta
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
