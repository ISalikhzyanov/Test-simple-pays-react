import React from 'react';

const UpdateList = ({user}) => {
    if (!user) {
        return (
            <h5 className="center">Зарегестрированных пользователей не найдено!</h5>
        )
    } else {
        return (
            <div className="center" style={{margin: "20px 20% "}}>
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Текущий пользователь</span>
                            <div><strong>Имя: <span>{user.name}</span></strong></div>
                            <div><strong>Email: <span>{user.email}</span></strong></div>
                            {user.phone ? <div><strong>Номер: <span>{user.phone}</span></strong></div> : ''
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }

};

export default UpdateList;