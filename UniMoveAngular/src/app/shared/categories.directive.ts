import { Directive, ElementRef } from '@angular/core';
import { AppService } from './app.service';

@Directive({ 
   selector: '[category]',
   inputs: ['category']
})

export class CategoryDirective {
    constructor(
        private el: ElementRef,
        private appService: AppService
    ) {
       this.el = el;
    }

    set category(category :number){
        if (category == 2){
            this.el.nativeElement.style.backgroundColor = '#fd99af';
        }
        if (category == 3){
            this.el.nativeElement.style.backgroundColor = '#b393da';
        }
        if (category == 4){
            this.el.nativeElement.style.backgroundColor = '#9692eb';
        }
        if (category == 5){
            this.el.nativeElement.style.backgroundColor = '#ff9b92';
        }
        this.appService.filter.subscribe(arg =>{
            if (arg == -1){
                this.el.nativeElement.style.display = 'initial';
            }
            else{
                if (arg == category){
                    this.el.nativeElement.style.display = 'initial';
                }
                else{
                    this.el.nativeElement.style.display = 'none';
                }
            }
        })
    }
}