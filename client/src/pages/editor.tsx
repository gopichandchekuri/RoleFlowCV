import { useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useResume } from '@/lib/resumeContext';
import ResumeForm from '@/components/resume/ResumeForm';
import ResumePreview from '@/components/resume/ResumePreview';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Download,
  Eye,
  Pencil,
  ZoomIn,
  ZoomOut,
  FileText,
  Loader2,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

export default function EditorPage() {
  const { resume } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.65);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState(false);
  const [, setLocation] = useLocation();

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    const toastId = toast.loading('Generating your professional PDF...');
    
    try {
      // Create a hidden clone to render at full scale for high quality
      const element = previewRef.current;
      const originalTransform = element.style.transform;
      
      // Temporarily reset scale for capture
      element.style.transform = 'scale(1)';
      
      const canvas = await html2canvas(element, {
        scale: 3, // High DPI
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 816, // 8.5in * 96dpi
        windowHeight: 1056, // 11in * 96dpi
      });
      
      // Restore scale
      element.style.transform = originalTransform;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
        compress: true,
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 8.5, 11);
      pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      
      toast.success('Resume downloaded successfully!', { id: toastId });
    } catch (error) {
      console.error('PDF Export Error:', error);
      toast.error('Failed to generate PDF. Please try again.', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans">
      <header className="sticky top-0 z-50 glass border-b border-slate-800/50">
        <div className="flex items-center justify-between px-4 lg:px-8 h-16">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/dashboard')}
              className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl px-3"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white block leading-none">{resume.name}</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Draft Auto-saved</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 bg-slate-900/50 border border-slate-800 rounded-xl p-1">
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} className="w-8 h-8 text-slate-400 hover:text-white rounded-lg"><ZoomOut className="w-4 h-4" /></Button>
              <span className="text-[11px] font-bold text-slate-500 w-10 text-center">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} className="w-8 h-8 text-slate-400 hover:text-white rounded-lg"><ZoomIn className="w-4 h-4" /></Button>
            </div>

            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-6 h-10 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Download className="w-4 h-4 mr-2" />}
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={35} minSize={30}>
            <div className="h-full bg-[#0b0f1a] border-r border-slate-800/50 flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div className="max-w-xl mx-auto">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-2">Build your resume</h2>
                    <p className="text-sm text-slate-500">The preview on the right updates instantly as you type.</p>
                  </div>
                  <ResumeForm />
                </div>
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="w-1.5 bg-slate-900 hover:bg-indigo-600/30 transition-colors" />
          
          <ResizablePanel defaultSize={65}>
            <div className="h-full bg-[#020617] overflow-auto p-12 flex justify-center items-start">
              <div 
                className="relative bg-white shadow-2xl shadow-black/50"
                style={{ 
                  width: `${8.5 * zoom}in`, 
                  height: `${11 * zoom}in`,
                  transition: 'width 0.2s ease, height 0.2s ease'
                }}
              >
                <ResumePreview ref={previewRef} resume={resume} scale={zoom} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
