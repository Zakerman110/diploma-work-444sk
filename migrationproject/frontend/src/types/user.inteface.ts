export type User = null | {
    id: number;
    name: string;
    email: string;
    is_superuser: boolean,
    exp: number;
}