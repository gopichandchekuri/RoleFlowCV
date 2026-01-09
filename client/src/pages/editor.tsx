import { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
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
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function EditorPage() {
  const { resume } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.65);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!previewRef.current) return;
    
    setIsExporting(true);
    try {
      const element = previewRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.3));

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              data-testid="link-back-dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <span className="font-medium text-white">{resume.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant={activeTab === 'edit' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('edit')}
              className={`cursor-pointer ${activeTab === 'edit' ? 'bg-indigo-600' : 'text-slate-400'}`}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant={activeTab === 'preview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('preview')}
              className={`cursor-pointer ${activeTab === 'preview' ? 'bg-indigo-600' : 'text-slate-400'}`}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1 bg-slate-800 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="w-8 h-8 text-slate-400 hover:text-white cursor-pointer"
                data-testid="button-zoom-out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400 w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="w-8 h-8 text-slate-400 hover:text-white cursor-pointer"
                data-testid="button-zoom-in"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer"
              data-testid="button-export-pdf"
            >
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Exporting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export PDF</span>
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-64px)]">
          <ResizablePanel defaultSize={40} minSize={30} maxSize={50}>
            <div className="h-full bg-slate-900 p-6 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <ResumeForm />
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          <ResizableHandle className="w-2 bg-slate-800 hover:bg-indigo-600 transition-colors" />
          
          <ResizablePanel defaultSize={60}>
            <div className="h-full bg-slate-950 p-6 overflow-auto">
              <div className="flex justify-center">
                <div
                  style={{
                    width: `${8.5 * zoom}in`,
                    height: `${11 * zoom}in`,
                    overflow: 'hidden',
                  }}
                >
                  <ResumePreview ref={previewRef} resume={resume} scale={zoom} />
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="flex-1 lg:hidden h-[calc(100vh-64px)]">
        {activeTab === 'edit' ? (
          <div className="h-full bg-slate-900 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <ResumeForm />
            </ScrollArea>
          </div>
        ) : (
          <div className="h-full bg-slate-950 p-4 overflow-auto">
            <div className="flex justify-center">
              <div
                style={{
                  width: `${8.5 * 0.45}in`,
                  height: `${11 * 0.45}in`,
                  overflow: 'hidden',
                }}
              >
                <ResumePreview ref={previewRef} resume={resume} scale={0.45} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
