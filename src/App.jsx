import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Database, FileDown, Filter, ChevronRight, Clock, Layers, ZoomIn, ZoomOut, Upload, Play, CheckCircle, Loader } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { 
AlertTriangle, 
  BarChart3 
} from 'lucide-react';

const BiodiversityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSite, setSelectedSite] = useState(null);
  const [timelineYear, setTimelineYear] = useState(2025);
  const [showAmbiguous, setShowAmbiguous] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [mapPosition, setMapPosition] = useState({ coordinates: [70, -10], zoom: 1.8 });
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filters, setFilters] = useState({
    site: 'all',
    sample: 'all',
    taxon: 'all',
    minAbundance: 0,
    minConfidence: 0
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
const [metadata, setMetadata] = useState({
  site: '',
  depth: '',
  date: '',
  temperature: '',
  salinity: ''
});
const [isDragging, setIsDragging] = useState(false);
const [validationErrors, setValidationErrors] = useState([]);
const [selectedSamplesForComparison, setSelectedSamplesForComparison] = useState([]);
const [comparisonFilters, setComparisonFilters] = useState({
  sites: [],
  dateRange: { start: '', end: '' },
  minDepth: 0,
  maxDepth: 5000
});

  // Sample data - Indian Ocean locations
  const sites = [
    { id: 1, name: 'Andaman Basin', lat: 10.5, lng: 92.5, reads: 45230, taxa: 127, description: 'Andaman Sea, Bay of Bengal' },
    { id: 2, name: 'Chagos Trench', lat: -7.2, lng: 72.4, reads: 38950, taxa: 98, description: 'Central Indian Ocean' },
    { id: 3, name: 'Maldives Reef', lat: 4.2, lng: 73.5, reads: 52100, taxa: 156, description: 'Maldives Archipelago' },
    { id: 4, name: 'Seychelles Plateau', lat: -4.5, lng: 55.5, reads: 41200, taxa: 112, description: 'Western Indian Ocean' },
    { id: 5, name: 'Kerguelen Ridge', lat: -48.5, lng: 69.5, reads: 29500, taxa: 87, description: 'Southern Indian Ocean' },
    { id: 6, name: 'Ninety East Ridge', lat: -5.0, lng: 88.0, reads: 36800, taxa: 103, description: 'Eastern Indian Ocean' },
    { id: 7, name: 'Mozambique Channel', lat: -18.5, lng: 40.5, reads: 42300, taxa: 118, description: 'East African Coast' },
    { id: 8, name: 'Arabian Sea Basin', lat: 15.0, lng: 65.0, reads: 48900, taxa: 134, description: 'Northwestern Indian Ocean' }
  ];

  const samples = [
    { id: 'S001', siteId: 1, name: 'MB-001-2025', date: '2025-03-15' },
    { id: 'S002', siteId: 1, name: 'MB-002-2025', date: '2025-06-20' },
    { id: 'S003', siteId: 2, name: 'CT-001-2025', date: '2025-04-10' },
    { id: 'S004', siteId: 3, name: 'MR-001-2025', date: '2025-05-18' },
    { id: 'S005', siteId: 4, name: 'SP-001-2025', date: '2025-07-22' }
  ];

  const clusters = [
    { 
      id: 'C001', name: 'Cluster #23', size: 3420, taxon: 'Protista', family: 'Dinoflagellata', 
      abundance: 12.3, confidence: 0.95, siteId: 1, sampleId: 'S001',
      species: 'Ceratium fusus', phylum: 'Dinoflagellata', class: 'Dinophyceae', 
      order: 'Gonyaulacales', genus: 'Ceratium',
      ecologicalRole: 'Primary producer and key component of marine phytoplankton communities',
      abundanceAcrossSites: [12.3, 8.5, 15.2, 6.1, 3.2],
      readDistribution: [85, 92, 78, 88, 95, 82, 90, 87],
      relatedClusters: ['C003', 'C005'],
      isNovel: false
    },
    { 
      id: 'C002', name: 'Cluster #47', size: 2890, taxon: 'Bacteria', family: 'Proteobacteria', 
      abundance: 10.4, confidence: 0.88, siteId: 2, sampleId: 'S003',
      species: 'Alteromonas macleodii', phylum: 'Proteobacteria', class: 'Gammaproteobacteria',
      order: 'Alteromonadales', genus: 'Alteromonas',
      ecologicalRole: 'Marine heterotroph involved in organic matter decomposition',
      abundanceAcrossSites: [10.4, 11.2, 9.8, 12.5, 8.9],
      readDistribution: [72, 88, 65, 79, 91, 68, 85, 76],
      relatedClusters: ['C005'],
      isNovel: false
    },
    { 
      id: 'C006', name: 'Cluster #156', size: 2650, taxon: 'Unknown', family: 'Unclassified', 
      abundance: 9.2, confidence: 0.45, siteId: 5, sampleId: 'S005',
      species: 'Novel organism', phylum: 'Unclassified', class: 'Unknown',
      order: 'Unknown', genus: 'Unknown',
      ecologicalRole: 'Unknown - requires further investigation',
      abundanceAcrossSites: [9.2, 11.5, 7.8, 10.1, 12.3],
      readDistribution: [45, 52, 38, 48, 55, 42, 50, 46],
      relatedClusters: [],
      isNovel: true,
      novelInfo: {
        closestMatch: 'Bacteroidetes (68% similarity)',
        divergence: 'High sequence divergence from known taxa',
        status: 'Candidate novel species',
        nextSteps: ['Whole genome sequencing', 'Phylogenetic analysis', 'Morphological examination']
      }
    },
    { 
      id: 'C003', name: 'Cluster #12', size: 4120, taxon: 'Protista', family: 'Foraminifera', 
      abundance: 14.8, confidence: 0.92, siteId: 3, sampleId: 'S004',
      species: 'Globigerina bulloides', phylum: 'Foraminifera', class: 'Globothalamea',
      order: 'Rotaliida', genus: 'Globigerina',
      ecologicalRole: 'Planktonic foraminifera, important for carbonate cycling',
      abundanceAcrossSites: [14.8, 13.1, 16.2, 11.5, 9.8],
      readDistribution: [90, 95, 88, 92, 87, 94, 89, 91],
      relatedClusters: ['C001'],
      isNovel: false
    },
    { 
      id: 'C004', name: 'Cluster #89', size: 1950, taxon: 'Archaea', family: 'Thaumarchaeota', 
      abundance: 7.0, confidence: 0.78, siteId: 4, sampleId: 'S005',
      species: 'Nitrosopumilus maritimus', phylum: 'Thaumarchaeota', class: 'Nitrososphaeria',
      order: 'Nitrosopumilales', genus: 'Nitrosopumilus',
      ecologicalRole: 'Ammonia-oxidizing archaea, crucial for nitrogen cycling',
      abundanceAcrossSites: [7.0, 6.2, 8.5, 5.9, 7.8],
      readDistribution: [65, 72, 58, 68, 75, 62, 70, 66],
      relatedClusters: [],
      isNovel: false
    },
    {
      id: 'C007',
      name: 'Cluster #204',
      size: 3120,
      taxon: 'Unknown',
      family: 'Unclassified',
      abundance: 7.8,
      confidence: 0.39,
      siteId: 3,
      sampleId: 'S003',
      species: 'Novel bacterium',
      phylum: 'Unclassified',
      class: 'Unknown',
      order: 'Unknown',
      genus: 'Unknown',
      ecologicalRole: 'Potential anaerobic decomposer',
      abundanceAcrossSites: [7.8, 8.3, 6.5, 9.1, 7.9],
      readDistribution: [40, 42, 39, 44, 37, 41, 40, 43],
      relatedClusters: [],
      isNovel: true,
      novelInfo: {
        closestMatch: 'Firmicutes (71% similarity)',
        divergence: 'Moderate to high genetic divergence',
        status: 'Candidate new genus',
        nextSteps: [
          'Metagenome assembly',
          'Phylogenomic placement',
          'Metabolic profiling'
        ]
      }
    },
    
    { 
      id: 'C005', name: 'Cluster #34', size: 3210, taxon: 'Bacteria', family: 'Bacteroidetes', 
      abundance: 11.5, confidence: 0.91, siteId: 1, sampleId: 'S002',
      species: 'Flavobacterium aquatile', phylum: 'Bacteroidetes', class: 'Flavobacteriia',
      order: 'Flavobacteriales', genus: 'Flavobacterium',
      ecologicalRole: 'Degrader of complex organic polymers in marine environments',
      abundanceAcrossSites: [11.5, 10.8, 12.2, 9.5, 13.1],
      readDistribution: [80, 86, 75, 82, 89, 77, 84, 81],
      relatedClusters: ['C001', 'C002'],
      isNovel: false
    },
    
  ];

  const timelineData = {
    2023: { invasive: 5, native: 120, diversity: 3.2 },
    2024: { invasive: 12, native: 118, diversity: 3.1 },
    2025: { invasive: 23, native: 110, diversity: 2.9 }
  };

  const taxonomyTree = [
    { domain: 'Bacteria', phyla: ['Proteobacteria', 'Bacteroidetes', 'Firmicutes'], count: 45 },
    { domain: 'Archaea', phyla: ['Thaumarchaeota', 'Euryarchaeota'], count: 18 },
    { domain: 'Eukaryota', phyla: ['Protista', 'Fungi'], count: 64 }
  ];

  const getTaxonColor = (taxon) => {
    const colors = {
      'Protista': 'bg-emerald-500',
      'Bacteria': 'bg-blue-500',
      'Archaea': 'bg-purple-500',
      'Fungi': 'bg-amber-500'
    };
    return colors[taxon] || 'bg-gray-500';
  };

  const handleZoomIn = () => {
    if (mapPosition.zoom >= 4) return;
    setMapPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (mapPosition.zoom <= 1) return;
    setMapPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setMapPosition(position);
  };

  const getFilteredClusters = () => {
    return clusters.filter(cluster => {
      if (filters.site !== 'all' && cluster.siteId !== parseInt(filters.site)) return false;
      if (filters.sample !== 'all' && cluster.sampleId !== filters.sample) return false;
      if (filters.taxon !== 'all' && cluster.taxon !== filters.taxon) return false;
      if (cluster.abundance < filters.minAbundance) return false;
      if (cluster.confidence < filters.minConfidence) return false;
      return true;
    });
  };

  // Add these helper functions before your component definitions:
const getSampleClusters = (sampleId) => {
  return clusters.filter(c => c.sampleId === sampleId);
};

const getSharedClusters = (sampleIds) => {
  if (sampleIds.length === 0) return [];
  const clustersBySample = sampleIds.map(id => 
    new Set(getSampleClusters(id).map(c => c.species))
  );
  return [...clustersBySample[0]].filter(species =>
    clustersBySample.every(set => set.has(species))
  );
};

const getUniqueClusters = (sampleId, otherSampleIds) => {
  const thisSampleSpecies = new Set(getSampleClusters(sampleId).map(c => c.species));
  const otherSpecies = new Set(
    otherSampleIds.flatMap(id => getSampleClusters(id).map(c => c.species))
  );
  return [...thisSampleSpecies].filter(species => !otherSpecies.has(species));
};

const calculateDiversityIndex = (sampleId) => {
  const sampleClusters = getSampleClusters(sampleId);
  const totalReads = sampleClusters.reduce((sum, c) => sum + c.size, 0);
  if (totalReads === 0) return 0;
  
  const shannon = sampleClusters.reduce((sum, c) => {
    const p = c.size / totalReads;
    return sum - (p * Math.log(p));
  }, 0);
  return shannon.toFixed(2);
};
  
  const filteredClusters = getFilteredClusters();
  const availableSamples = filters.site === 'all' 
    ? samples 
    : samples.filter(s => s.siteId === parseInt(filters.site));

    const OverviewTab = () => {
      // State for filters
      const [selectedRegion, setSelectedRegion] = useState('all');
      const [viewMode, setViewMode] = useState('confident'); // 'confident' or 'full-probability'
      
      return (
        <div className="space-y-6">
          {/* Filters & Controls Section */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">Filters:</span>
                </div>
                
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Sites</option>
                  <option value="tropical">Tropical Rainforest</option>
                  <option value="coral">Coral Reef</option>
                  <option value="mangrove">Mangrove Estuary</option>
                  <option value="alpine">Alpine Lake</option>
                </select>
              </div>
    
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">View Mode:</span>
                <div className="flex bg-gray-700 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('confident')}
                    className={`px-4 py-1.5 text-sm rounded transition-colors ${
                      viewMode === 'confident'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Confident Only
                  </button>
                  <button
                    onClick={() => setViewMode('full-probability')}
                    className={`px-4 py-1.5 text-sm rounded transition-colors ${
                      viewMode === 'full-probability'
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Full Probabilities
                  </button>
                </div>
              </div>
            </div>
          </div>
    
          {/* Summary KPIs */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-sm">Total Reads</div>
                <Database className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">334,880</div>
              <div className="flex items-center justify-between">
                <div className="text-emerald-400 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% vs last month
                </div>
                {/* Mini sparkline */}
                <div className="flex items-end gap-0.5 h-6">
                  {[40, 45, 38, 52, 48, 55, 60].map((height, i) => (
                    <div
                      key={i}
                      className="w-1 bg-emerald-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
    
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-sm">Confident Taxa</div>
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">493</div>
              <div className="flex items-center justify-between">
                <div className="text-blue-400 text-xs">89% confidence avg</div>
                <div className="text-xs text-gray-500 bg-blue-900 bg-opacity-30 px-2 py-0.5 rounded">
                  {viewMode === 'confident' ? 'Active Filter' : 'Available'}
                </div>
              </div>
            </div>
    
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-amber-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-sm">Ambiguous Taxa</div>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">87</div>
              <div className="flex items-center justify-between">
                <div className="text-amber-400 text-xs">Requires review</div>
                <div className="text-xs text-gray-500">15% of total</div>
              </div>
            </div>
    
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400 text-sm">Diversity Index</div>
                <BarChart3 className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">3.47</div>
              <div className="flex items-center justify-between">
                <div className="text-purple-400 text-xs">Shannon index</div>
                <div className="text-xs text-emerald-400">High diversity</div>
              </div>
            </div>
          </div>
    
          {/* Main Visualizations Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Geographical Map */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Sample Collection Sites</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {selectedRegion === 'all' ? 'All regions' : sites.find(s => s.description.toLowerCase().includes(selectedRegion))?.description || 'Filtered view'}
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              
              <div className="relative bg-gray-900 rounded-lg h-80 overflow-hidden">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: [70, -10],
                    scale: 200
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ZoomableGroup
                    zoom={mapPosition.zoom}
                    center={mapPosition.coordinates}
                    onMoveEnd={handleMoveEnd}
                  >
                    <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#1e3a5f"
                            stroke="#0f172a"
                            strokeWidth={0.5}
                            style={{
                              default: { outline: 'none' },
                              hover: { outline: 'none', fill: '#2d5a8f' },
                              pressed: { outline: 'none' },
                            }}
                          />
                        ))
                      }
                    </Geographies>
                    
                    {sites
  .filter(site => selectedRegion === 'all' || site.description.toLowerCase().includes(selectedRegion))
  .map(site => {
    const isSelected = selectedSite?.id === site.id;
    return (
      <Marker
        key={site.id}
        coordinates={[site.lng, site.lat]}
        onClick={() => setSelectedSite(site)}
        style={{ cursor: 'pointer' }}
      >
        <g>
          <circle
            r={isSelected ? 12 / mapPosition.zoom : 8 / mapPosition.zoom}
            fill={isSelected ? "#3b82f6" : "#10b981"}
            stroke="#fff"
            strokeWidth={isSelected ? 3 / mapPosition.zoom : 2 / mapPosition.zoom}
            className={isSelected ? "" : "animate-pulse"}
          />
          <circle
            r={isSelected ? 18 / mapPosition.zoom : 12 / mapPosition.zoom}
            fill={isSelected ? "#3b82f6" : "#10b981"}
            opacity={isSelected ? 0.4 : 0.3}
          />
          {isSelected && (
            <circle
              r={24 / mapPosition.zoom}
              fill="#3b82f6"
              opacity={0.2}
              className="animate-pulse"
            />
          )}
        </g>
      </Marker>
    );
  })}
                  </ZoomableGroup>
                </ComposableMap>
    
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleZoomIn}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg border border-gray-600 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg border border-gray-600 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              
              {selectedSite && (
                <div className="mt-4 bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold text-white">{selectedSite.name}</div>
                    <div className="text-xs bg-emerald-600 px-2 py-0.5 rounded text-white">
                      Active
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">{selectedSite.description}</div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500 mb-1">Reads</div>
                      <div className="text-emerald-400 font-semibold">{selectedSite.reads.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500 mb-1">Taxa</div>
                      <div className="text-blue-400 font-semibold">{selectedSite.taxa}</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <div className="text-gray-500 mb-1">Position</div>
                      <div className="text-gray-300 font-mono text-[10px]">
                        {selectedSite.lat.toFixed(2)}°, {selectedSite.lng.toFixed(2)}°
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                {sites
                  .filter(site => selectedRegion === 'all' || site.description.toLowerCase().includes(selectedRegion))
                  .map(site => (
                    <div
                      key={site.id}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedSite?.id === site.id
                          ? 'bg-emerald-900 bg-opacity-30 border border-emerald-600'
                          : 'hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        setSelectedSite(site);
                        setMapPosition({ coordinates: [site.lng, site.lat], zoom: 2 });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedSite?.id === site.id ? 'bg-emerald-400' : 'bg-emerald-500'
                        }`}></div>
                        <span className="text-sm text-gray-300">{site.name}</span>
                        <span className="text-xs text-gray-500">({site.description})</span>
                      </div>
                      <span className="text-xs text-gray-400">{site.taxa} taxa</span>
                    </div>
                  ))}
              </div>
            </div>
    
            {/* Population Distribution Timeline */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Population Distribution Over Time</h3>
                  <p className="text-xs text-gray-400 mt-1">Temporal biodiversity analysis</p>
                </div>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="mb-4">
                <input
                  type="range"
                  min="2023"
                  max="2025"
                  value={timelineYear}
                  onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-400">2023</span>
                  <span className="text-sm font-semibold text-emerald-400">{timelineYear}</span>
                  <span className="text-xs text-gray-400">2025</span>
                </div>
              </div>
    
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Native Species</span>
                    <span className="text-white font-semibold">{timelineData[timelineYear].native}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(timelineData[timelineYear].native / 130) * 100}%` }}
                    ></div>
                  </div>
                </div>
    
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Invasive Species</span>
                    <span className="text-red-400 font-semibold">{timelineData[timelineYear].invasive}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(timelineData[timelineYear].invasive / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
    
                <div className="pt-4 border-t border-gray-700">
  <div className="text-sm text-gray-400 mb-2">Diversity Trend</div>
  <div className="h-32">
    <div className="flex items-end gap-3 h-24">
      {[2023, 2024, 2025].map(year => {
        const height = (timelineData[year].diversity / 3.5) * 100;
        
        return (
          <div key={year} className="flex-1 flex flex-col items-center h-full justify-end">
            <div
              className={`w-full rounded-t transition-all duration-500 ${
                year === timelineYear ? 'bg-gray-500' : 'bg-gray-700'
              }`}
              style={{ height: `${height}%` }}
            ></div>
          </div>
        );
      })}
    </div>
    <div className="flex gap-3 mt-2">
      {[2023, 2024, 2025].map(year => (
        <div key={year} className="flex-1 text-center">
          <span className="text-xs text-gray-500">{year}</span>
        </div>
      ))}
    </div>
  </div>
</div>
    
                {timelineYear === 2025 && (
                  <div className="bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <div className="text-xs font-semibold text-red-400">Alert: Invasive Species Detected</div>
                    </div>
                    <div className="text-xs text-gray-300">Significant increase in non-native taxa observed since 2023</div>
                  </div>
                )}
              </div>
            </div>
          </div>
    
          
        </div>
      );
    };



  const ComparativeAnalysisTab = () => {
    const availableSamples = samples.filter(sample => {
      if (comparisonFilters.sites.length > 0 && !comparisonFilters.sites.includes(sample.siteId)) {
        return false;
      }
      if (comparisonFilters.dateRange.start && sample.date < comparisonFilters.dateRange.start) {
        return false;
      }
      if (comparisonFilters.dateRange.end && sample.date > comparisonFilters.dateRange.end) {
        return false;
      }
      return true;
    });
  
    const toggleSampleSelection = (sampleId) => {
      setSelectedSamplesForComparison(prev => 
        prev.includes(sampleId) 
          ? prev.filter(id => id !== sampleId)
          : [...prev, sampleId]
      );
    };
  
    const toggleSiteFilter = (siteId) => {
      setComparisonFilters(prev => ({
        ...prev,
        sites: prev.sites.includes(siteId)
          ? prev.sites.filter(id => id !== siteId)
          : [...prev.sites, siteId]
      }));
    };
  
    const sharedSpecies = getSharedClusters(selectedSamplesForComparison);
    
    return (
      <div className="space-y-6">
        {/* Sample Selector */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Select Samples to Compare</h3>
            </div>
            <span className="text-sm text-gray-400">
              {selectedSamplesForComparison.length} sample(s) selected
            </span>
          </div>
  
          {/* Filters */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Filter by Sites</label>
              <div className="flex flex-wrap gap-2">
                {sites.map(site => (
                  <button
                    key={site.id}
                    onClick={() => toggleSiteFilter(site.id)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      comparisonFilters.sites.includes(site.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {site.name}
                  </button>
                ))}
              </div>
            </div>
  
            <div>
              <label className="text-xs text-gray-400 mb-2 block">Start Date</label>
              <input
                type="date"
                value={comparisonFilters.dateRange.start}
                onChange={(e) => setComparisonFilters({
                  ...comparisonFilters,
                  dateRange: { ...comparisonFilters.dateRange, start: e.target.value }
                })}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm"
              />
            </div>
  
            <div>
              <label className="text-xs text-gray-400 mb-2 block">End Date</label>
              <input
                type="date"
                value={comparisonFilters.dateRange.end}
                onChange={(e) => setComparisonFilters({
                  ...comparisonFilters,
                  dateRange: { ...comparisonFilters.dateRange, end: e.target.value }
                })}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm"
              />
            </div>
          </div>
  
          {/* Sample Selection Grid */}
          <div className="grid grid-cols-4 gap-3">
            {availableSamples.map(sample => {
              const site = sites.find(s => s.id === sample.siteId);
              const sampleClusters = getSampleClusters(sample.id);
              const isSelected = selectedSamplesForComparison.includes(sample.id);
              
              return (
                <button
                  key={sample.id}
                  onClick={() => toggleSampleSelection(sample.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-900 bg-opacity-20'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-white text-sm">{sample.name}</div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{site?.name}</div>
                  <div className="text-xs text-gray-500">{sample.date}</div>
                  <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
                    {sampleClusters.length} clusters
                  </div>
                </button>
              );
            })}
          </div>
  
          {availableSamples.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No samples match the selected filters
            </div>
          )}
        </div>
  
        {/* Comparison View */}
        {selectedSamplesForComparison.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <Layers className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Samples Selected</h3>
            <p className="text-gray-400">
              Select two or more samples above to begin comparative analysis
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sample Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {selectedSamplesForComparison.map(sampleId => {
                const sample = samples.find(s => s.id === sampleId);
                const site = sites.find(s => s.id === sample.siteId);
                const sampleClusters = getSampleClusters(sampleId);
                const totalReads = sampleClusters.reduce((sum, c) => sum + c.size, 0);
                const confidentClusters = sampleClusters.filter(c => c.confidence > 0.8);
                const diversity = calculateDiversityIndex(sampleId);
                const otherSamples = selectedSamplesForComparison.filter(id => id !== sampleId);
                const uniqueSpecies = getUniqueClusters(sampleId, otherSamples);
  
                return (
                  <div key={sampleId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-emerald-900 to-blue-900 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-white text-lg">{sample.name}</div>
                          <div className="text-sm text-gray-300">{site?.name}</div>
                        </div>
                        <button
                          onClick={() => toggleSampleSelection(sampleId)}
                          className="text-gray-300 hover:text-white"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-xs text-gray-400">{sample.date}</div>
                    </div>
  
                    {/* KPIs */}
                    <div className="p-4 border-b border-gray-700">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-gray-400">Total Reads</div>
                          <div className="text-lg font-bold text-white">{totalReads.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Clusters</div>
                          <div className="text-lg font-bold text-white">{sampleClusters.length}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Confident</div>
                          <div className="text-lg font-bold text-emerald-400">{confidentClusters.length}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Diversity</div>
                          <div className="text-lg font-bold text-purple-400">{diversity}</div>
                        </div>
                      </div>
                    </div>
  
                    {/* Abundance Pie Chart */}
                    <div className="p-4 border-b border-gray-700">
                      <div className="text-xs font-semibold text-gray-400 mb-3">TAXON DISTRIBUTION</div>
                      <div className="flex items-center gap-4">
                        <svg width="80" height="80" viewBox="0 0 80 80">
                          {(() => {
                            const taxonCounts = sampleClusters.reduce((acc, c) => {
                              acc[c.taxon] = (acc[c.taxon] || 0) + 1;
                              return acc;
                            }, {});
                            let currentAngle = 0;
                            return Object.entries(taxonCounts).map(([taxon, count], idx) => {
                              const percentage = count / sampleClusters.length;
                              const angle = percentage * 360;
                              const x1 = 40 + 35 * Math.cos((currentAngle - 90) * Math.PI / 180);
                              const y1 = 40 + 35 * Math.sin((currentAngle - 90) * Math.PI / 180);
                              const x2 = 40 + 35 * Math.cos((currentAngle + angle - 90) * Math.PI / 180);
                              const y2 = 40 + 35 * Math.sin((currentAngle + angle - 90) * Math.PI / 180);
                              const largeArc = angle > 180 ? 1 : 0;
                              const path = `M 40 40 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`;
                              const colors = { 'Protista': '#10b981', 'Bacteria': '#3b82f6', 'Archaea': '#a855f7', 'Fungi': '#f59e0b', 'Unknown': '#6b7280' };
                              currentAngle += angle;
                              return <path key={idx} d={path} fill={colors[taxon] || '#6b7280'} />;
                            });
                          })()}
                        </svg>
                        <div className="flex-1 space-y-1">
                          {Object.entries(sampleClusters.reduce((acc, c) => {
                            acc[c.taxon] = (acc[c.taxon] || 0) + 1;
                            return acc;
                          }, {})).map(([taxon, count]) => (
                            <div key={taxon} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getTaxonColor(taxon)}`}></div>
                                <span className="text-gray-300">{taxon}</span>
                              </div>
                              <span className="text-gray-500">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
  
                    {/* Top Clusters */}
                    <div className="p-4">
                      <div className="text-xs font-semibold text-gray-400 mb-3">
                        TOP CLUSTERS ({sampleClusters.length})
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {sampleClusters
                          .sort((a, b) => b.abundance - a.abundance)
                          .slice(0, 5)
                          .map(cluster => (
                            <div key={cluster.id} className="flex items-center justify-between p-2 bg-gray-900 rounded">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getTaxonColor(cluster.taxon)}`}></div>
                                <span className="text-xs text-gray-300 truncate">{cluster.species}</span>
                              </div>
                              <span className="text-xs text-emerald-400 font-semibold ml-2">
                                {cluster.abundance}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
  
                    {/* Unique Species Badge */}
                    {uniqueSpecies.length > 0 && (
                      <div className="px-4 pb-4">
                        <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-2 text-center">
                          <div className="text-xs text-blue-400 font-semibold">
                            {uniqueSpecies.length} unique species
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
  
            {/* Comparative Visualizations */}
            {selectedSamplesForComparison.length >= 2 && (
              <div className="grid grid-cols-2 gap-6">
                {/* Shared vs Unique */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Shared vs Unique Species</h3>
                  <div className="space-y-4">
                    <div className="bg-emerald-900 bg-opacity-20 border border-emerald-800 rounded-lg p-4">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">
                        {sharedSpecies.length}
                      </div>
                      <div className="text-sm text-gray-300">Shared across all samples</div>
                      {sharedSpecies.length > 0 && (
                        <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
                          {sharedSpecies.slice(0, 5).map((species, idx) => (
                            <div key={idx} className="text-xs text-gray-400 italic">• {species}</div>
                          ))}
                          {sharedSpecies.length > 5 && (
                            <div className="text-xs text-gray-500">+{sharedSpecies.length - 5} more</div>
                          )}
                        </div>
                      )}
                    </div>
  
                    {selectedSamplesForComparison.map(sampleId => {
                      const sample = samples.find(s => s.id === sampleId);
                      const otherSamples = selectedSamplesForComparison.filter(id => id !== sampleId);
                      const uniqueCount = getUniqueClusters(sampleId, otherSamples).length;
                      
                      return (
                        <div key={sampleId} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                          <span className="text-sm text-gray-300">{sample.name}</span>
                          <span className="text-sm font-semibold text-blue-400">{uniqueCount} unique</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
  
                {/* Abundance Comparison */}
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Abundance Comparison</h3>
                  <div className="space-y-3">
                    {(() => {
                      const allSpecies = new Set(
                        selectedSamplesForComparison.flatMap(id => 
                          getSampleClusters(id).map(c => c.species)
                        )
                      );
                      return [...allSpecies].slice(0, 8).map(species => {
                        const maxAbundance = Math.max(
                          ...selectedSamplesForComparison.map(sampleId => {
                            const cluster = getSampleClusters(sampleId).find(c => c.species === species);
                            return cluster ? cluster.abundance : 0;
                          })
                        );
                        
                        return (
                          <div key={species}>
                            <div className="text-xs text-gray-400 mb-1 italic truncate">{species}</div>
                            <div className="flex gap-1">
                              {selectedSamplesForComparison.map(sampleId => {
                                const cluster = getSampleClusters(sampleId).find(c => c.species === species);
                                const abundance = cluster ? cluster.abundance : 0;
                                
                                return (
                                  <div
                                    key={sampleId}
                                    className="flex-1 bg-gray-700 rounded-full h-6 relative group cursor-pointer overflow-hidden"
                                  >
                                    <div
                                      className={`h-6 rounded-full ${cluster ? getTaxonColor(cluster.taxon) : 'bg-gray-600'}`}
                                      style={{ width: `${(abundance / maxAbundance) * 100}%` }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-xs text-white font-semibold">
                                        {abundance.toFixed(1)}%
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                    {selectedSamplesForComparison.map((sampleId, idx) => {
                      const sample = samples.find(s => s.id === sampleId);
                      return (
                        <div key={sampleId} className="flex-1 text-center">
                          <div className="text-xs text-gray-500">{sample.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Add this component before the return statement:
const DataUploadTab = () => {
  const pipelineSteps = [
    { id: 1, name: 'Quality Control', status: currentPipelineStep > 0 ? 'complete' : currentPipelineStep === 0 && isProcessing ? 'active' : 'pending' },
    { id: 2, name: 'Filtering', status: currentPipelineStep > 1 ? 'complete' : currentPipelineStep === 1 && isProcessing ? 'active' : 'pending' },
    { id: 3, name: 'Clustering', status: currentPipelineStep > 2 ? 'complete' : currentPipelineStep === 2 && isProcessing ? 'active' : 'pending' },
    { id: 4, name: 'Classification', status: currentPipelineStep > 3 ? 'complete' : currentPipelineStep === 3 && isProcessing ? 'active' : 'pending' }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    validateAndAddFiles(files);
  };

  const validateAndAddFiles = (files) => {
    const errors = [];
    const validFiles = [];

    files.forEach(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      if (!['fasta', 'fastq', 'fa', 'fq'].includes(extension)) {
        errors.push(`${file.name}: Invalid format. Only FASTA/FASTQ files accepted.`);
      } else if (file.size > 500000000) {
        errors.push(`${file.name}: File too large (max 500MB)`);
      } else {
        validFiles.push({
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: extension,
          status: 'ready',
          file: file
        });
      }
    });

    setValidationErrors(errors);
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    validateAndAddFiles(files);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const startProcessing = () => {
    if (uploadedFiles.length === 0) {
      setValidationErrors(['Please upload at least one file before processing']);
      return;
    }
    if (!metadata.site || !metadata.date) {
      setValidationErrors(['Please fill in required metadata fields (Site and Date)']);
      return;
    }

    setIsProcessing(true);
    setCurrentPipelineStep(0);
    setPipelineProgress(0);
    setValidationErrors([]);

    const interval = setInterval(() => {
      setPipelineProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setCurrentPipelineStep(4);
          return 100;
        }
        
        const newProgress = prev + 2;
        if (newProgress >= 25 && currentPipelineStep === 0) setCurrentPipelineStep(1);
        if (newProgress >= 50 && currentPipelineStep === 1) setCurrentPipelineStep(2);
        if (newProgress >= 75 && currentPipelineStep === 2) setCurrentPipelineStep(3);
        
        return newProgress;
      });
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Upload Sequencing Data</h3>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging ? 'border-emerald-500 bg-emerald-900 bg-opacity-10' : 'border-gray-600 bg-gray-900'
          }`}
        >
          <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">Drag and drop files here, or click to browse</p>
          <p className="text-sm text-gray-500 mb-4">Supports FASTA and FASTQ formats (max 500MB per file)</p>
          <input
            type="file"
            multiple
            accept=".fasta,.fastq,.fa,.fq"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Browse Files
          </label>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-4 bg-red-900 bg-opacity-20 border border-red-800 rounded-lg p-4">
            <div className="text-sm font-semibold text-red-400 mb-2">Validation Errors:</div>
            {validationErrors.map((error, idx) => (
              <div key={idx} className="text-xs text-gray-300 mb-1">• {error}</div>
            ))}
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6 space-y-2">
            <div className="text-sm font-semibold text-gray-400 mb-3">
              Uploaded Files ({uploadedFiles.length})
            </div>
            {uploadedFiles.map(file => (
              <div key={file.id} className="flex items-center justify-between bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm text-white font-medium">{file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type.toUpperCase()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-400 hover:text-red-300 text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Metadata Form */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Sample Metadata</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Collection Site <span className="text-red-400">*</span>
            </label>
            <select
              value={metadata.site}
              onChange={(e) => setMetadata({...metadata, site: e.target.value})}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            >
              <option value="">Select site...</option>
              {sites.map(site => (
                <option key={site.id} value={site.name}>{site.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">
              Collection Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={metadata.date}
              onChange={(e) => setMetadata({...metadata, date: e.target.value})}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Depth (meters)</label>
            <input
              type="number"
              value={metadata.depth}
              onChange={(e) => setMetadata({...metadata, depth: e.target.value})}
              placeholder="e.g., 500"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              value={metadata.temperature}
              onChange={(e) => setMetadata({...metadata, temperature: e.target.value})}
              placeholder="e.g., 15.5"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Salinity (PSU)</label>
            <input
              type="number"
              step="0.1"
              value={metadata.salinity}
              onChange={(e) => setMetadata({...metadata, salinity: e.target.value})}
              placeholder="e.g., 35.2"
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Processing Pipeline */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Processing Pipeline</h3>
          </div>
          <button
            onClick={startProcessing}
            disabled={isProcessing || uploadedFiles.length === 0}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
          >
            {isProcessing ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            {isProcessing ? 'Processing...' : 'Start Processing'}
          </button>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-4 mb-6">
          {pipelineSteps.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step.status === 'complete' ? 'bg-emerald-500 border-emerald-500' :
                step.status === 'active' ? 'bg-blue-500 border-blue-500 animate-pulse' :
                'bg-gray-700 border-gray-600'
              }`}>
                {step.status === 'complete' ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : step.status === 'active' ? (
                  <Loader className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <span className="text-gray-400 text-sm">{idx + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  step.status === 'complete' ? 'text-emerald-400' :
                  step.status === 'active' ? 'text-blue-400' :
                  'text-gray-500'
                }`}>
                  {step.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {step.status === 'complete' && 'Completed'}
                  {step.status === 'active' && 'In progress...'}
                  {step.status === 'pending' && 'Waiting'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        {isProcessing && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white font-semibold">{pipelineProgress}%</span>
            </div>
            <div className="bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${pipelineProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {pipelineProgress === 100 && !isProcessing && (
          <div className="bg-emerald-900 bg-opacity-20 border border-emerald-800 rounded-lg p-4 mt-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm font-semibold text-emerald-400">Processing Complete!</div>
                <div className="text-xs text-gray-300 mt-1">
                  Data is now available in the Overview and Cluster Explore tabs
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

  const ClusterExploreTab = () => (
    <div className="space-y-6">
      {/* Enhanced Filters Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Filter Clusters</h3>
          <span className="text-sm text-gray-400 ml-auto">
            Showing {filteredClusters.length} of {clusters.length} clusters
          </span>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {/* Site Filter */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Site/Location</label>
            <select 
              value={filters.site}
              onChange={(e) => setFilters({...filters, site: e.target.value, sample: 'all'})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm"
            >
              <option value="all">All Sites</option>
              {sites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
          </div>

          {/* Sample Filter */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Sample ID</label>
            <select 
              value={filters.sample}
              onChange={(e) => setFilters({...filters, sample: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm"
              disabled={filters.site === 'all'}
            >
              <option value="all">All Samples</option>
              {availableSamples.map(sample => (
                <option key={sample.id} value={sample.id}>
                  {sample.name} ({sample.date})
                </option>
              ))}
            </select>
          </div>

          {/* Taxon Filter */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Taxonomic Group</label>
            <select 
              value={filters.taxon}
              onChange={(e) => setFilters({...filters, taxon: e.target.value})}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 text-sm"
            >
              <option value="all">All Taxa</option>
              <option value="Bacteria">Bacteria</option>
              <option value="Archaea">Archaea</option>
              <option value="Protista">Protista</option>
              <option value="Fungi">Fungi</option>
            </select>
          </div>

          {/* Abundance Filter */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Min Abundance: {filters.minAbundance}%
            </label>
            <input 
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={filters.minAbundance}
              onChange={(e) => setFilters({...filters, minAbundance: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Confidence Filter */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Min Confidence: {(filters.minConfidence * 100).toFixed(0)}%
            </label>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={filters.minConfidence}
              onChange={(e) => setFilters({...filters, minConfidence: parseFloat(e.target.value)})}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setFilters({site: 'all', sample: 'all', taxon: 'all', minAbundance: 0, minConfidence: 0})}
            className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={() => setFilters({...filters, minConfidence: 0.9})}
            className="px-3 py-1 text-xs bg-emerald-900 hover:bg-emerald-800 text-emerald-300 rounded-full transition-colors"
          >
            High Confidence Only
          </button>
          <button
            onClick={() => setFilters({...filters, minAbundance: 10})}
            className="px-3 py-1 text-xs bg-blue-900 hover:bg-blue-800 text-blue-300 rounded-full transition-colors"
          >
            Abundant Species
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Cluster List */}
        <div className="col-span-2 space-y-3 max-h-[800px] overflow-y-auto pr-2">
          {filteredClusters.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
              <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No clusters match the current filters</p>
            </div>
          ) : (
            filteredClusters.map(cluster => (
              <div
                key={cluster.id}
                onClick={() => setSelectedCluster(cluster)}
                className={`bg-gray-800 rounded-lg p-4 border cursor-pointer transition-all ${
                  selectedCluster?.id === cluster.id
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-3 h-3 rounded-full mt-1 ${getTaxonColor(cluster.taxon)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{cluster.name}</span>
                        <span className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-400">
                          {cluster.id}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        {cluster.taxon} → {cluster.family} → <span className="italic">{cluster.species}</span>
                      </div>
                      
                      {/* Mini sparkline for abundance across sites */}
                      <div className="flex items-end gap-0.5 h-6 mb-2">
                        {cluster.abundanceAcrossSites.map((val, i) => (
                          <div
                            key={i}
                            className={`flex-1 ${getTaxonColor(cluster.taxon)} opacity-60 rounded-t`}
                            style={{ height: `${(val / 16) * 100}%` }}
                          ></div>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {sites.find(s => s.id === cluster.siteId)?.name} • {cluster.sampleId}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 ml-4">
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Size</div>
                      <div className="text-sm font-semibold text-white">{cluster.size.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Abundance</div>
                      <div className="text-sm font-semibold text-emerald-400">{cluster.abundance}%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">Confidence</div>
                      <div className={`text-sm font-semibold ${
                        cluster.confidence > 0.9 ? 'text-emerald-400' : cluster.confidence > 0.8 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {(cluster.confidence * 100).toFixed(0)}%
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Cluster Details Panel */}
        {selectedCluster ? (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-h-[800px] overflow-y-auto sticky top-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Cluster Details</h3>
              <div className={`w-3 h-3 rounded-full ${getTaxonColor(selectedCluster.taxon)}`}></div>
            </div>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="text-2xl font-bold text-white mb-1">{selectedCluster.name}</div>
                <div className="text-sm text-gray-400 italic mb-3">{selectedCluster.species}</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                    {selectedCluster.size.toLocaleString()} reads
                  </span>
                  <span className={`px-2 py-1 rounded text-xs text-white ${getTaxonColor(selectedCluster.taxon)}`}>
                    {selectedCluster.taxon}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    selectedCluster.confidence > 0.9 ? 'bg-emerald-900 text-emerald-300' : 
                    selectedCluster.confidence > 0.8 ? 'bg-amber-900 text-amber-300' : 
                    'bg-red-900 text-red-300'
                  }`}>
                    {(selectedCluster.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </div>

              {/* Taxonomic Hierarchy Tree */}
<div>
  <div className="text-xs font-semibold text-gray-400 mb-3 flex items-center gap-2">
    <Layers className="w-4 h-4" />
    TAXONOMIC HIERARCHY
  </div>
  <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
    {selectedCluster.isNovel ? (
      <div className="space-y-3">
        <div className="text-sm text-amber-400 font-semibold mb-3">
          ⚠ Incomplete Classification
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gray-600"></div>
            <span className="text-gray-500">Domain:</span>
            <span className="text-white">Eukaryota</span>
          </div>
          <div className="flex items-center gap-2 pl-3">
            <div className="w-1 h-4 bg-gray-600"></div>
            <span className="text-gray-500">Kingdom:</span>
            <span className="text-gray-500 italic">Unclassified</span>
          </div>
          <div className="flex items-center gap-2 pl-6">
            <div className="w-1 h-4 bg-amber-500"></div>
            <span className="text-gray-500">Closest Match:</span>
            <span className="text-amber-400">{selectedCluster.novelInfo.closestMatch}</span>
          </div>
        </div>
        
        {/* Novel Organism Information Panel follows here */}
      </div>
    ) : (
      // Normal taxonomy display for known organisms
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-4 bg-gray-600"></div>
                      <span className="text-gray-500">Domain:</span>
                      <span className="text-white">Eukaryota</span>
                    </div>
                    <div className="flex items-center gap-2 pl-3">
                      <div className="w-1 h-4 bg-gray-600"></div>
                      <span className="text-gray-500">Kingdom:</span>
                      <span className="text-white">{selectedCluster.taxon}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-6">
                      <div className="w-1 h-4 bg-gray-600"></div>
                      <span className="text-gray-500">Phylum:</span>
                      <span className="text-emerald-400">{selectedCluster.phylum}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-9">
                      <div className="w-1 h-4 bg-gray-600"></div>
                      <span className="text-gray-500">Class:</span>
                      <span className="text-white">{selectedCluster.class}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-12">
                      <div className="w-1 h-4 bg-gray-600"></div>
                      <span className="text-gray-500">Order:</span>
                      <span className="text-white">{selectedCluster.order}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-15">
                      <div className="w-1 h-4 bg-emerald-500"></div>
                      <span className="text-gray-500">Genus:</span>
                      <span className="text-emerald-400 font-semibold">{selectedCluster.genus}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-18">
                      <div className="w-1 h-4 bg-emerald-500"></div>
                      <span className="text-gray-500">Species:</span>
                      <span className="text-emerald-400 font-semibold italic">{selectedCluster.species}</span>
                    </div>
                  </div>
                </div>
    )}
  </div>
</div>

              {/* Ecological Role */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-2">ECOLOGICAL ROLE</div>
                <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-gray-300">{selectedCluster.ecologicalRole}</p>
                </div>
              </div>

              {/* Read Distribution Chart */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3">READ DISTRIBUTION</div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-end gap-1 h-32">
                    {selectedCluster.readDistribution && selectedCluster.readDistribution.map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 ${getTaxonColor(selectedCluster.taxon)} rounded-t relative group cursor-pointer`}
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {height}%
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Sample 1</span>
                    <span>Sample 8</span>
                  </div>
                </div>
              </div>

              {/* Abundance Across Sites */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3">ABUNDANCE ACROSS SITES</div>
                <div className="space-y-2">
                  {selectedCluster.abundanceAcrossSites && sites.slice(0, 5).map((site, i) => {
                    const abundance = selectedCluster.abundanceAcrossSites[i];
                    if (abundance === undefined) return null;
                    return (
                      <div key={site.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-300">{site.name}</span>
                          <span className="text-white font-semibold">{abundance.toFixed(1)}%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getTaxonColor(selectedCluster.taxon)}`}
                            style={{ width: `${(abundance / 16) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Related Clusters Network */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3">RELATED CLUSTERS</div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {selectedCluster.relatedClusters && selectedCluster.relatedClusters.length > 0 ? (
                      selectedCluster.relatedClusters.map(relatedId => {
                        const related = clusters.find(c => c.id === relatedId);
                        if (!related) return null;
                        return (
                          <button
                            key={relatedId}
                            onClick={() => setSelectedCluster(related)}
                            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg border border-gray-600 transition-colors"
                          >
                            <div className={`w-2 h-2 rounded-full ${getTaxonColor(related.taxon)}`}></div>
                            <span className="text-sm text-gray-300">{related.name}</span>
                            <span className="text-xs text-gray-500">{related.abundance}%</span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="text-sm text-gray-500">No related clusters identified</div>
                    )}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Clusters with similar taxonomic profiles or co-occurrence patterns
                  </div>
                </div>
              </div>

              {/* Community Contribution Pie Chart */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3">COMMUNITY CONTRIBUTION</div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-center mb-3">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="20"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="20"
                        strokeDasharray={`${selectedCluster.abundance * 3.14} ${314 - selectedCluster.abundance * 3.14}`}
                        transform="rotate(-90 60 60)"
                      />
                      <text
                        x="60"
                        y="60"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-2xl font-bold fill-white"
                      >
                        {selectedCluster.abundance}%
                      </text>
                    </svg>
                  </div>
                  <div className="text-center text-xs text-gray-400">
                    of total community reads at {sites.find(s => s.id === selectedCluster.siteId)?.name}
                  </div>
                </div>
              </div>

              {/* Sequence Summary */}
              <div>
                <div className="text-xs font-semibold text-gray-400 mb-3">SEQUENCE INFORMATION</div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Reads:</span>
                      <span className="text-white font-semibold">{selectedCluster.size.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Unique Sequences:</span>
                      <span className="text-white font-semibold">{Math.floor(selectedCluster.size * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Avg. Sequence Length:</span>
                      <span className="text-white font-semibold">~450 bp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gene Marker:</span>
                      <span className="text-white font-semibold">18S rRNA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Quality Score:</span>
                      <span className="text-emerald-400 font-semibold">Q{Math.floor(30 + selectedCluster.confidence * 10)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Export Data
                </button>
                <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View Sequences
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Select a Cluster</h3>
            <p className="text-gray-400 text-sm">
              Click on any cluster from the list to view detailed information,<br />
              taxonomic hierarchy, and abundance patterns
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Biodiversity Sequencing Platform</h1>
          <p className="text-gray-400">Explore and analyze marine biodiversity through DNA sequencing data</p>
        </div>

        <div className="flex gap-2 mb-6 border-b border-gray-800">
        {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'upload', label: 'Data Upload', icon: Upload },

  { id: 'explore', label: 'Cluster Explore', icon: Database },
  { id: 'comparative', label: 'Comparative Analysis', icon: Layers },
  { id: 'reports', label: 'Reports', icon: FileDown }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'explore' && <ClusterExploreTab />}
        {activeTab === 'upload' && <DataUploadTab />}
        {activeTab === 'comparative' && <ComparativeAnalysisTab />}
        {activeTab === 'reports' && (
          <div className="bg-gray-800 rounded-lg p-12 border border-gray-700 text-center">
            <FileDown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Reports & Downloads</h3>
            <p className="text-gray-400">Export functionality coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiodiversityDashboard;