export interface Users {
    id : number,
    firstName : string,
    lastName : string,
    gender : string,
    email : string,
    password : string,
    phone : number,
    role : string,
    success : string,
    coverPic : string,
    createdAt : string
}


export interface Posts {
    id : number,
    title : string,
    image : string,
    description : string,
    content : string,
    userId : number,
    status : string,
    category : string,
    createdAt : Date,
    success : string,
    lastName : string,
    firstName : string
}


export interface Category {
    id : number,
    slug : string,
    name : string,
    userId : string,
    createdAt : Date
} 

export interface Story {
    id : number,
    image : string,
    userId : number,
    createdAt : Date
}

export interface StoriesById {
    id : number,
    title : string,
    image : string,
    createdAt : Date,
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
    data : string,
}
