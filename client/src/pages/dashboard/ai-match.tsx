import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Target, TrendingUp, AlertCircle, CheckCircle2, Upload, FileText } from 'lucide-react';

export default function AIMatchPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const matchResults = {
    overallScore: 78,
    categories: [
      { name: 'Technical Skills', score: 85, status: 'excellent' },
      { name: 'Experience Level', score: 72, status: 'good' },
      { name: 'Education', score: 90, status: 'excellent' },
      { name: 'Keywords Match', score: 65, status: 'needs-work' },
    ],
    suggestions: [
      { type: 'add', text: 'Add "Agile methodology" to your skills section' },
      { type: 'add', text: 'Include metrics for your project achievements' },
      { type: 'improve', text: 'Expand on leadership experience' },
      { type: 'match', text: 'Your Python experience aligns well with requirements' },
    ],
    missingKeywords: ['Agile', 'Scrum', 'CI/CD', 'Machine Learning'],
    matchedKeywords: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-indigo-400" />
          AI Job Match
        </h1>
        <p className="text-slate-400">Analyze how well your resume matches a job description</p>
      </div>

      <Card className="bg-slate-900/50 border-slate-800 rounded-2xl p-6 mb-8 animate-fade-in">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          Paste Job Description
        </h2>
        <Textarea
          placeholder="Paste the full job description here to analyze your resume match..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[200px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none rounded-xl"
          data-testid="textarea-job-description"
        />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            {jobDescription.length} characters
          </p>
          <Button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl cursor-pointer px-6"
            data-testid="button-analyze"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Analyze Match
              </span>
            )}
          </Button>
        </div>
      </Card>

      {showResults && (
        <div className="space-y-6 animate-fade-in-up">
          <Card className="bg-slate-900/50 border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-indigo-600/30 flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-white">
                    {matchResults.overallScore}%
                  </span>
                </div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-indigo-500"
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${matchResults.overallScore}%, 0 ${matchResults.overallScore}%)`,
                  }}
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-display font-bold text-white mb-2">
                  Good Match!
                </h2>
                <p className="text-slate-400">
                  Your resume has a strong foundation for this role. A few tweaks could make it even better.
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchResults.categories.map((category, index) => (
              <Card
                key={category.name}
                className="bg-slate-900/50 border-slate-800 rounded-2xl p-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">{category.name}</span>
                  <span className={`text-sm font-semibold ${
                    category.status === 'excellent' ? 'text-emerald-400' :
                    category.status === 'good' ? 'text-indigo-400' : 'text-amber-400'
                  }`}>
                    {category.score}%
                  </span>
                </div>
                <Progress value={category.score} className="h-2 bg-slate-700" />
              </Card>
            ))}
          </div>

          <Card className="bg-slate-900/50 border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              Improvement Suggestions
            </h3>
            <div className="space-y-3">
              {matchResults.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/50"
                >
                  {suggestion.type === 'add' && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  )}
                  {suggestion.type === 'improve' && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    </div>
                  )}
                  {suggestion.type === 'match' && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                    </div>
                  )}
                  <span className="text-slate-300">{suggestion.text}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                Matched Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResults.matchedKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResults.missingKeywords.map((keyword) => (
                  <Badge
                    key={keyword}
                    className="bg-amber-500/20 text-amber-400 border-amber-500/30"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
