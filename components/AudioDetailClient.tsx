'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, MessageSquare, HelpCircle, CheckCircle, XCircle } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import type { AudioEntry } from '@lib/audioIndex';

interface AudioDetailClientProps {
  audio: AudioEntry;
}

export function AudioDetailClient({ audio }: AudioDetailClientProps) {
  const [showTranscript, setShowTranscript] = useState(true);
  const [showVocab, setShowVocab] = useState(true);
  const [showQuiz, setShowQuiz] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const checkAllAnswers = () => {
    if (!audio.quiz) return;
    const results: Record<string, boolean> = {};
    audio.quiz.forEach(q => {
      results[q.id] = true;
    });
    setShowResults(results);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults({});
  };

  const allAnswered = audio.quiz ? audio.quiz.every(q => selectedAnswers[q.id] !== null && selectedAnswers[q.id] !== undefined) : false;
  const submitted = audio.quiz ? audio.quiz.every(q => showResults[q.id]) : false;

  return (
    <div className="space-y-6">
      <AudioPlayer src={audio.file} title={audio.title} />

      <div className="border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full flex items-center justify-between px-5 py-4 bg-card hover-elevate transition-colors"
          data-testid="button-toggle-transcript"
        >
          <span className="flex items-center gap-2 font-medium">
            <MessageSquare className="h-5 w-5 text-primary" />
            Transcript
          </span>
          {showTranscript ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
        {showTranscript && (
          <div className="px-5 py-4 border-t bg-background" data-testid="section-transcript">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {audio.transcript.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-3 last:mb-0 whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {audio.vocab && audio.vocab.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowVocab(!showVocab)}
            className="w-full flex items-center justify-between px-5 py-4 bg-card hover-elevate transition-colors"
            data-testid="button-toggle-vocab"
          >
            <span className="flex items-center gap-2 font-medium">
              <BookOpen className="h-5 w-5 text-primary" />
              Vocabulary ({audio.vocab.length} words)
            </span>
            {showVocab ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showVocab && (
            <div className="border-t bg-background" data-testid="section-vocab">
              <div className="divide-y">
                {audio.vocab.map((item, idx) => (
                  <div key={idx} className="px-5 py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                    <span className="font-semibold text-primary shrink-0 sm:w-1/3">
                      {item.term}
                    </span>
                    <span className="text-muted-foreground sm:w-2/3">
                      {item.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {audio.quiz && audio.quiz.length > 0 && (
        <div className="border rounded-xl overflow-hidden">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className="w-full flex items-center justify-between px-5 py-4 bg-card hover-elevate transition-colors"
            data-testid="button-toggle-quiz"
          >
            <span className="flex items-center gap-2 font-medium">
              <HelpCircle className="h-5 w-5 text-primary" />
              Quiz ({audio.quiz.length} questions)
            </span>
            {showQuiz ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {showQuiz && (
            <div className="border-t bg-background p-5 space-y-6" data-testid="section-quiz">
              {audio.quiz.map((question, qIdx) => {
                const isAnswered = showResults[question.id];
                const selectedAnswer = selectedAnswers[question.id];
                const isCorrect = selectedAnswer === question.answerIndex;

                return (
                  <div key={question.id} className="space-y-3" data-testid={`quiz-question-${qIdx}`}>
                    <p className="font-medium">
                      {qIdx + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, oIdx) => {
                        const isSelected = selectedAnswer === oIdx;
                        const isCorrectAnswer = oIdx === question.answerIndex;
                        
                        let optionClass = "w-full text-left px-4 py-3 rounded-lg border transition-colors ";
                        
                        if (isAnswered) {
                          if (isCorrectAnswer) {
                            optionClass += "bg-green-50 dark:bg-green-950/30 border-green-500 text-green-700 dark:text-green-400";
                          } else if (isSelected && !isCorrect) {
                            optionClass += "bg-red-50 dark:bg-red-950/30 border-red-500 text-red-700 dark:text-red-400";
                          } else {
                            optionClass += "opacity-50";
                          }
                        } else {
                          optionClass += isSelected 
                            ? "bg-primary/10 border-primary" 
                            : "hover-elevate";
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => !isAnswered && handleAnswerSelect(question.id, oIdx)}
                            disabled={isAnswered}
                            className={optionClass}
                            data-testid={`quiz-option-${qIdx}-${oIdx}`}
                          >
                            <span className="flex items-center gap-2">
                              {isAnswered && isCorrectAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                              )}
                              {isAnswered && isSelected && !isCorrect && (
                                <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                              )}
                              {option}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    
                    {isAnswered && (
                      <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'}`}>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {!submitted && (
                <div className="pt-4 border-t">
                  <button
                    onClick={checkAllAnswers}
                    disabled={!allAnswered}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-check-all"
                  >
                    {allAnswered ? 'Check answers' : 'Answer all questions to continue'}
                  </button>
                </div>
              )}

              {submitted && (
                <div className="pt-4 border-t space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg" data-testid="quiz-results">
                    <div className="text-3xl font-bold mb-1">
                      {audio.quiz!.filter(q => selectedAnswers[q.id] === q.answerIndex).length}/{audio.quiz!.length}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {audio.quiz!.filter(q => selectedAnswers[q.id] === q.answerIndex).length === audio.quiz!.length
                        ? 'Perfect! All answers correct.'
                        : audio.quiz!.filter(q => selectedAnswers[q.id] === q.answerIndex).length >= (audio.quiz!.length * 0.7)
                        ? 'Great job!'
                        : 'Keep practicing!'}
                    </p>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="w-full py-3 rounded-lg border font-medium hover-elevate active-elevate-2"
                    data-testid="button-reset-quiz"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
