import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {
    public fromContent(content: string, filename: string): void {
        const blob: Blob = new Blob([content], { type: 'text/csv' });

        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}