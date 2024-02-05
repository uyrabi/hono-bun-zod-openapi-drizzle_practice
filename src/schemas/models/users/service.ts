import { ServiceTypes } from './schema';

export class Service {
    constructor() {
        console.log('Users.Service');
    }
    static func() {
        console.log('Users.Service.func');
    }
}