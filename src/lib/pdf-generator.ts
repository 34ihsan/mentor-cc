import { jsPDF } from "jspdf";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface ContractData {
    studentName: string;
    programName: string;
    institutionName: string;
    amount: number;
    currency: string;
    date: Date;
}

export const generateContractPDF = (data: ContractData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 51, 102); // Primary color
    doc.text("Mentor Career Consulting", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Danışmanlık Hizmet Sözleşmesi", pageWidth / 2, 28, { align: "center" });

    // Horizontal Line
    doc.setDrawColor(230, 230, 230);
    doc.line(20, 35, pageWidth - 20, 35);

    // Content
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("Taraflar ve Konu", 20, 50);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const content = `İşbu sözleşme, bir tarafta Mentor Career Consulting Danışmanlık (bundan sonra 'Şirket' olarak anılacaktır) ile diğer tarafta ${data.studentName} (bundan sonra 'Öğrenci' olarak anılacaktır) arasında, ${data.institutionName} bünyesindeki ${data.programName} programına başvuru ve danışmanlık sürecini kapsamak üzere akdedilmiştir.`;
    
    const splitText = doc.splitTextToSize(content, pageWidth - 40);
    doc.text(splitText, 20, 60);

    // Details Table-like structure
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 90, pageWidth - 40, 40, "F");
    
    doc.setFont("helvetica", "bold");
    doc.text("Program Detayları:", 25, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Kurum: ${data.institutionName}`, 25, 110);
    doc.text(`Program: ${data.programName}`, 25, 120);
    
    doc.setFont("helvetica", "bold");
    doc.text("Ücretlendirme:", pageWidth / 2 + 10, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Toplam Tutar: ${data.amount} ${data.currency}`, pageWidth / 2 + 10, 110);
    doc.text(`Tarih: ${format(data.date, "dd MMMM yyyy", { locale: tr })}`, pageWidth / 2 + 10, 120);

    // Signatures
    doc.setFontSize(10);
    doc.text("Şirket Kaşe/İmza", 40, 160);
    doc.text("Öğrenci İmza", pageWidth - 70, 160);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(30, 180, 80, 180);
    doc.line(pageWidth - 80, 180, pageWidth - 30, 180);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text("Bu belge Mentor Career Consulting sistemi tarafından otomatik olarak oluşturulmuştur.", pageWidth / 2, 285, { align: "center" });

    doc.save(`Sozlesme_${data.studentName.replace(/\s+/g, '_')}.pdf`);
};
