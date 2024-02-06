import { ServiceTypes } from './types';

// *** リポジトリ層にそぐわないロジックを実装する

export class Service {
    constructor() {
        console.log('Dummys.Service');
    }
    static func() {
        console.log('Dummys.Service.func');
    }
}