'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Image, CheckCircle, AlertCircle, ArrowRight, Trash2, Edit, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { LinearProgress } from '@/components/ui/Progress';

const steps = ['Upload', 'OCR Extract', 'AI Cleanup', 'Review', 'Publish'];

import dynamic from 'next/dynamic';

const UploadPageContent = dynamic(() => Promise.resolve(UploadPage), {
  ssr: false,
});

export default function UploadPageWrapper() {
  return <UploadPageContent />;
}

function UploadPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [extractedText, setExtractedText] = useState('');
  const [structuredQuestions, setStructuredQuestions] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [structuring, setStructuring] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const processPDF = async (file) => {
    setProcessing(true);
    setProgress(0);
    setCurrentStep(1);
    
    try {
      // Dynamically load pdfjs only in the browser
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setTotalPages(pdf.numPages);
      
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        setCurrentPage(i);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High scale for better OCR
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ canvasContext: context, viewport }).promise;
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Call our OCR API
        const response = await fetch('/api/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageData, pageNumber: i }),
        });
        
        const result = await response.json();
        if (result.text) {
          fullText += `\n\n--- PAGE ${i} ---\n\n` + result.text;
          setExtractedText(fullText);
        }
        
        setProgress(Math.round((i / pdf.numPages) * 100));
      }
      
      setCurrentStep(2);
    } catch (error) {
      console.error('PDF Processing Error:', error);
      alert('Failed to process PDF. Check console for details.');
    } finally {
      setProcessing(false);
    }
  };

  const structureWithAI = async () => {
    setStructuring(true);
    try {
      const response = await fetch('/api/structure-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText, subject: 'Somali', grade: 'Form 4' }),
      });
      const result = await response.json();
      if (result.questions) {
        setStructuredQuestions(result.questions);
        setCurrentStep(3);
      }
    } catch (error) {
      console.error('Structuring error:', error);
    } finally {
      setStructuring(false);
    }
  };

  const publishToDatabase = async () => {
    setPublishing(true);
    try {
      // In a real app, you'd send these to a /api/publish endpoint
      // that inserts them into the 'questions' table via Supabase
      console.log('Publishing:', structuredQuestions);
      alert(`Successfully published ${structuredQuestions.length} questions to the database!`);
      setCurrentStep(4);
    } catch (error) {
      console.error('Publish error:', error);
    } finally {
      setPublishing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer?.files || []);
    if (dropped.length > 0) {
      setFiles(dropped);
      if (dropped[0].type === 'application/pdf') {
        processPDF(dropped[0]);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  const onFileChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      setFiles(selected);
      if (selected[0].type === 'application/pdf') {
        processPDF(selected[0]);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Upload & OCR</h1>
        <p className="text-muted mt-1">Upload exam PDFs/images and extract questions with AI</p>
      </div>

      {/* Pipeline Steps */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              i <= currentStep ? 'bg-primary/10 text-primary' : 'bg-surface text-muted'
            }`}>
              {i < currentStep ? <CheckCircle size={14} /> : <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs">{i + 1}</span>}
              {step}
            </div>
            {i < steps.length - 1 && <ArrowRight size={14} className="text-muted shrink-0" />}
          </div>
        ))}
      </div>

      {/* Upload Area / Processing */}
      {currentStep <= 1 && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className={`glass-card p-12 text-center border-2 border-dashed border-border transition-all ${
            processing ? 'cursor-wait' : 'hover:border-primary/50 cursor-pointer'
          }`}
          onClick={() => !processing && document.getElementById('fileInput')?.click()}
        >
          {processing ? (
            <div className="space-y-6">
              <Loader2 className="mx-auto text-primary animate-spin" size={48} />
              <div>
                <p className="text-lg font-bold">Processing Page {currentPage} of {totalPages}</p>
                <p className="text-sm text-muted">AI is reading and transcribing the exam...</p>
              </div>
              <div className="max-w-md mx-auto">
                <LinearProgress value={progress} color="var(--primary)" />
                <p className="text-xs text-muted mt-2">{progress}% Complete</p>
              </div>
            </div>
          ) : (
            <>
              <Upload className="mx-auto text-muted mb-4" size={48} />
              <p className="text-lg font-semibold mb-2">Drop exam files here</p>
              <p className="text-sm text-muted mb-4">PDF, JPG, PNG — Max 20MB each</p>
              <Button variant="secondary">Browse Files</Button>
              <input id="fileInput" type="file" multiple accept=".pdf" className="hidden"
                onChange={onFileChange} />
            </>
          )}
        </div>
      )}

      {/* OCR Preview */}
      {currentStep >= 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card hover={false}>
            <h3 className="font-bold mb-3 flex items-center gap-2"><Image size={16} /> Original</h3>
            <div className="bg-surface rounded-xl p-8 text-center min-h-[300px] flex items-center justify-center">
              <div className="text-muted">
                <FileText size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Exam file preview</p>
                {files[0] && <p className="text-xs mt-1">{files[0].name}</p>}
              </div>
            </div>
          </Card>

          <Card hover={false}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold flex items-center gap-2"><FileText size={16} /> Extracted Text</h3>
              <Badge color="green">AI Cleaned</Badge>
            </div>
            <textarea
              className="w-full bg-surface rounded-xl p-4 text-sm font-mono min-h-[300px] border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={structureWithAI} loading={structuring}>
                {structuring ? 'AI is thinking...' : 'Structure with AI'}
              </Button>
              <Button size="sm" variant="secondary" icon={Edit}>Edit Text</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Review & Publish */}
      {currentStep >= 3 && (
        <Card hover={false}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Structured Questions ({structuredQuestions.length})</h3>
            <Badge color={currentStep === 4 ? 'green' : 'yellow'}>
              {currentStep === 4 ? 'Published' : 'Pending Review'}
            </Badge>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {structuredQuestions.map((q, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-surface/30">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold">Q{i + 1}: {q.topic}</p>
                  <Badge color="blue" variant="outline" className="text-[10px]">{q.difficulty}</Badge>
                </div>
                <p className="text-sm mb-3">{q.question_text}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                   {['a', 'b', 'c', 'd'].map(l => (
                     <div key={l} className={`text-xs p-2 rounded-lg border ${q.correct_answer === l.toUpperCase() ? 'border-green-500 bg-green-500/10' : 'border-border'}`}>
                       <span className="font-bold uppercase mr-1">{l})</span> {q[`option_${l}`]}
                     </div>
                   ))}
                </div>
                <p className="text-[10px] text-muted italic">Ex: {q.explanation}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={publishToDatabase} loading={publishing} disabled={currentStep === 4}>
              {publishing ? 'Publishing...' : 'Confirm & Publish to Database'}
            </Button>
            <Button variant="secondary" onClick={() => setCurrentStep(2)}>Back to Text</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
