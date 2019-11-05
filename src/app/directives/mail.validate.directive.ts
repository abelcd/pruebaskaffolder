/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5db9c009c6ce4c4de2ba31c9
*
* You will get 10% discount for each one of your friends
* 
*/
import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[isMail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MailValidator, multi: true }]
})
export class MailValidator implements Validator {
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  validate(control: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    const mail = control.value;

    const regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!mail) return null;

    if (!regExpMail.test(mail)) {
      this.renderer.addClass(this.elRef.nativeElement, 'is-invalid');
      return {
        validateEqual: false
      };
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'is-invalid');
    }
    return null;
  }
}
