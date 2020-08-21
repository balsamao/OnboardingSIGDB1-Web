import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class DataService {

    public formatarString(data: string, mascara: string): string {
        if (data != null && data != undefined) {
            let info = data.split('/');
            data = `${info[2]}-${info[1]}-${info[0]}T00:00:00`;
            return moment(new Date(data)).format(mascara);
        }
        return "";
    }

    public today(): string {
        let date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        return (year + "-" + month + "-" + day);
    }

}