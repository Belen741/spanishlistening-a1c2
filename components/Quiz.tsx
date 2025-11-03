'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import type { QuizQuestion } from '@/types/level';
import { recordQuizResult } from '@/lib/progress';

interface QuizProps {
  questions: QuizQuestion[];
  levelSlug: string;
  audioId?: string;
  level?: string;
}

interface QuizResult {
  score: number;
  total: number;
  answers: (number | number[])[];
  timestamp: number;
}

export function Quiz({ questions, levelSlug, audioId, level }: QuizProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answers, setAnswers] = useState<(number | number[])[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`quiz:${levelSlug}`);
    if (stored) {
      try {
        setLastResult(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored quiz result:', e);
      }
    }
    
    setAnswers(questions.map(q => q.type === 'multiple' ? [] : -1));
  }, [levelSlug, questions]);

  const handleSingleChoice = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleMultipleChoice = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const currentAnswers = (answers[questionIndex] as number[]) || [];
    const newAnswers = [...answers];
    
    if (currentAnswers.includes(optionIndex)) {
      newAnswers[questionIndex] = currentAnswers.filter(i => i !== optionIndex);
    } else {
      newAnswers[questionIndex] = [...currentAnswers, optionIndex];
    }
    
    setAnswers(newAnswers);
  };

  const isCorrect = (question: QuizQuestion, answer: number | number[]) => {
    if (question.type === 'single') {
      return answer === question.answerIndex;
    } else {
      const correctAnswers = Array.isArray(question.answerIndex) 
        ? question.answerIndex 
        : [question.answerIndex];
      const userAnswers = Array.isArray(answer) ? answer : [];
      
      return correctAnswers.length === userAnswers.length &&
        correctAnswers.every(a => userAnswers.includes(a));
    }
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, question, index) => {
      return acc + (isCorrect(question, answers[index]) ? 1 : 0);
    }, 0);

    const result: QuizResult = {
      score,
      total: questions.length,
      answers,
      timestamp: Date.now(),
    };

    localStorage.setItem(`quiz:${levelSlug}`, JSON.stringify(result));
    setLastResult(result);
    setSubmitted(true);

    if (audioId && level) {
      const scorePercentage = Math.round((score / questions.length) * 100);
      recordQuizResult(audioId, level, scorePercentage);
    }

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setAnswers(questions.map(q => q.type === 'multiple' ? [] : -1));
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allAnswered = answers.every(answer => {
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return answer !== -1;
  });

  return (
    <div className="bg-card rounded-xl border" data-testid="quiz-container">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-5 bg-primary/5 hover-elevate active-elevate-2 rounded-t-xl border-l-4 border-l-primary"
        aria-expanded={isExpanded}
        data-testid="button-toggle-quiz"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-lg">Quiz de Comprensión</h3>
          {!isExpanded && lastResult && (
            <span className="text-sm text-muted-foreground font-normal" data-testid="text-last-score">
              ({lastResult.score}/{lastResult.total})
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp className="h-6 w-6 text-primary" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t p-6 space-y-6">
          {lastResult && !submitted && (
            <div className="text-sm text-muted-foreground text-center pb-2 border-b" data-testid="text-last-result">
              Último resultado: {lastResult.score}/{lastResult.total}
            </div>
          )}

          <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const userAnswer = answers[qIndex];
          const correct = submitted && isCorrect(question, userAnswer);
          const incorrect = submitted && !isCorrect(question, userAnswer);

          return (
            <div
              key={question.id}
              className="space-y-3 pb-6 border-b last:border-b-0 last:pb-0"
              data-testid={`question-${qIndex}`}
            >
              <div className="flex items-start gap-2">
                <span className="font-medium text-muted-foreground min-w-[2rem]">
                  {qIndex + 1}.
                </span>
                <p className="font-medium text-base flex-1" data-testid={`question-text-${qIndex}`}>
                  {question.question}
                </p>
                {submitted && (
                  correct ? (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" data-testid={`icon-correct-${qIndex}`} />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" data-testid={`icon-incorrect-${qIndex}`} />
                  )
                )}
              </div>

              <div className="pl-8 space-y-2">
                {question.options.map((option, oIndex) => {
                  const isSelected = Array.isArray(userAnswer)
                    ? userAnswer.includes(oIndex)
                    : userAnswer === oIndex;
                  
                  const isCorrectOption = Array.isArray(question.answerIndex)
                    ? question.answerIndex.includes(oIndex)
                    : question.answerIndex === oIndex;

                  const showAsCorrect = submitted && isCorrectOption;
                  const showAsIncorrect = submitted && isSelected && !isCorrectOption;

                  return (
                    <label
                      key={oIndex}
                      className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        showAsCorrect
                          ? 'border-success bg-success/10'
                          : showAsIncorrect
                          ? 'border-destructive bg-destructive/10'
                          : isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover-elevate'
                      } ${submitted ? 'cursor-default' : ''}`}
                      data-testid={`option-${qIndex}-${oIndex}`}
                    >
                      <input
                        type={question.type === 'single' ? 'radio' : 'checkbox'}
                        name={`question-${qIndex}`}
                        checked={isSelected}
                        onChange={() => {
                          if (question.type === 'single') {
                            handleSingleChoice(qIndex, oIndex);
                          } else {
                            handleMultipleChoice(qIndex, oIndex);
                          }
                        }}
                        disabled={submitted}
                        className="mt-0.5 accent-primary"
                        data-testid={`input-option-${qIndex}-${oIndex}`}
                      />
                      <span className="flex-1">{option}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && (
                <div className="pl-8 mt-3 p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
                  <p className="text-sm font-medium mb-1">Explicación:</p>
                  <p className="text-sm text-muted-foreground" data-testid={`explanation-${qIndex}`}>
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div className="space-y-4 pt-4 border-t">
          <div className="text-center p-6 bg-primary/10 rounded-lg" data-testid="quiz-results">
            <div className="text-4xl font-bold mb-2">
              {lastResult && `${lastResult.score}/${lastResult.total}`}
            </div>
            <p className="text-muted-foreground">
              {lastResult && lastResult.score === lastResult.total
                ? '¡Perfecto! Has respondido todas correctamente.'
                : lastResult && lastResult.score >= (lastResult.total * 0.7)
                ? '¡Muy bien! Buen trabajo.'
                : '¡Sigue practicando!'}
            </p>
          </div>

          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-lg border-2 border-primary text-primary font-medium hover-elevate active-elevate-2 flex items-center justify-center gap-2"
            data-testid="button-retry-quiz"
          >
            <RotateCcw className="h-5 w-5" />
            Reintentar Quiz
          </button>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-primary-border"
          data-testid="button-submit-quiz"
        >
          {allAnswered ? 'Enviar Respuestas' : 'Responde todas las preguntas para continuar'}
        </button>
      )}
        </div>
      )}
    </div>
  );
}
