import * as XLSX from 'xlsx';
import { format } from 'date-fns';

interface ApplicationReportData {
    id: string;
    studentName: string;
    studentEmail: string;
    program: string;
    institution: string;
    status: string;
    advisor: string;
    createdAt: Date;
}

export const exportApplicationsToExcel = (data: ApplicationReportData[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(app => ({
        "Başvuru ID": app.id,
        "Öğrenci": app.studentName,
        "E-posta": app.studentEmail,
        "Program": app.program,
        "Kurum": app.institution,
        "Durum": app.status,
        "Danışman": app.advisor,
        "Tarih": format(new Date(app.createdAt), "dd.MM.yyyy HH:mm")
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Başvurular");

    const fileName = `Basvurular_Raporu_${format(new Date(), "yyyy-MM-dd_HHmm")}.xlsx`;
    XLSX.writeFile(workbook, fileName);
};
