import { useRef, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useResume } from '@/lib/resumeContext';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ZoomIn, ZoomOut, FileText, Loader2, Cloud } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export default function EditorPage() {
  const { resumes, saveResumeToDb, isLoading: isSaving } = useResume();
  
  // Use optional chaining and fallback to ensure 'resume' is never undefined
  const resume = resumes?.[0] || {
    personalInfo: { fullName: '' },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    certifications: [],
    skills: { technical: [], tools: [], soft: [] }
  };
  
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.7);
  const [isExporting, setIsExporting] = useState(false);
  const [, setLocation] = useLocation();

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    const toastId = toast.loading('Generating high-quality PDF with clickable links...');
    
    try {
      const element = previewRef.current;
      
      const originalTransform = element.style.transform;
      element.style.transform = 'none';
      
      await new Promise(resolve => setTimeout(resolve, 150));

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
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4' 
      });
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      const links = element.querySelectorAll('a');
      const elementRect = element.getBoundingClientRect();
      
      const scaleX = pdfWidth / elementWidth;
      const scaleY = pdfHeight / elementHeight;

      links.forEach((link) => {
        const linkRect = link.getBoundingClientRect();
        const x = (linkRect.left - elementRect.left) * scaleX;
        const y = (linkRect.top - elementRect.top) * scaleY;
        const w = linkRect.width * scaleX;
        const h = linkRect.height * scaleY;

        if (link.href) {
          pdf.link(x, y, w, h, { url: link.href });
        }
      });

      element.style.transform = originalTransform;
      
      const fileName = resume?.personalInfo?.fullName 
        ? `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';

      pdf.save(fileName);
      toast.success('Professional PDF exported!', { id: toastId });
    } catch (e) {
      console.error('PDF generation error:', e);
      toast.error('Failed to generate PDF.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-screen bg-[#020617] flex flex-col overflow-hidden">
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/dashboard')} className="text-slate-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" /> Dashboard
          </Button>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">
              {/* Added Optional Chaining here to prevent the crash */}
              {resume?.personalInfo?.fullName || "Untitled Resume"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1">
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} className="text-slate-400">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-[10px] font-bold text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="text-slate-400">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          <Button 
            onClick={saveResumeToDb} 
            disabled={isSaving} 
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all active:scale-95"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Cloud className="w-4 h-4 mr-2 text-emerald-400" />}
            Save to Cloud
          </Button>

          <Button onClick={handleExportPDF} disabled={isExporting} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-9 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95">
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} 
            Export PDF
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
            {/* Added check to only render preview if resume is ready */}
            {resume && <ResumePreview ref={previewRef} resume={resume} scale={(210 * zoom) / 210} />}
          </div>
        </main>
      </div>
    </div>
  );
}