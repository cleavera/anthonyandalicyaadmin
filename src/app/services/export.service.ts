import { Injectable } from '@angular/core';
import { ISchema, SCHEMA_REGISTER } from '@skimp/schema';
import { TranslatePipe } from '../pipes/translate.pipe';

@Injectable()
export class ExportService {
    private _translatePipe: TranslatePipe;

    constructor(translatePipe: TranslatePipe) {
        this._translatePipe = translatePipe;
    }

    public asCSV<T>(data: Array<T>, schema: ISchema<T>): string {
        const fields: Array<keyof T> = (SCHEMA_REGISTER.getFields(schema as any) ?? []) as any;
        let exportedData: string = fields.join('\t');

        data.forEach((row: T): void => {
            exportedData += `\n`;

            exportedData += fields.map((field: keyof T) => {
               return this._translatePipe.transform(row[field] as any);
            }).join('\t');
        });

        return exportedData;
    }
}
