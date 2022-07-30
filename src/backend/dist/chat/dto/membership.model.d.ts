export interface Membership {
    id: number;
    role: RoleStatus;
}
export declare enum RoleStatus {
    ADMIN = "ADMIN",
    OWNER = "OWNER",
    USER = "USER"
}
