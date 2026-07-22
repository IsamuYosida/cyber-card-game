import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Hand } from './Hand';
import { Card } from './Card';
import { 
  initializeGameWithBots, 
  executeAttack, 
  useDefenseCard, 
  discardAndDraw, 
  checkDefense
} from '../game/gameLogic';
import { createHackerBot, createCompanyBot } from '../game/botLogic';

const characteristicNames = {
  informationSecurity: 'Инф. безопасность',
  technologyInfrastructure: 'Технологии',
  financialStability: 'Финансы',
  innovationAbility: 'Инновации',
  reputation: 'Репутация'
};

const deepCopyGameState = (state) => {
  if (!state) return null;
  
  const copiedCompanies = state.companies.map(company => {
    if (company.isHuman) {
      return { ...company, hand: [...(company.hand || [])] };
    } else {
      const bot = createCompanyBot(
        { 
          id: company.id, 
          name: company.name, 
          characteristics: { ...company.characteristics } 
        },
        company.difficulty || 'medium'
      );
      bot.health = company.health;
      bot.hand = [...(company.hand || [])];
      bot.permanentDefenses = [...(company.permanentDefenses || [])];
      bot.temporaryDefenses = [...(company.temporaryDefenses || [])];
      bot.isAlive = company.isAlive;
      return bot;
    }
  });
  
  const copiedHackers = state.hackers.map(hacker => {
    if (hacker.isHuman) {
      return { ...hacker, hand: [...(hacker.hand || [])] };
    } else {
      const bot = createHackerBot(
        hacker.id.replace('hacker_bot_', ''),
        hacker.name,
        hacker.difficulty || 'medium'
      );
      bot.health = hacker.health;
      bot.hand = [...(hacker.hand || [])];
      bot.isAlive = hacker.isAlive;
      return bot;
    }
  });
  
  return {
    ...state,
    companies: copiedCompanies,
    hackers: copiedHackers,
    attackDeck: [...(state.attackDeck || [])],
    defenseDeck: [...(state.defenseDeck || [])]
  };
};

export function GameBoard() {
  const [gameState, setGameState] = useState(null);
  const [selectedAttackCard, setSelectedAttackCard] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDefenseCard, setSelectedDefenseCard] = useState(null);
  const [message, setMessage] = useState('');
  const [gameLog, setGameLog] = useState([]);
  const [choosingCharacteristic, setChoosingCharacteristic] = useState(null);
  const [roleSelection, setRoleSelection] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const processingRef = useRef(false);
  const timeoutRef = useRef(null);

  const addLogMessage = useCallback((msg) => {
    setGameLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));
  }, []);

  const getCurrentPlayer = (state) => {
    if (!state) return null;
    const allPlayers = [...state.hackers, ...state.companies];
    return allPlayers[state.currentPlayerIndex];
  };

  const checkGameOver = useCallback((state) => {
    const newState = { ...state };
    if (newState.hackers.length === 0) {
      newState.gameOver = true;
      newState.winner = 'companies';
      addLogMessage('🏆 КОМПАНИИ ПОБЕДИЛИ! Все хакеры уничтожены.');
    } else if (newState.companies.length === 0) {
      newState.gameOver = true;
      newState.winner = 'hackers';
      addLogMessage('🏆 ХАКЕРЫ ПОБЕДИЛИ! Все компании уничтожены.');
    }
    return newState;
  }, [addLogMessage]);

  // Выполнение хода бота
  const executeBotTurn = useCallback(async (state) => {
    if (processingRef.current) return state;
    processingRef.current = true;
    setIsProcessing(true);
    
    await new Promise(resolve => {
      timeoutRef.current = setTimeout(resolve, 800);
    });
    
    let newState = deepCopyGameState(state);
    const currentPlayer = getCurrentPlayer(newState);
    
    if (!currentPlayer || currentPlayer.isHuman || newState.gameOver) {
      processingRef.current = false;
      setIsProcessing(false);
      return newState;
    }
    
    addLogMessage(`🤖 Ход: ${currentPlayer.name}`);
    
    try {
      if (currentPlayer.role === 'hacker') {
        const aliveCompanies = newState.companies.filter(c => c.isAlive !== false && c.health > 0);
        
        if (aliveCompanies.length > 0 && currentPlayer.chooseTarget) {
          const targetCompany = currentPlayer.chooseTarget(aliveCompanies);
          
          if (targetCompany && currentPlayer.chooseAttackCard) {
            const decision = currentPlayer.chooseAttackCard(targetCompany);
            
            if (decision) {
              if (decision.action === 'discard') {
                const cardIndex = currentPlayer.hand.findIndex(c => c.id === decision.card.id);
                if (cardIndex !== -1) {
                  const discarded = currentPlayer.hand[cardIndex];
                  currentPlayer.hand.splice(cardIndex, 1);
                  if (newState.attackDeck.length > 0) {
                    currentPlayer.hand.push(newState.attackDeck.shift());
                  }
                  addLogMessage(`🤖 ${currentPlayer.name} сбросил карту ${discarded.name}`);
                }
              } else {
                let selectedChar = null;
                
                if (decision.card.type === 'choose' && targetCompany.characteristics) {
                  for (const [char, value] of Object.entries(targetCompany.characteristics)) {
                    const hasDefense = checkDefense(targetCompany, char);
                    if (value === 'low' && !hasDefense) {
                      selectedChar = char;
                      break;
                    }
                  }
                  if (!selectedChar) {
                    selectedChar = Object.keys(targetCompany.characteristics)[0];
                  }
                }
                
                const result = executeAttack(newState, currentPlayer.id, targetCompany.id, decision.card, selectedChar);
                newState = result.gameState;
                
                if (result.success) {
                  addLogMessage(`🤖 ${currentPlayer.name} атакует ${targetCompany.name}: ${result.message} (урон: ${result.damage})`);
                } else {
                  addLogMessage(`🤖 ${currentPlayer.name} атакует ${targetCompany.name}: ${result.message}`);
                }
              }
            }
          }
        }
        
      } else if (currentPlayer.role === 'company') {
        const company = newState.companies.find(c => c.id === currentPlayer.id);
        if (company && company.temporaryDefenses && company.temporaryDefenses.length > 0) {
          const clearedCount = company.temporaryDefenses.length;
          const clearedNames = company.temporaryDefenses.map(d => d.name).join(', ');
          company.temporaryDefenses = [];
          addLogMessage(`🏢 ${company.name}: сняты временные защиты: ${clearedNames}`);
        }
        
        if (currentPlayer.chooseDefenseCard) {
          const defenseCard = currentPlayer.chooseDefenseCard();
          
          if (defenseCard) {
            if (defenseCard.action === 'discard') {
              const cardIndex = currentPlayer.hand.findIndex(c => c.id === defenseCard.card.id);
              if (cardIndex !== -1) {
                const discarded = currentPlayer.hand[cardIndex];
                currentPlayer.hand.splice(cardIndex, 1);
                if (newState.defenseDeck.length > 0) {
                  currentPlayer.hand.push(newState.defenseDeck.shift());
                }
                addLogMessage(`🏢 ${currentPlayer.name} сбросил карту ${discarded.name}`);
              }
            } else if (defenseCard) {
              const result = useDefenseCard(newState, currentPlayer.id, defenseCard);
              newState = result.gameState;
              if (result.success) {
                addLogMessage(`🏢 ${currentPlayer.name} активировал защиту: ${defenseCard.name}`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Bot turn error:', error);
      addLogMessage(`⚠️ Ошибка при ходе бота ${currentPlayer.name}`);
    }
    
    // Переход к следующему игроку
    const totalPlayers = newState.hackers.length + newState.companies.length;
    newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % totalPlayers;
    
    if (newState.currentPlayerIndex === 0) {
      newState.currentTurn++;
      addLogMessage(`--- РАУНД ${newState.currentTurn + 1} ---`);
    }
    
    newState = checkGameOver(newState);
    
    processingRef.current = false;
    setIsProcessing(false);
    return newState;
  }, [addLogMessage, checkGameOver]);

  useEffect(() => {
    if (!gameState || gameState.gameOver || isProcessing) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (currentPlayer && !currentPlayer.isHuman) {
      executeBotTurn(gameState).then(newState => {
        setGameState(newState);
      });
    }
  }, [gameState, isProcessing, executeBotTurn]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startNewGame = (role) => {
    const newGame = initializeGameWithBots(role, 4, 2);
    setGameState(newGame);
    setRoleSelection(role);
    setSelectedAttackCard(null);
    setSelectedCompany(null);
    setSelectedDefenseCard(null);
    setMessage(`Игра началась! Вы играете за ${role === 'hacker' ? 'Хакера' : 'Компанию'}`);
    addLogMessage(`Игра началась! Роль: ${role === 'hacker' ? 'Хакер' : 'Компания'}`);
    addLogMessage(`--- РАУНД 1 ---`);
  };

  const endTurn = () => {
    if (!gameState || gameState.gameOver || isProcessing) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (!currentPlayer || !currentPlayer.isHuman) {
      setMessage('Сейчас не ваш ход!');
      return;
    }
    
    const newState = deepCopyGameState(gameState);
    
    if (currentPlayer.role === 'company') {
      const company = newState.companies.find(c => c.id === currentPlayer.id);
      if (company && company.temporaryDefenses && company.temporaryDefenses.length > 0) {
        const clearedCount = company.temporaryDefenses.length;
        const clearedNames = company.temporaryDefenses.map(d => d.name).join(', ');
        company.temporaryDefenses = [];
        addLogMessage(`🏢 ${company.name}: сняты временные защиты: ${clearedNames}`);
      }
    }
    
    const totalPlayers = newState.hackers.length + newState.companies.length;
    newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % totalPlayers;
    
    if (newState.currentPlayerIndex === 0) {
      newState.currentTurn++;
      addLogMessage(`--- РАУНД ${newState.currentTurn + 1} ---`);
    }
    
    setGameState(newState);
    setSelectedAttackCard(null);
    setSelectedCompany(null);
    setSelectedDefenseCard(null);
    setMessage('Ход передан');
    addLogMessage('Ход передан следующему игроку');
  };

  const handleAttack = () => {
    if (!gameState || isProcessing) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (!currentPlayer || !currentPlayer.isHuman) {
      setMessage('Сейчас не ваш ход!');
      return;
    }
    
    if (!selectedAttackCard || !selectedCompany) {
      setMessage('Выберите карту атаки и компанию');
      return;
    }
    
    if (selectedAttackCard.type === 'choose') {
      setChoosingCharacteristic(selectedAttackCard);
      return;
    }
    
    let newState = deepCopyGameState(gameState);
    const result = executeAttack(newState, currentPlayer.id, selectedCompany.id, selectedAttackCard);
    newState = result.gameState;
    
    if (result.success) {
      addLogMessage(`⚔️ ${selectedAttackCard.name} -> ${selectedCompany.name}: ${result.message} (урон: ${result.damage})`);
    } else {
      addLogMessage(`❌ ${selectedAttackCard.name} -> ${selectedCompany.name}: ${result.message}`);
    }
    
    const afterAttackState = checkGameOver(newState);
    setGameState(afterAttackState);
    setMessage(result.message);
    setSelectedAttackCard(null);
    setSelectedCompany(null);
    setChoosingCharacteristic(null);
  };

  const handleAttackWithChar = (characteristic) => {
    if (!gameState || !choosingCharacteristic || !selectedCompany) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (!currentPlayer || !currentPlayer.isHuman) return;
    
    let newState = deepCopyGameState(gameState);
    const result = executeAttack(newState, currentPlayer.id, selectedCompany.id, choosingCharacteristic, characteristic);
    newState = result.gameState;
    
    if (result.success) {
      addLogMessage(`⚔️ ${choosingCharacteristic.name} (${characteristicNames[characteristic]}) -> ${selectedCompany.name}: ${result.message}`);
    } else {
      addLogMessage(`❌ ${choosingCharacteristic.name} -> ${selectedCompany.name}: ${result.message}`);
    }
    
    const afterAttackState = checkGameOver(newState);
    setGameState(afterAttackState);
    setMessage(result.message);
    setSelectedAttackCard(null);
    setSelectedCompany(null);
    setChoosingCharacteristic(null);
  };

  const handleUseDefense = () => {
    if (!gameState || isProcessing) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (!currentPlayer || !currentPlayer.isHuman) {
      setMessage('Сейчас не ваш ход!');
      return;
    }
    
    if (!selectedDefenseCard) {
      setMessage('Выберите карту защиты');
      return;
    }
    
    const company = gameState.companies.find(c => c.id === currentPlayer.id);
    if (!company) {
      setMessage('Компания не найдена');
      return;
    }
    
    let newState = deepCopyGameState(gameState);
    const result = useDefenseCard(newState, company.id, selectedDefenseCard);
    newState = result.gameState;
    
    if (result.success) {
      addLogMessage(`🛡️ ${selectedDefenseCard.name} активирована для ${company.name}`);
    }
    
    setGameState(checkGameOver(newState));
    setMessage(result.message);
    setSelectedDefenseCard(null);
  };

  const handleDiscardCard = (card) => {
    if (!gameState || isProcessing) return;
    
    const currentPlayer = getCurrentPlayer(gameState);
    if (!currentPlayer || !currentPlayer.isHuman) {
      setMessage('Сейчас не ваш ход!');
      return;
    }
    
    if (roleSelection === 'company') {
      const charValue = currentPlayer.characteristics?.[card.characteristic];
      if (charValue === 'high') {
        let newState = deepCopyGameState(gameState);
        const result = discardAndDraw(newState, 'company', currentPlayer.id, card.id);
        newState = result.gameState;
        setGameState(newState);
        addLogMessage(`🔄 Карта ${card.name} сброшена бесплатно (высокая характеристика)`);
        setMessage('Карта сброшена бесплатно');
        return;
      }
    }
    
    let newState = deepCopyGameState(gameState);
    const playerType = roleSelection === 'hacker' ? 'hacker' : 'company';
    const result = discardAndDraw(newState, playerType, currentPlayer.id, card.id);
    newState = result.gameState;
    
    if (result.success) {
      setGameState(newState);
      addLogMessage(`🔄 ${card.name} сброшена и заменена`);
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };

  // Экран выбора роли
  if (!roleSelection) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <h1 style={{ color: 'white', marginBottom: '40px', fontSize: '48px' }}>Cyber Conflict Game</h1>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => startNewGame('hacker')}
            style={{
              padding: '20px 40px',
              fontSize: '24px',
              backgroundColor: '#ff4757',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            🕵️ Играть за Хакера
            <div style={{ fontSize: '14px', marginTop: '10px' }}>Вы + 1 бот-хакер против 4 компаний</div>
          </button>
          
          <button
            onClick={() => startNewGame('company')}
            style={{
              padding: '20px 40px',
              fontSize: '24px',
              backgroundColor: '#2ed573',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            🏢 Играть за Компанию
            <div style={{ fontSize: '14px', marginTop: '10px' }}>Вы + 3 бота-компании против 2 хакеров</div>
          </button>
        </div>
        
        <div style={{
          marginTop: '50px',
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          padding: '20px',
          borderRadius: '12px',
          maxWidth: '500px'
        }}>
          <h3>Как играть:</h3>
          <p>• Выберите роль — остальные игроки будут ботами</p>
          <p>• Хакеры атакуют компании, используя уязвимости</p>
          <p>• Компании защищают слабые характеристики</p>
          <p>• При атаке на ВЫСОКУЮ характеристику хакер теряет 1 здоровье</p>
          <p>• При двойной атаке первая характеристика имеет приоритет</p>
          <p>• Компании могут бесплатно сбросить карты на ВЫСОКИЕ характеристики</p>
          <p>• Временные защиты действуют до следующего хода компании</p>
        </div>
      </div>
    );
  }

  if (gameState?.gameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Игра окончена!</h1>
        <h2 style={{ color: gameState.winner === 'hackers' ? '#ff4757' : '#2ed573' }}>
          {gameState.winner === 'hackers' ? '👾 Хакеры победили!' : '🏢 Компании победили!'}
        </h2>
        <button onClick={() => {
          setRoleSelection(null);
          setGameState(null);
          setGameLog([]);
          processingRef.current = false;
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }} style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}>
          Новая игра
        </button>
      </div>
    );
  }

  const currentPlayer = getCurrentPlayer(gameState);
  const isHumanTurn = currentPlayer?.isHuman && !isProcessing && !gameState?.gameOver;

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Верхняя панель */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#2c3e50',
        borderRadius: '12px',
        color: 'white'
      }}>
        <div>🔁 РАУНД {gameState.currentTurn + 1}</div>
        <div>
          👤 Текущий игрок: {currentPlayer?.name || 'Неизвестно'}
          {isProcessing && <span style={{ marginLeft: '10px', color: '#f39c12' }}>🤖 Ход бота...</span>}
          {isHumanTurn && <span style={{ marginLeft: '10px', color: '#2ed573' }}>⭐ ВАШ ХОД!</span>}
        </div>
        {isHumanTurn && (
          <button onClick={endTurn} style={{
            padding: '8px 16px',
            backgroundColor: '#f39c12',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            ⏭️ Завершить ход
          </button>
        )}
      </div>
      
      {/* Сообщение */}
      <div style={{
        backgroundColor: '#e8f4f8',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <strong>{message || (isHumanTurn ? '🎯 Ваш ход! Выберите действие' : (isProcessing ? '🤖 Ход бота...' : 'Ожидание...'))}</strong>
      </div>
      
      {/* Компании */}
      <div style={{ marginBottom: '30px' }}>
        <h2>🏢 КОМПАНИИ ({gameState.companies.length})</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {gameState.companies.map(company => (
            <div
              key={company.id}
              onClick={() => {
                if (isHumanTurn && roleSelection === 'hacker') {
                  setSelectedCompany(company);
                }
              }}
              style={{
                cursor: isHumanTurn && roleSelection === 'hacker' ? 'pointer' : 'default',
                border: selectedCompany?.id === company.id ? '3px solid gold' : '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: 'white',
                width: '280px'
              }}
            >
              <Card card={company} type="company" />
              <div style={{ marginTop: '8px', fontWeight: 'bold' }}>❤️ Здоровье: {company.health}</div>
              
              <div style={{ fontSize: '12px', marginTop: '8px', backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px' }}>
                <strong>🛡️ Защиты:</strong>
                {company.permanentDefenses?.length > 0 && (
                  <div><span style={{ color: '#27ae60' }}>Постоянные:</span> {company.permanentDefenses.map(d => d.name).join(', ')}</div>
                )}
                {company.temporaryDefenses?.length > 0 && (
                  <div><span style={{ color: '#f39c12' }}>Временные:</span> {company.temporaryDefenses.map(d => d.name).join(', ')}</div>
                )}
                {(!company.permanentDefenses?.length && !company.temporaryDefenses?.length) && (
                  <div style={{ color: '#999' }}>Нет активных защит</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Хакеры */}
      <div style={{ marginBottom: '30px' }}>
        <h2>👾 ХАКЕРЫ ({gameState.hackers.length})</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          {gameState.hackers.map(hacker => (
            <div key={hacker.id} style={{
              border: currentPlayer?.id === hacker.id ? '3px solid gold' : '1px solid #ddd',
              borderRadius: '8px',
              padding: '10px',
              backgroundColor: hacker.isHuman ? '#e8f8f5' : '#f5f5f5',
              width: '200px'
            }}>
              <div style={{ fontWeight: 'bold' }}>{hacker.name} {hacker.isHuman && '(Вы)'}</div>
              <div>❤️ Здоровье: {hacker.health}</div>
              <div>📚 Карт: {hacker.hand?.length || 0}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Рука текущего игрока */}
      {isHumanTurn && (
        <>
          {roleSelection === 'hacker' && (
            <Hand
              cards={currentPlayer.hand}
              type="attack"
              title="🗡️ ВАШИ КАРТЫ АТАК"
              onCardClick={(card) => setSelectedAttackCard(card)}
              selectedCardId={selectedAttackCard?.id}
              onDiscard={handleDiscardCard}
            />
          )}
          
          {roleSelection === 'company' && (
            <Hand
              cards={currentPlayer.hand}
              type="defense"
              title="🛡️ ВАШИ КАРТЫ ЗАЩИТЫ"
              onCardClick={(card) => setSelectedDefenseCard(card)}
              selectedCardId={selectedDefenseCard?.id}
              onDiscard={handleDiscardCard}
              playerCharacteristics={currentPlayer.characteristics}
            />
          )}
          
          {/* Панель действий */}
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '10px',
            zIndex: 100
          }}>
            {roleSelection === 'hacker' && (
              <button
                onClick={handleAttack}
                disabled={!selectedAttackCard || !selectedCompany}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  opacity: (!selectedAttackCard || !selectedCompany) ? 0.5 : 1
                }}
              >
                ⚔️ АТАКОВАТЬ
              </button>
            )}
            
            {roleSelection === 'company' && (
              <button
                onClick={handleUseDefense}
                disabled={!selectedDefenseCard}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  opacity: !selectedDefenseCard ? 0.5 : 1
                }}
              >
                🛡️ АКТИВИРОВАТЬ ЗАЩИТУ
              </button>
            )}
            
            <button
              onClick={() => {
                setSelectedAttackCard(null);
                setSelectedDefenseCard(null);
                setSelectedCompany(null);
                setMessage('Выбор очищен');
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              🗑️ Очистить
            </button>
          </div>
        </>
      )}
      
      {/* Индикатор хода бота */}
      {isProcessing && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p>🤖 <strong>{currentPlayer?.name}</strong> выполняет ход...</p>
          <div style={{ fontSize: '12px', color: '#666' }}>Пожалуйста, подождите</div>
        </div>
      )}
      
      {/* Лог игры */}
      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#1a1a2e',
        borderRadius: '8px',
        maxHeight: '200px',
        overflowY: 'auto',
        color: '#eee',
        fontFamily: 'monospace'
      }}>
        <h3 style={{ color: '#fff', marginBottom: '10px' }}>📜 ЛОГ ИГРЫ</h3>
        {gameLog.map((log, idx) => (
          <div key={idx} style={{ fontSize: '11px', marginBottom: '5px', fontFamily: 'monospace' }}>{log}</div>
        ))}
      </div>
      
      {/* Модальное окно для выбора характеристики */}
      {choosingCharacteristic && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          zIndex: 1000,
          minWidth: '250px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Выберите характеристику</h3>
          {Object.entries(characteristicNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => handleAttackWithChar(key)}
              style={{
                display: 'block',
                width: '100%',
                margin: '8px 0',
                padding: '10px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => setChoosingCharacteristic(null)}
            style={{
              display: 'block',
              width: '100%',
              margin: '8px 0',
              padding: '10px',
              backgroundColor: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  );
}