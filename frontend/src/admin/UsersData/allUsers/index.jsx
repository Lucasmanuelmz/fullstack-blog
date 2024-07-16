import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance/axiosinstance";

export default function SuperUser() {

    const [userData, setUserData] = useState([]);
    
    function getUser() {
        axios.get('http://localhost:3000/users', axiosInstance).then(user => {
            const users = user.data.users;
            if(userData) {
                setUserData(users);
            }
        }).catch(error => {
            return 'Erro ao obter os dados do usuario '+error.message;
        });
    }
    useEffect(() => {
        if(axiosInstance) {
            getUser()
        }  
    }, [axiosInstance])
    return(
        <div className="container">
        {userData.length > 0 ? (
            <Fragment>
            <main>
                {userData.map((user, key) => (
                    <div key={key} className="container">
                    <p>{user.firstname} {user.lastname}</p>
                    </div>
                ))} 
            </main>
           
            </Fragment>
        ) : (
            <p>Nenhum usuário encontrado</p>
        )}
    </div>
    
    )
}