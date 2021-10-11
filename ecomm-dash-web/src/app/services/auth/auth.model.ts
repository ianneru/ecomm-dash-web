import {Viewer} from './viewer.model';

export interface Auth {
    viewer: Viewer;
    token?: string;
}