import React, { useState } from 'react';
import { Users, UserPlus, Search, ArrowDownAZ } from 'lucide-react';

export function PatientsList({ patients, onAddPatient, onSearch, onSort }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [searchId, setSearchId] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !age) return;
    
    onAddPatient({
      id: Math.floor(1000 + Math.random() * 9000).toString(), // Gerar ID aleatório 4 digitos
      name,
      age: parseInt(age, 10)
    });
    setName('');
    setAge('');
  };

  return (
    <div className="glass-panel">
      <div className="panel-header">
        <h2 className="panel-title"><Users className="text-primary" /> Cadastro Permanente (Lista Encadeada)</h2>
      </div>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input 
          className="input-control" 
          placeholder="Nome do Paciente" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          style={{ marginBottom: 0 }}
        />
        <input 
          className="input-control" 
          type="number" 
          placeholder="Idade" 
          value={age} 
          onChange={e => setAge(e.target.value)} 
          style={{ width: '100px', marginBottom: 0 }}
        />
        <button type="submit" className="btn btn-primary"><UserPlus size={18} /> Cadastrar</button>
      </form>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
          <input 
            className="input-control" 
            placeholder="Buscar por ID..." 
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            style={{ marginBottom: 0 }}
          />
          <button className="btn btn-secondary" onClick={() => onSearch(searchId)}><Search size={18} /></button>
        </div>
        <button className="btn" onClick={() => onSort('bubble')}><ArrowDownAZ size={18} /> Bubble Sort</button>
        <button className="btn" onClick={() => onSort('quick')}><ArrowDownAZ size={18} /> Quick Sort</button>
      </div>

      <div className="list-container" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '0.5rem' }}>
        {patients.length === 0 ? (
          <div className="empty-state">Lista vazia. Cadastre o primeiro paciente.</div>
        ) : (
          patients.map(p => (
            <div key={p.id} className="list-item">
              <div className="item-info">
                <h4>{p.name}</h4>
                <p>Idade: {p.age}</p>
              </div>
              <span className="item-tag">ID: {p.id}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
