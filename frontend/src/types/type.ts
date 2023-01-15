export interface Users {
    id : number,
    firstName : string,
    lastName : string,
    gender : string,
    email : string,
    password : string,
    phone : number,
    role : string,
    success : string
}
export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

export interface User {
    email : string,
    password : string,
    success : boolean,
    data : string
}