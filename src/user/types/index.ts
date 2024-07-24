export type ListUsersParams = {
    skip:number;
    limit:number;
}

export type CreateUserParams ={
    username: string;
    email: string;
    password: string;
}

export type UpdateUserParams = Partial<CreateUserParams>

