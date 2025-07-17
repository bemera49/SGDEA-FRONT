/**

 */

import { UntypedFormControl } from '@angular/forms';

export function ValidatorTypeFileInputFile(types: any) {
    return function (control: UntypedFormControl) {
        const file = control.value;

        if(file) {
            const extension = file.name.split('.')[1].toLowerCase();

            types.forEach(data => {
                if(data.type.toLowerCase() !== extension.toLowerCase()) {
                    return {
                        validatorTypeFileInputFile: true
                    };
                }
            });
        
            return null;
        }
        return null;
    };
}