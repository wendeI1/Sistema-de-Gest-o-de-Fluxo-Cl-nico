import { useState, useRef, useEffect } from 'react'
import './App.css'

// Estruturas
import { LinkedList } from './data-structures/LinkedList'
import { Queue } from './data-structures/Queue'
import { Stack } from './data-structures/Stack'
import { measureTime, bubbleSort, quickSort } from './utils/sorting'

// Componentes
import { PatientsList } from './components/PatientsList'
import { TriageQueue } from './components/TriageQueue'
import { MedicalConsultation } from './components/MedicalConsultation'
import { Dashboard } from './components/Dashboard'

function App() {
  // Use Refs para manter as instâncias verdadeiras das estruturas
  const linkedList = useRef(new LinkedList());
  const triageQueue = useRef(new Queue());
  const historyStack = useRef(new Stack());

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
    linkedList.current.append(data);
    setPatients(linkedList.current.toArray());
    updateMetrics();
  };

  const handleSearch = (id) => {
    const { result, time } = measureTime(() => linkedList.current.searchById(id));
    updateMetrics({ searchTime: time, searchFound: !!result });
    if (result) {
      alert(`Paciente encontrado: ${result.name} - ${result.age} anos`);
    } else {
      alert("Paciente não encontrado!");
    }
  };

  const handleSort = (type) => {
    const arr = linkedList.current.toArray();
    let sortedArr = [];
    let time = 0;

    if (type === 'bubble') {
      const res = measureTime(() => bubbleSort(arr, 'id'));
      sortedArr = res.result;
      time = res.time;
    } else {
      const res = measureTime(() => quickSort(arr, 'id'));
      sortedArr = res.result;
      time = res.time;
    }

    linkedList.current.fromArray(sortedArr);
    setPatients(linkedList.current.toArray());
    updateMetrics({
      sortTime: time,
      lastSortAlgo: type === 'bubble' ? 'Bubble Sort' : 'Quick Sort'
    });
  };

  // --- Funções da Fila (Triagem) ---
  const handleEnqueue = () => {
    if (patients.length === 0) return;
    // Pega um paciente aleatório da lista para "chegar" na clínica
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    triageQueue.current.enqueue(randomPatient);
    setQueue(triageQueue.current.toArray());
    updateMetrics();
  };

  const handleDequeue = () => {
    const p = triageQueue.current.dequeue();
    if (p) {
      setCurrentPatient(p);
      historyStack.current = new Stack(); // reseta histórico para o novo paciente
      setStack(historyStack.current.toArray());
      setQueue(triageQueue.current.toArray());
      updateMetrics();
    }
  };

  // --- Funções da Pilha (Consulta) ---
  const handlePushAction = (desc) => {
    historyStack.current.push(desc);
    setStack(historyStack.current.toArray());
    updateMetrics();
  };

  const handlePopAction = () => {
    historyStack.current.pop();
    setStack(historyStack.current.toArray());
    updateMetrics();
  };

  // Mock initial data if empty
  useEffect(() => {
    if (linkedList.current.size === 0) {
      handleAddPatient({ id: '9001', name: 'João Silva', age: 45 });
      handleAddPatient({ id: '1023', name: 'Maria Souza', age: 32 });
      handleAddPatient({ id: '5040', name: 'Carlos Santos', age: 58 });
    }
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
