import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {
    constructor() { }
    readFile(file: File, subscriber: Subscriber<any>, type=null) {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);

        if(type !== null) {
            filereader.onload = function () {
                subscriber.next(filereader.result);
                subscriber.complete();
              };
        } else {
            filereader.onload = () => {
                // resize
                var img:any = new Image();
                img.src = filereader.result;
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    var ctx: any = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var MAX_WIDTH = 800;
                    var MAX_HEIGHT = 800;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    var ctx: any = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    let dataurl = canvas.toDataURL(file.type);
                    subscriber.next(dataurl);
                    subscriber.complete();
                }
                // end resize
            };
        }
         //thêm phần resize ở đây nhé....

        filereader.onerror = (error) => {
          subscriber.error(error);
          subscriber.complete();
        };
      }

      base64File(file: any, subscriber: Subscriber<any>){
        const reader = new FileReader();
        reader.readAsDataURL(file);
          reader.onload = function () {
              subscriber.next(reader.result);
              subscriber.complete();
          };
      }
}
