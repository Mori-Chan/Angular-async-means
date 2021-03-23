//これは、ポインティングサーバーを簡単に変更できる唯一の場所です。このアプローチは、別のサーバーに切り替える場合に非常に役立ちます。

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  static getIPAddress() {
    // let ip="http://localhost/"
    let ip="http://nodetech.heteml.net/"
    // let ip="http://127.0.0.1/async/" //for mac only

    return ip;
  }
}
