import React from 'react';
import { useApp, JUDGE_DEMO_STEPS } from '../../context/AppContext';
import { Play, ArrowRight, ArrowLeft, X, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export const JudgeDemoBanner: React.FC = () => {
  const {
    isJudgeDemoActive,
    currentDemoStep,
    nextDemoStep,
    prevDemoStep,
    stopJudgeDemo
  } = useApp();

  if (!isJudgeDemoActive) return null;

  const currentStepData = JUDGE_DEMO_STEPS[currentDemoStep - 1] || JUDGE_DEMO_STEPS[0];

  return (
    <div className="bg-gradient-to-r from-cyan-950/90 via-slate-900/95 to-teal-950/90 border-b-2 border-cyan-500/80 p-3 shadow-xl backdrop-blur-md relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Scenario Header & Progress */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              JUDGE DEMO MODE
            </span>
            <span className="text-xs font-semibold text-cyan-200">
              Scenario: “Cross-Border Smoke Event”
            </span>
            <span className="text-xs text-slate-400 font-mono">
              [Step {currentDemoStep} of {JUDGE_DEMO_STEPS.length}]
            </span>
          </div>

          <h4 className="text-sm md:text-base font-heading font-bold text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 flex items-center justify-center text-xs font-mono font-bold">
              {currentDemoStep}
            </span>
            {currentStepData.title}
          </h4>

          <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 md:line-clamp-none">
            {currentStepData.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-cyan-300/90 font-mono">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              <strong className="text-slate-400">Action:</strong> {currentStepData.systemAction}
            </span>
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <strong className="text-slate-400">Evidence:</strong> {currentStepData.evidenceCallout}
            </span>
          </div>
        </div>

        {/* Step Indicator Dots & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 self-end md:self-center">
          {/* Step Dots */}
          <div className="flex items-center gap-1">
            {JUDGE_DEMO_STEPS.map((s) => (
              <span
                key={s.step}
                className={`h-2 rounded-full transition-all ${
                  s.step === currentDemoStep
                    ? 'w-6 bg-cyan-400'
                    : s.step < currentDemoStep
                    ? 'w-2 bg-teal-500'
                    : 'w-2 bg-slate-700'
                }`}
                title={`Step ${s.step}: ${s.title}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevDemoStep}
              disabled={currentDemoStep <= 1}
              className={`p-1.5 rounded-md border text-xs flex items-center gap-1 transition-all ${
                currentDemoStep <= 1
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              title="Previous Step"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={nextDemoStep}
              className="px-3 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <span>{currentDemoStep === JUDGE_DEMO_STEPS.length ? 'Finish Demo' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={stopJudgeDemo}
              className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-950/40 border border-slate-700/50 transition-colors"
              title="Exit Judge Demo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
