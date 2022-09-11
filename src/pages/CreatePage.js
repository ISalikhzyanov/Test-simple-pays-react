import React, {useContext, useEffect, useState} from 'react';
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import UserList from "../components/UserList";
import {useForm} from "react-hook-form";

const CreatePage = () => {
    const {register, formState: {errors, isValid}, handleSubmit} = useForm({
        mode: "onBlur"
    })
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: ''
    })
    useEffect(() => {
        message(error)
    }, [message, error])
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registrationHandler = async () => {

        try {
            const response = await fetch("https://api.sitemap-generator.ru/test-api/user", {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    "X-Application-Token": "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831"
                },
                body: new URLSearchParams({
                    'name': `${form.name}`,
                    'email': `${form.email}`,
                })
            });
            const data = await response.json()
            auth.login(data.auth_key, data.name)
            if (!response.ok) {
                throw new Error(data.message || "Что-то пошло не так")
            }
            return data
        } catch (e) {
            setError(e.message)
            throw e
        }

    }
    if (auth.auth_key === null || auth.auth_key === undefined) {
        return (
            <div className="row">
                <div className="col s6 offset-s3">
                    <h3 className="center">Страница создания пользователя</h3>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Регистрация</span>
                            <div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите ФИО"
                                        id="name"
                                        type="text"
                                        name="name"
                                        {...register("name", {
                                            required: 'Поле обязательно для заполнения',
                                            minLength: {
                                                value: 10,
                                                message: 'Минимум 10 символов'
                                            },
                                            pattern: {
                                                value: /[A-Za-z, А-Яа-я]{3}/,
                                                message: 'Используйте Английский или Русский алфавит'
                                            }
                                        })}
                                        onChange={changeHandler}
                                        className="validate"/>
                                    <label htmlFor="name">ФИО</label>
                                    <div style={{height: "30px", color:"red"}}>
                                        {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                                    </div>
                                </div>
                                <div className="input-field">
                                    <input
                                        placeholder="Введите email"
                                        id="email"
                                        type="text"
                                        name="email"
                                        {...register("email",{
                                            required: 'Обязательное поле для заполнения',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Введите Email!"
                                            }
                                        })}
                                        onChange={changeHandler}
                                        className="validate"/>
                                    <label htmlFor="email">Email</label>
                                    <div style={{height: "30px", color:"red"}}>
                                        {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn" onClick={handleSubmit(registrationHandler)} disabled={!isValid}>Создать</button>
                        </div>
                    </div>
                </div>
            </div>)
    } else {
        return (
            <UserList/>
        )
    }

};

export default CreatePage;