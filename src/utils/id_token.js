import uuid4 from "uuid4";

export const getId_token = () => {
    let id_token = sessionStorage.getItem('id_token')
    if(!id_token) {
        id_token = uuid4()
        sessionStorage.setItem('id_token',id_token)
    }
    return id_token
}