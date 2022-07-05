export interface Membership{
    id:number;
    role:RoleStatus;

}

export enum RoleStatus{
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
    USER = 'USER',
}