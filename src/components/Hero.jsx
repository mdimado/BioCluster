import React, { useState, useEffect } from 'react';

const EDNAPipelineAnimation = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  const steps = [
    {
      id: 'raw-input',
      title: 'Raw Input (FASTA files)',
      description: 'Raw eDNA sequences collected from ocean samples (FASTA format).',
      duration: 5000,
    },
    {
      id: 'preprocessing',
      title: 'Preprocessing (Metabarcoding & Cleaning)',
      description: 'Preprocessing removes noise and normalizes sequences.',
      duration: 5000,
    },
    {
      id: 'tokenization',
      title: 'Tokenization (k-mer generation)',
      description: 'DNA sequences are tokenized into fixed-length k-mers for model input.',
      duration: 5000,
    },
    {
      id: 'embedding',
      title: 'Embedding Generation (DNABERT)',
      description: 'DNABERT converts sequences into contextual embeddings capturing biological meaning.',
      duration: 5000,
    },
    {
      id: 'clustering',
      title: 'Unsupervised Learning (Clustering)',
      description: 'Unsupervised model groups similar sequences into clusters representing potential taxa.',
      duration: 6000,
    },
    {
      id: 'interpretability',
      title: 'Interpretability & Similarity Search',
      description: 'Model identifies which sequence regions contribute most to similarity.',
      duration: 5000,
    },
    {
      id: 'taxonomic',
      title: 'Taxonomic Assignment',
      description: 'Compare clusters to known databases to identify species or mark new ones.',
      duration: 5000,
    },
    {
      id: 'visualization',
      title: 'Visualization Layer (Dashboard)',
      description: 'Interactive dashboard displays discovered clusters, species distribution, and historical results.',
      duration: 6000,
    },
    {
      id: 'end',
      title: 'Complete Pipeline',
      description: 'This pipeline enables unsupervised discovery of deep-sea biodiversity from eDNA data.',
      duration: 5000,
    }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setShowReplay(false);
  };

  const resetAnimation = () => {
    setCurrentStep(-1);
    setIsAnimating(false);
    setShowReplay(false);
  };

  useEffect(() => {
    if (currentStep >= 0 && currentStep < steps.length && isAnimating) {
      const timer = setTimeout(() => {
        if (currentStep === steps.length - 1) {
          setIsAnimating(false);
          setShowReplay(true);
        } else {
          setCurrentStep(currentStep + 1);
        }
      }, steps[currentStep].duration);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isAnimating, steps]);

  const renderStepContent = (stepIndex) => {
    const stepId = steps[stepIndex]?.id;
    
    switch (stepId) {
      case 'raw-input':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-bounce text-blue-400">📄</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl font-mono text-green-400 text-xl w-full max-w-4xl">
              <div className="animate-pulse">
                <div className="mb-4 text-yellow-400">&gt;sample1_ocean_depth_200m</div>
                <div className="text-3xl mb-4">
                  ATCGTTAG<span className="animate-pulse text-cyan-400">CGGATCCAATTG</span>CGATC
                </div>
                <div className="mb-4 text-yellow-400">&gt;sample2_ocean_depth_200m</div>
                <div className="text-3xl mb-4">
                  GGCCAATT<span className="animate-pulse text-cyan-400">TCGATCGGAA</span>TTGC
                </div>
                <div className="mb-4 text-yellow-400">&gt;sample3_ocean_depth_200m</div>
                <div className="text-3xl">
                  CCGATCAA<span className="animate-pulse text-cyan-400">TTGGCCAATC</span>GATC
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'preprocessing':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-spin text-green-400">🔧</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-4xl">
              <div className="space-y-6 text-xl">
                <div className="flex items-center text-green-400 transition-all duration-2000">
                  <span className="text-2xl mr-4">✅</span>
                  <span className="font-mono">ATCGTTAGCGGATCCAATTGCGATC</span>
                  <span className="text-cyan-400 ml-4">(Quality Score: 35)</span>
                </div>
                <div className="flex items-center text-red-400 line-through transition-all duration-2000">
                  <span className="text-2xl mr-4">❌</span>
                  <span className="font-mono">GGCCNNNNTCGATCGGAATTGC</span>
                  <span className="text-gray-400 ml-4">(Low quality)</span>
                </div>
                <div className="flex items-center text-green-400 transition-all duration-2000">
                  <span className="text-2xl mr-4">✅</span>
                  <span className="font-mono">CCGATCAATTGGCCAATCGATC</span>
                  <span className="text-cyan-400 ml-4">(Quality Score: 32)</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'tokenization':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-pulse text-yellow-400">✂️</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-5xl">
              <div className="mb-8 text-2xl text-cyan-400 font-mono">
                ATCGTTAGCGGATCC → k-mers (k=3):
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {['ATC', 'TCG', 'CGT', 'GTT', 'TTA', 'TAG', 'AGC', 'GCG', 'CGG', 'GGA', 'GAT', 'ATC', 'TCC'].map((kmer, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-lg text-2xl font-mono animate-pulse border-2 border-blue-400"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    {kmer}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'embedding':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-spin text-purple-400">🧬</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-5xl">
              <div className="text-cyan-400 text-2xl mb-8 font-mono text-center">
                DNABERT Embeddings (768-dimensional vectors):
              </div>
              <div className="space-y-6">
                {[
                  { label: 'ATC', colors: ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500'] },
                  { label: 'TCG', colors: ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-orange-500', 'bg-cyan-500', 'bg-pink-500', 'bg-yellow-500'] },
                  { label: 'CGT', colors: ['bg-green-500', 'bg-purple-500', 'bg-blue-500', 'bg-red-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500', 'bg-cyan-500'] }
                ].map((row, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="font-mono text-cyan-400 text-2xl w-16">{row.label}:</span>
                    <div className="flex gap-2">
                      {row.colors.map((color, j) => (
                        <div 
                          key={j}
                          className={`w-6 h-12 ${color} animate-pulse rounded`}
                          style={{ animationDelay: `${(i * 8 + j) * 100}ms` }}
                        />
                      ))}
                      <span className="text-gray-400 text-lg self-center ml-4">...760 more dimensions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'clustering':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-bounce text-pink-400">🎯</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-4xl h-96">
              <div className="relative h-full">
                {/* Cluster 1 */}
                <div className="absolute top-12 left-16 w-32 h-32 bg-red-500/20 rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse">
                  <div className="text-center">
                    <div className="flex justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="text-red-400 font-bold">Cluster 1</div>
                  </div>
                </div>
                
                {/* Cluster 2 */}
                <div className="absolute top-12 right-16 w-32 h-32 bg-blue-500/20 rounded-full border-4 border-blue-500 flex items-center justify-center animate-pulse" style={{animationDelay: '800ms'}}>
                  <div className="text-center">
                    <div className="flex justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="text-blue-400 font-bold">Cluster 2</div>
                  </div>
                </div>
                
                {/* Cluster 3 */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green-500/20 rounded-full border-4 border-green-500 flex items-center justify-center animate-pulse" style={{animationDelay: '1600ms'}}>
                  <div className="text-center">
                    <div className="flex justify-center space-x-2 mb-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-green-400 font-bold">Cluster 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'interpretability':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-pulse text-orange-400">🔍</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-5xl">
              <div className="text-cyan-400 text-2xl mb-8 font-mono text-center">Attention Heatmap Analysis:</div>
              <div className="font-mono text-xl text-center">
                <div className="mb-6 text-2xl text-white">Sequence: ATCGTTAGCGGATCC</div>
                <div className="flex justify-center">
                  {['A', 'T', 'C', 'G', 'T', 'T', 'A', 'G', 'C', 'G', 'G', 'A', 'T', 'C', 'C'].map((char, i) => {
                    const intensity = [0.9, 0.3, 0.7, 0.95, 0.2, 0.1, 0.4, 0.85, 0.9, 0.8, 0.6, 0.3, 0.4, 0.7, 0.5][i];
                    return (
                      <div 
                        key={i}
                        className="inline-block w-12 h-12 text-center text-white text-xl leading-12 animate-pulse border border-gray-600 font-bold"
                        style={{ 
                          backgroundColor: `rgba(255, 0, 0, ${intensity})`,
                          animationDelay: `${i * 150}ms`,
                          lineHeight: '3rem'
                        }}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 text-gray-400">High attention regions (red) indicate important sequence features</div>
              </div>
            </div>
          </div>
        );
      
      case 'taxonomic':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-bounce text-emerald-400">🌳</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-5xl">
              <div className="space-y-8 text-xl">
                <div className="flex items-center gap-6 animate-pulse">
                  <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-red-300"></div>
                  <span className="text-cyan-400 font-mono text-2xl">Cluster 1 →</span>
                  <div className="flex-1">
                    <span className="text-white text-2xl font-bold">Calanus finmarchicus</span>
                    <div className="text-green-400 text-lg">(98% database match)</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 animate-pulse" style={{animationDelay: '800ms'}}>
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-blue-300"></div>
                  <span className="text-cyan-400 font-mono text-2xl">Cluster 2 →</span>
                  <div className="flex-1">
                    <span className="text-white text-2xl font-bold">Euphausia superba</span>
                    <div className="text-green-400 text-lg">(95% database match)</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 animate-pulse" style={{animationDelay: '1600ms'}}>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-green-300"></div>
                  <span className="text-cyan-400 font-mono text-2xl">Cluster 3 →</span>
                  <div className="flex-1">
                    <span className="text-yellow-400 text-2xl font-bold">Unknown Species</span>
                    <div className="text-red-400 text-lg">(No database match - potential new discovery!)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'visualization':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-pulse text-cyan-400">📊</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-6xl">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg">
                  <div className="text-cyan-400 text-xl mb-4 text-center font-bold">Species Distribution Map</div>
                  <div className="relative h-32 bg-blue-900 rounded-lg border-2 border-blue-700">
                    <div className="absolute top-4 left-8 w-4 h-4 bg-red-500 rounded-full animate-ping shadow-lg shadow-red-500/50"></div>
                    <div className="absolute top-12 left-16 w-4 h-4 bg-blue-500 rounded-full animate-ping shadow-lg shadow-blue-500/50" style={{animationDelay: '800ms'}}></div>
                    <div className="absolute top-20 left-24 w-4 h-4 bg-green-500 rounded-full animate-ping shadow-lg shadow-green-500/50" style={{animationDelay: '1600ms'}}></div>
                  </div>
                </div>
                <div className="bg-gray-800 border border-gray-600 p-6 rounded-lg">
                  <div className="text-cyan-400 text-xl mb-4 text-center font-bold">Cluster Abundance</div>
                  <div className="flex items-end justify-center gap-4 h-32">
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-red-500 animate-pulse rounded-t" style={{height: '70%'}}></div>
                      <div className="text-red-400 text-sm mt-2">C1</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-blue-500 animate-pulse rounded-t" style={{height: '90%', animationDelay: '500ms'}}></div>
                      <div className="text-blue-400 text-sm mt-2">C2</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-8 bg-green-500 animate-pulse rounded-t" style={{height: '50%', animationDelay: '1000ms'}}></div>
                      <div className="text-green-400 text-sm mt-2">C3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'end':
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="text-8xl animate-bounce text-indigo-400">✅</div>
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-xl w-full max-w-6xl">
              <div className="text-center mb-8">
                <div className="text-3xl text-cyan-400 mb-4">Complete eDNA Analysis Pipeline</div>
              </div>
              <div className="flex justify-center items-center space-x-4 text-6xl mb-8">
                {[
                  {icon: '📄', color: 'text-blue-400'}, 
                  {icon: '🔧', color: 'text-green-400'}, 
                  {icon: '✂️', color: 'text-yellow-400'}, 
                  {icon: '🧬', color: 'text-purple-400'}, 
                  {icon: '🎯', color: 'text-pink-400'}, 
                  {icon: '🔍', color: 'text-orange-400'}, 
                  {icon: '🌳', color: 'text-emerald-400'}, 
                  {icon: '📊', color: 'text-cyan-400'}
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span className={`animate-pulse ${item.color}`} style={{animationDelay: `${i * 300}ms`}}>
                      {item.icon}
                    </span>
                    {i < 7 && <span className="text-gray-400 mx-2">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="text-8xl text-cyan-400">🧬</div>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {currentStep === -1 ? (
            <div className="text-center">
              <div className="text-9xl mb-8 animate-pulse text-cyan-400">🧬</div>
              <h1 className="text-6xl font-bold text-white mb-8">
                eDNA Analysis Pipeline
              </h1>
              <p className="text-2xl text-gray-400 mb-12">
                AI-Powered Marine Biodiversity Discovery
              </p>
              <button
                onClick={startAnimation}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                Start Animation
              </button>
            </div>
          ) : (
            <div className="w-full max-w-7xl">
              {/* Step Title */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-8">
                  {steps[currentStep]?.title}
                </h2>
              </div>
              
              {/* Step Content */}
              <div className="mb-12">
                {renderStepContent(currentStep)}
              </div>
              
              {/* Step Description */}
              <div className="text-center">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl max-w-4xl mx-auto">
                  <p className="text-2xl text-gray-300 leading-relaxed">
                    {steps[currentStep]?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Replay Button */}
        {showReplay && (
          <div className="text-center pb-8">
            <button
              onClick={resetAnimation}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-6 rounded-xl font-bold text-2xl transition-all duration-300 shadow-lg shadow-cyan-500/25"
            >
              Replay Animation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EDNAPipelineAnimation;