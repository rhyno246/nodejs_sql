export interface Users {
    id : number,
    firstName : string,
    lastName : string,
    gender : string,
    email : string,
    password : string,
    phone : number,
    role : string,
}

export interface User {
    email : string,
    password : string,
    success : boolean,
    data : string
}