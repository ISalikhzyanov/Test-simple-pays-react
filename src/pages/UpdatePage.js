import React, {useCallback, useContext, useEffect, useState} from 'react';
import InputMask from "react-input-mask"
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import UserList from "../components/UserList";
import {useForm} from "react-hook-form";
import UpdateList from "../components/UpdateList";

const UpdatePage = () => {
    const [user,setUser] = useState()
    const {register, formState: {errors, isValid}, handleSubmit, control} = useForm({
        mode: "onBlur"
    })
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: ''
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
    const getUser = useCallback(async () => {

            const response = await fetch("https://api.sitemap-generator.ru/test-api/user", {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    "Authorization": `Bearer ${auth.auth_key}`
                }
            });
            const data = await response.json()
            setUser(data)
            console.log(user)

    }, [auth.auth_key])

    useEffect(()=>{
        getUser()
    },[getUser])
    const updateUser = useCallback(async () => {
        if (auth.auth_key !== null || auth.auth_key !== undefined) {
            try {
                const response = await fetch("https://api.sitemap-generator.ru/test-api/user", {
                    method: 'PATCH',
                    headers: {
                        'accept': 'application/json',
                        "Authorization": `Bearer ${auth.auth_key}`
                    },
                    body: new URLSearchParams({
                        'name': `${form.name}`,
                        'email': `${form.email}`,
                        'phone': `${form.phone}`
                    })
                });
                const data = await response.json()
                setUser(data)
                if (response.ok) {
                    throw new Error(data.message)
                }
            } catch (e) {
                setError(e.message)
                throw e
            }
        }
    }, [auth.auth_key, form])
    console.log(form)
    return (
        <div>
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
                                <div style={{height: "30px", color: "red"}}>
                                    {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                                </div>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    {...register("email", {
                                        required: 'Обязательное поле для заполнения',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Введите Email!"
                                        }
                                    })}
                                    onChange={changeHandler}
                                    className="validate"/>
                                <label htmlFor="email">Email</label>
                                <div style={{height: "30px", color: "red"}}>
                                    {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                                </div>

                            </div>
                            <div className="input-field">
                                <InputMask
                                    as={InputMask}
                                    control={control}
                                    mask="(+7 (999) 999-99-99)"
                                    placeholder="Введите номер телефона"
                                    id="phone"
                                    type="text"
                                    name="phone"
                                    onChange={changeHandler}
                                    className="validate"/>
                                <label htmlFor="phone">Номер телефона</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn" onClick={handleSubmit(updateUser)}
                                disabled={!isValid}>Создать
                        </button>
                    </div>
                </div>

            </div>
        </div>
            <UpdateList user={user}/>
        </div>)


};

export default UpdatePage;