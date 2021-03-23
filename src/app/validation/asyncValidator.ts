// このコードは遅延の概念を使用しています。これは、すべての入力値をサーバーに送信するわけではないことを意味します。代わりに、ユーザーが入力した値を1秒ごとに送信します。必要に応じてタイマー値を変更できます。
// shouldBeUniqueはエラープロパティです。HTMLでこのプロパティをキャッチする必要があり、条件に基づいてメッセージが表示されます。この名前は変更できます。ただし、変数の命名規則に従って、このようなプロパティ名を作成してください。

import { UniqueService } from '../services/unique.service';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";

import {of, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

export  class AsyncValidator{

    constructor(private uniqueService: UniqueService){ }

    static checkUserName(uniqueService: UniqueService){
        return (control: AbstractControl) => {

            return timer(1000).pipe(
                switchMap(() => {

                return uniqueService.checkUserName(control.value).then(res => {
                    //console.log(typeof res);
                    return res ? { shouldBeUnique: true } : null;
                  });
                })


            )};
     }
}

