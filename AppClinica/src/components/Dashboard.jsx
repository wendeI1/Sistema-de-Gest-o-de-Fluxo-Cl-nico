import React from 'react';
import { LineChart } from 'lucide-react';

export function Dashboard({ metrics }) {
  const isQueueHigh = metrics.queueSize >= 5;

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1' }}>
      <div className="panel-header">
        <h2 className="panel-title"><LineChart className="text-warning" /> Dashboard de Desempenho</h2>
      </div>

      <div className="dashboard-grid">
        <div className="metric-card">
          <div className="metric-label">Cadastros (Lista)</div>
          <div className="metric-value">{metrics.listSize}</div>
        </div>
        
        <div className={`metric-card ${isQueueHigh ? 'danger' : 'warning'}`}>
          <div className="metric-label">Fila de Triagem</div>
          <div className="metric-value">{metrics.queueSize}</div>
          {isQueueHigh && <div style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem' }}>Alerta: Fila Alta</div>}
        </div>
        
        <div className="metric-card" style={{ borderColor: 'var(--accent)' }}>
          <div className="metric-label">Profundidade da Pilha</div>
          <div className="metric-value">{metrics.stackDepth}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Tempo de Ordenação</div>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{metrics.sortTime} ms</div>
          <div className="metric-label">Algoritmo: {metrics.lastSortAlgo}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Tempo de Busca</div>
          <div className="metric-value" style={{ fontSize: '1.5rem' }}>{metrics.searchTime} ms</div>
          <div className="metric-label">{metrics.searchFound ? "Encontrado" : "Não buscado/falha"}</div>
        </div>
      </div>
    </div>
  );
}
