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

}