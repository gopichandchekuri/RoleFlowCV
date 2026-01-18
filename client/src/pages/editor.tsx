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
    const toastId = toast.loading('Exporting high-quality PDF...');
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false,
        width: 8.5 * 96, // Fixed width in pixels for A4/Letter consistency
        height: 11 * 96
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'in', 
        format: 'letter' 
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
      pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      toast.success('Downloaded successfully!', { id: toastId });
    } catch (e) {
      console.error(e);
      toast.error('Export failed', { id: toastId });
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
            style={{ 
              width: `${8.5 * zoom}in`, 
              height: `${11 * zoom}in`,
              transition: 'all 0.2s ease-out'
            }} 
            className="shadow-2xl shadow-black/50 bg-white origin-top"
          >
            <ResumePreview ref={previewRef} resume={resume} scale={zoom} />
          </div>
        </main>
      </div>
    </div>
  );
}
