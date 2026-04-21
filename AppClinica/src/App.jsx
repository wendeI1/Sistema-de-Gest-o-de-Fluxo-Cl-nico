import { useState, useRef, useEffect } from 'react'
import './App.css'

// Estruturas de Dados migraram para o backend Python (FastAPI).
// Em breve faremos requisições via fetch/axios para a API.

// Componentes
import { PatientsList } from './components/PatientsList'
import { TriageQueue } from './components/TriageQueue'
import { MedicalConsultation } from './components/MedicalConsultation'
import { Dashboard } from './components/Dashboard'

function App() {
  // Removido: Instâncias locais das estruturas de dados JS
  // Agora essas listas e filas serão mantidas no backend Python.

  // Estados apenas para renderização e métricas
  const [patients, setPatients] = useState([]);
  const [queue, setQueue] = useState([]);
  const [stack, setStack] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Métricas de desempenho
  const [metrics, setMetrics] = useState({
    listSize: 0,
    queueSize: 0,
    stackDepth: 0,
    sortTime: '0.0000',
    lastSortAlgo: '-',
    searchTime: '0.0000',
    searchFound: false
  });

  const updateMetrics = (updates) => {
    setMetrics(prev => ({
      ...prev,
      listSize: linkedList.current.size,
      queueSize: triageQueue.current.size(),
      stackDepth: historyStack.current.size(),
      ...updates
    }));
  };

  // --- Funções da Lista (Cadastro) ---
  const handleAddPatient = (data) => {
    // TODO: Enviar POST para o backend Python (/patients)
    alert("Função temporariamente desativada: O backend Python foi criado e em breve será conectado!");
  };

  const handleSearch = (id) => {
    // TODO: Fazer GET para o backend Python (/patients/{id})
    alert("Função temporariamente desativada: O backend Python será conectado em breve.");
  };

  const handleSort = (type) => {
    // TODO: Fazer requisição para o backend Python realizar a ordenação
    alert("Ordenação passará a ser processada no servidor Python.");
  };

  // --- Funções da Fila (Triagem) ---
  const handleEnqueue = () => {
    // TODO: Fazer POST para /queue no backend Python
  };

  const handleDequeue = () => {
    // TODO: Fazer POST para /queue/dequeue no backend Python
  };

  // --- Funções da Pilha (Consulta) ---
  const handlePushAction = (desc) => {
    // TODO: Integrar com a API Python (/stack/push)
  };

  const handlePopAction = () => {
    // TODO: Integrar com a API Python (/stack/pop)
  };

  // Mock initial data if empty
  useEffect(() => {
    // Aqui no futuro faremos um GET /patients para inicializar
  }, []);

  return (
    <>
      <h1 className="title-header">Fluxo Clínico & Performance</h1>
      <Dashboard metrics={metrics} />
      
      <div className="app-grid" style={{ marginTop: '2rem' }}>
        <PatientsList 
          patients={patients} 
          onAddPatient={handleAddPatient} 
          onSearch={handleSearch}
          onSort={handleSort}
        />
        <TriageQueue 
          queue={queue} 
          allPatients={patients}
          onEnqueue={handleEnqueue}
          onDequeue={handleDequeue}
        />
        <MedicalConsultation 
          currentPatient={currentPatient}
          stack={stack}
          onPush={handlePushAction}
          onPop={handlePopAction}
        />
      </div>
    </>
  )
}

export default App
