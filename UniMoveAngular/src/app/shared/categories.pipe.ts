import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categories' })
export class CategoriesPipe implements PipeTransform {
    transform(value: string, args: number = 10): string {
        let result = value;

        switch (value) {
            case '2': {
                result = 'Aperitivi';
                break;
            }
            case '3': {
                result = 'Convention';
                break;
            }
            case '4': {
                result = 'Formazione';
                break;
            }
            case '5': {
                result = 'Dibattiti';
                break;
            }
            default: {
                result = 'Non Definito';
                break;
            }
        }

        return result;
    }
}