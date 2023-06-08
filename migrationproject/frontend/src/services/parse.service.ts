import Papa from 'papaparse';

export const exportToCsv = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', filename);
    link.click();
};