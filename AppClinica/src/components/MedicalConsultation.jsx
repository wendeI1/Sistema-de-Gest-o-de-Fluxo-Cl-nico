import React, { useState } from 'react';
import { Activity, Undo2, PlusCircle } from 'lucide-react';

export function MedicalConsultation({ currentPatient, stack, onPush, onPop }) {
  const [actionDesc, setActionDesc] = useState('');

  const handlePush = (e) => {
    e.preventDefault();
    if (!actionDesc) return;
    onPush(`[${new Date().toLocaleTimeString()}] ${actionDesc}`);
    setActionDesc('');
  };

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <h2 className="panel-title"><Activity className="text-accent" /> Histórico de Consulta (LIFO)</h2>
      </div>

      {currentPatient ? (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', border: '1px solid var(--accent)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Paciente Atual: {currentPatient.name}</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>ID: {currentPatient.id} | Idade: {currentPatient.age}</p>
        </div>
      ) : (
        <div className="empty-state" style={{ marginBottom: '1.5rem' }}>
          Nenhum paciente em atendimento. Inicie o atendimento pela Fila.
        </div>
      )}

      <form onSubmit={handlePush} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input 
          className="input-control" 
          placeholder="Descrição da ação (ex: Aferiu pressão)" 
          value={actionDesc}
          onChange={e => setActionDesc(e.target.value)}
          disabled={!currentPatient}
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn btn-accent" disabled={!currentPatient}>
          <PlusCircle size={18} /> Registrar
        </button>
      </form>

      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn btn-danger" onClick={onPop} disabled={stack.length === 0}>
          <Undo2 size={18} /> Desfazer Última Ação
        </button>
      </div>

      <div className="list-container" style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {stack.length === 0 ? (
          <div className="empty-state">Histórico vazio.</div>
        ) : (
          stack.slice().reverse().map((action, index) => (
            <div key={index} className="list-item" style={{ borderLeft: '4px solid var(--accent)'}}>
              <div className="item-info">
                <h4>{action}</h4>
                <p>{index === 0 ? "(Topo da Pilha)" : ""}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
