import { User } from './user';

export interface Activity {

    title: string;
    description: string;
    users: Array<User>;

}
