import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class Auth {
    // baseUrl: string = "http://139.59.235.246/api/"
    baseUrl = environment.apiUrl;
    loginDataArray: any = {};
    response:any=[];
    constructor(public http: Http, public storage: Storage) {
        this.storage.ready().then(() => { });
    }

    createAuthorizationHeader(headers: Headers) {
        let token;
        this.storage.get('token').then(data => token = data);
        headers.append('Authorization', token);
    }

    login(data) {
        return this.http.post(this.baseUrl + '/authenticate', { email: data.email, password: data.password })
            // .map((data) => this.extractData(data))
            .map(data => {
                this.response=data;
                 this.extractData(data);
                return this.response;
                //  console.log("response",this.response);

                })
            .catch(err => {
                if (err.status === 401) {
                    return Observable.throw('Unauthorized');
                }
            });
    }

    isLogged() {
        return new Promise((resolve, reject) => {
            this.storage.get('token').then(data => {
                if (tokenNotExpired(null, data) === true)
                    resolve(true);
                else
                    resolve(false);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    logout() {
        this.storage.remove('token');
        return true;
    }

    private extractData(res: Response) {
        let body = res.json();
        body.status = res.status;
        if (body.status === 200) {
            this.storage.set("token", body.token);
            // this.storage.set("userId", body.user.id);
            // this.storage.set("userName", body.user.name);
            // this.storage.set("userEmail", body.user.email);
        };
        return body || {};
    }
}
