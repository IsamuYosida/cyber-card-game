import React from 'react';

const characteristicNames = {
  informationSecurity: 'Инф. безопасность',
  technologyInfrastructure: 'Технологии',
  financialStability: 'Финансы',
  innovationAbility: 'Инновации',
  reputation: 'Репутация'
};

export function Card({ card, type, onClick, isSelected }) {
  if (!card) return null;
  
  const getCardColor = () => {
    if (type === 'attack') return '#ff4757';
    if (type === 'defense') return '#2ed573';
    if (type === 'company') return '#3742fa';
    return '#dfe6e9';
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: '180px',
        minHeight: '200px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: isSelected ? '0 0 0 3px gold, 0 4px 8px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
        padding: '12px',
        margin: '8px',
        cursor: onClick ? 'pointer' : 'default',
        borderTop: `8px solid ${getCardColor()}`,
        position: 'relative'
      }}
    >
      <h3 style={{ fontSize: '14px', margin: '0 0 8px 0', color: '#2c3e50' }}>{card.name}</h3>
      
      {type === 'attack' && (
        <>
          <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Урон: {card.damage}</div>
          <div style={{ fontSize: '11px', color: '#e74c3c', marginTop: '5px' }}>
            Цели: {card.characteristics?.map(c => characteristicNames[c] || c).join(', ') || 'Выбираемая'}
          </div>
        </>
      )}
      
      {type === 'defense' && (
        <>
          <div style={{ fontSize: '12px', color: '#27ae60' }}>Тип: {card.duration === 'permanent' ? 'Постоянная' : 'Одноразовая'}</div>
          <div style={{ fontSize: '11px', color: '#2980b9', marginTop: '5px' }}>
            Защищает: {characteristicNames[card.characteristic] || card.characteristic}
          </div>
        </>
      )}
      
      {type === 'company' && card.characteristics && (
        <div style={{ fontSize: '11px', marginTop: '8px' }}>
          {Object.entries(card.characteristics).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>{characteristicNames[key] || key}:</span>
              <span style={{ color: value === 'high' ? '#27ae60' : '#e74c3c', fontWeight: 'bold' }}>
                {value === 'high' ? '⬆️ Высокая' : '⬇️ Низкая'}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {card.description && (
        <p style={{ fontSize: '10px', color: '#95a5a6', marginTop: '8px', marginBottom: '0' }}>
          {card.description}
        </p>
      )}
    </div>
  );
}