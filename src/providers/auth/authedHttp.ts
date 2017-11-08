import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthedHttp {

    constructor(private http: Http, public storage: Storage) { }

    post(url: string, body: any, options?: RequestOptionsArgs): Promise<Observable<{}>> {
        return new Promise((resolve, reject) => {
            this._frotzOptions(url, options).then((data) => {
                if (data) {
                    resolve(this.http.post(url, body, data));
                } else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    get(url: string, options?: RequestOptionsArgs): Promise<Observable<{}>> {
        return new Promise((resolve, reject) => {
            this._frotzOptions(url, options).then((data) => {
                if (data) {
                    resolve(this.http.get(url, data));
                } else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Promise<Observable<{}>> {
        return new Promise((resolve, reject) => {
            this._frotzOptions(url, options).then((data) => {
                if (data) {
                    resolve(this.http.put(url, body, data));
                } else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    delete(url: string, options?: RequestOptionsArgs): Promise<Observable<{}>> {
        return new Promise((resolve, reject) => {
            this._frotzOptions(url, options).then((data) => {
                if (data) {
                    resolve(this.http.delete(url, data));
                } else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    private _frotzOptions(urlo: string | Request, options: RequestOptionsArgs): Promise<{}> {
        if (!options) {
            options = {}
        }
        if (!options.headers) {
            options.headers = new Headers();
        }
        return new Promise((resolve, reject) => {
            this.storage.get('token').then(token => {
                options.headers.append('Content-Type', 'application/json');
                options.headers.append('Authorization', 'Bearer ' + token);
                if (token) {
                    resolve(options);
                }
                else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}