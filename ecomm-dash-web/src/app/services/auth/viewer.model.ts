import {Role} from './role.model';

export interface Viewer {
    id: number;
    username: string;
    password: string;
    role: Role;
}