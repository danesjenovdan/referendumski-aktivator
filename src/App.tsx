import React, { useState } from 'react';
import { INITIAL_ITEMS } from './constants';
import { ChecklistItem } from './types';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const completedImpact = items.filter(i => i.isCompleted).reduce((a, b) => a + b.impact, 0);
  const totalImpact = items.reduce((a, b) => a + b.impact, 0);

  const handleShare = async () => {
    // const shareData = {
    //   title: 'Referendumski aktivator',
    //   text: 'Ugotovi, kaj še moraš storiti, da bo v nedeljo sprejet zakon o dostojni smrti.',
    //   url: window.location.href
    // };

    // if (navigator.share) {
    //   try {
    //     await navigator.share(shareData);
    //   } catch (err) {
    //     console.log('Error sharing', err);
    //   }
    // } else {
      try {
        const copyText = `Povečaj udeležbo na referendumu o dostojni smrti!\n${window.location.href}`;
        await navigator.clipboard.writeText(copyText);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 3000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffb6c1] via-[#ff9aa2] to-[#ff8090] font-sans text-white overflow-x-hidden relative">
      
      <div className="max-w-3xl mx-auto pt-16 pb-12 px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="mb-8 relative text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-sm text-white mb-4">
            Povečaj udeležbo na referendumu!
          </h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-slate-800 mb-8 relative z-20">
          
          <ProgressBar current={completedImpact} total={totalImpact} />
          
          <p className="text-center text-slate-600 mb-8 mt-2 text-lg font-medium leading-relaxed px-2">
            Kaj še lahko narediš, da se sprejme zakon in uveljavi pravica do svobodne izbire.
          </p>

          <div className="space-y-3 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`
                  group flex items-start p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                  ${item.isCompleted 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-white border-slate-100 hover:border-red-200 hover:bg-slate-50'}
                `}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                    ${item.isCompleted 
                      ? 'bg-[#d92828] border-[#d92828] scale-110' 
                      : 'bg-transparent border-slate-300 group-hover:border-red-300'}
                  `}>
                    {item.isCompleted && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className={`font-bold text-lg leading-snug ${item.isCompleted ? 'text-[#d92828]' : 'text-slate-800'}`}>
                    {item.text}
                  </h3>
                  <p className={`text-sm mt-1 ${item.isCompleted ? 'text-red-700/70' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                  {item.link && (
                    <a 
                      href={item.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center mt-2 text-xs font-bold text-[#d92828] hover:text-[#991b1b] hover:underline uppercase tracking-wide"
                    >
                      {item.linkText || 'Povezava'}
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Area */}
          <div className="text-center relative">
            <button
              onClick={handleShare}
              className={`
                group w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-lg uppercase tracking-wider shadow-lg transition-all transform active:scale-95 flex items-center justify-center mx-auto space-x-3
                bg-[#d92828] text-white hover:bg-[#b91c1c] hover:shadow-xl hover:-translate-y-1
              `}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Povabi še koga!</span>
            </button>
            
            <p className="text-slate-400 text-xs mt-3 font-medium">
              Deljenje te aplikacije poveča doseg za 3x!
            </p>

            {/* Toast Notification */}
            {showCopiedToast && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-800 text-white text-sm py-2 px-4 rounded-lg shadow-lg animate-bounce whitespace-nowrap">
                Povezava kopirana! 📋
              </div>
            )}
          </div>
        </div>

        {/* Footer Campaign Info */}
        <div className="mt-12 flex flex-col items-center text-center gap-4">
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg">
             <div className="flex items-center gap-2">
               <span className="font-bold text-white">V NEDELJO, 23. novembra,</span>
               <span className="bg-[#d92828] text-white px-2 py-0.5 rounded font-extrabold text-sm uppercase">Glasuj ZA</span>
             </div>
          </div>
          <p className="text-white/90 text-sm sm:text-base font-medium max-w-md mx-auto">
            POMOČ PRI PROSTOVOLJNEM KONČANJU ŽIVLJENJA.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default App;