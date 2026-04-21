import React from 'react';
import { UserCheck, Stethoscope, ArrowRightToLine } from 'lucide-react';

export function TriageQueue({ queue, allPatients, onEnqueue, onDequeue }) {
  
  return (
    <div className="glass-panel">
      <div className="panel-header">
        <h2 className="panel-title"><UserCheck className="text-secondary" /> Fila de Espera (FIFO)</h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className="btn btn-secondary" 
          onClick={onEnqueue}
          disabled={allPatients.length === 0}
          title={allPatients.length === 0 ? "Cadastre um paciente primeiro" : ""}
        >
          <ArrowRightToLine size={18} /> Entrar na Fila
        </button>
        <button 
          className="btn btn-accent" 
          onClick={onDequeue}
          disabled={queue.length === 0}
        >
          <Stethoscope size={18} /> Iniciar Atendimento
        </button>
      </div>

      <div className="list-container" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {queue.length === 0 ? (
          <div className="empty-state">Nenhum paciente na fila de espera.</div>
        ) : (
          queue.map((p, index) => (
            <div key={p.id + index} className="list-item" style={{ borderLeft: '4px solid var(--secondary)'}}>
              <div className="item-info">
                <h4>{p.name}</h4>
                <p><strong>Posição:</strong> {index + 1}º</p>
              </div>
              <span className="item-tag">ID: {p.id}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
