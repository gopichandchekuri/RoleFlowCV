import { useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { useResume } from '@/lib/resumeContext';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, ZoomIn, ZoomOut, FileText, Loader2 } from 'lucide-react';
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
    const toastId = toast.loading('Generating text-based PDF with active links...');
    
    try {
      const element = previewRef.current;
      
      // jsPDF with html() method for native link and text support
      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });

      // Using the html method to preserve text layers and <a> tags
      // This ensures text is selectable and links are functional
      await pdf.html(element, {
        callback: function (doc) {
          doc.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
          toast.success('Text-based PDF with active links downloaded!', { id: toastId });
          setIsExporting(false);
        },
        x: 0,
        y: 0,
        width: 210, // A4 width in mm
        windowWidth: 800, // Fixed window width to maintain full-width layout and prevent shrinking
        autoPaging: 'text',
        html2canvas: {
          scale: 1, // Text-based export doesn't need high scale like image flattening
          useCORS: true,
          letterRendering: true,
          logging: false
        }
      });
    } catch (e) {
      console.error(e);
      toast.error('Export failed. Please try again.', { id: toastId });
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
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} className="w-7 h-7 text-slate-400"><ZoomOut className="w-4 h-4" /></Button>
            <span className="text-[10px] font-bold text-slate-500 w-8 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="w-7 h-7 text-slate-400"><ZoomIn className="w-4 h-4" /></Button>
          </div>
          <Button onClick={handleExportPDF} disabled={isExporting} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-9 px-4 rounded-xl shadow-lg shadow-indigo-600/20">
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />} Export PDF
          </Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[400px] border-r border-slate-800 bg-slate-900/20 p-6 overflow-y-auto scrollbar-hide shrink-0"><ResumeForm /></aside>
        <main className="flex-1 bg-slate-950 p-12 overflow-auto flex justify-center items-start">
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
