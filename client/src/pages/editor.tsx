import { useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useResume } from '@/lib/resumeContext';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ZoomIn, ZoomOut, FileText, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export default function EditorPage() {
  const { resume } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.7);
  const [isExporting, setIsExporting] = useState(false);
  const [, setLocation] = useLocation();

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading('Generating high-resolution PDF with active links...');
    
    try {
      const element = previewRef.current;
      
      // We must capture the element at its natural size for accurate link mapping
      const originalTransform = element.style.transform;
      element.style.transform = 'none';
      
      // Wait for a tick to ensure the DOM has rendered the unscaled version
      await new Promise(resolve => setTimeout(resolve, 100));

      const elementRect = element.getBoundingClientRect();
      const elementWidth = element.offsetWidth;
      const elementHeight = element.offsetHeight;

      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false,
        width: elementWidth,
        height: elementHeight
      });
      
      // Restore the preview zoom immediately
      element.style.transform = originalTransform;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4' 
      });
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Draw the crisp image onto the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // --- ADVANCED LINK OVERLAY ENGINE ---
      // We query all links and map them to PDF coordinates
      const links = element.querySelectorAll('a');
      const scaleX = pdfWidth / elementWidth;
      const scaleY = pdfHeight / elementHeight;

      links.forEach((link) => {
        // Use getBoundingClientRect to get the true position relative to the element
        const linkRect = link.getBoundingClientRect();
        
        // Calculate coordinates relative to the top-left of the resume container
        const x = (linkRect.left - elementRect.left) * scaleX;
        const y = (linkRect.top - elementRect.top) * scaleY;
        const w = linkRect.width * scaleX;
        const h = linkRect.height * scaleY;
        
        // Add the interactive layer
        pdf.link(x, y, w, h, { url: link.href });
      });

      pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      toast.success('PDF Exported with active hyperlinks!', { id: toastId });
    } catch (e) {
      console.error('PDF generation error:', e);
      toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex flex-col overflow-hidden">
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/dashboard')} className="text-slate-400 hover:text-white"><ArrowLeft className="w-4 h-4 mr-2" /> Dashboard</Button>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-400" /><span className="text-sm font-bold text-white">{resume.name}</span></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} className="text-slate-400"><ZoomOut className="w-4 h-4" /></Button>
            <span className="text-[10px] font-bold text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="text-slate-400"><ZoomIn className="w-4 h-4" /></Button>
          </div>
          <Button onClick={handleExportPDF} disabled={isExporting} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-9 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} Export PDF
          </Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[400px] border-r border-slate-800 bg-slate-900/20 p-6 overflow-y-auto scrollbar-hide shrink-0 transition-all">
          <ResumeForm />
        </aside>
        <main className="flex-1 bg-slate-950 p-12 overflow-auto flex justify-center items-start scroll-smooth">
          <div 
            className="shadow-2xl shadow-black/50 bg-white origin-top"
            style={{ 
              width: `${210 * zoom}mm`, 
              height: `${297 * zoom}mm`,
              transition: 'all 0.1s ease-out'
            }}
          >
            <ResumePreview ref={previewRef} resume={resume} scale={(210 * zoom) / 210} />
          </div>
        </main>
      </div>
    </div>
  );
}
