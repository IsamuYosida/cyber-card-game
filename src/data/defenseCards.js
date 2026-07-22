// Временные карты защиты (25 штук - действие на 1 ход)
const temporaryCards = [
  { id: 'd1', name: 'Антивирусное обновление', type: 'defense', characteristic: 'informationSecurity', duration: 'temporary', description: 'Защита от фишинга' },
  { id: 'd2', name: 'Бэкап системы', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'temporary', description: 'Резервное копирование' },
  { id: 'd3', name: 'Срочный кредит', type: 'defense', characteristic: 'financialStability', duration: 'temporary', description: 'Временная финансовая подушка' },
  { id: 'd4', name: 'Хакатон инноваций', type: 'defense', characteristic: 'innovationAbility', duration: 'temporary', description: 'Быстрый поиск решений' },
  { id: 'd5', name: 'Пиар-кампания', type: 'defense', characteristic: 'reputation', duration: 'temporary', description: 'Восстановление репутации' },
  { id: 'd6', name: 'SIEM система', type: 'defense', characteristic: 'informationSecurity', duration: 'temporary', description: 'Мониторинг событий' },
  { id: 'd7', name: 'Резервный сервер', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'temporary', description: 'Запасной сервер' },
  { id: 'd8', name: 'Инвестиции', type: 'defense', characteristic: 'financialStability', duration: 'temporary', description: 'Привлечение средств' },
  { id: 'd9', name: 'Экспертный совет', type: 'defense', characteristic: 'innovationAbility', duration: 'temporary', description: 'Консультация экспертов' },
  { id: 'd10', name: 'Публичное извинение', type: 'defense', characteristic: 'reputation', duration: 'temporary', description: 'Меры по восстановлению' },
  { id: 'd11', name: 'Шифрование данных', type: 'defense', characteristic: 'informationSecurity', duration: 'temporary', description: 'Защита информации' },
  { id: 'd12', name: 'Load Balancer', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'temporary', description: 'Распределение нагрузки' },
  { id: 'd13', name: 'Финансовый резерв', type: 'defense', characteristic: 'financialStability', duration: 'temporary', description: 'Неприкосновенный запас' },
  { id: 'd14', name: 'Краудсорсинг', type: 'defense', characteristic: 'innovationAbility', duration: 'temporary', description: 'Мозговой штурм' },
  { id: 'd15', name: 'PR-команда', type: 'defense', characteristic: 'reputation', duration: 'temporary', description: 'Управление репутацией' },
  { id: 'd16', name: 'Брандмауэр', type: 'defense', characteristic: 'informationSecurity', duration: 'temporary', description: 'Защита сети' },
  { id: 'd17', name: 'Кэширование', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'temporary', description: 'Ускорение работы' },
  { id: 'd18', name: 'Страховка', type: 'defense', characteristic: 'financialStability', duration: 'temporary', description: 'Страховое покрытие' },
  { id: 'd19', name: 'Стартап-студия', type: 'defense', characteristic: 'innovationAbility', duration: 'temporary', description: 'Генерация идей' },
  { id: 'd20', name: 'Кризис-менеджер', type: 'defense', characteristic: 'reputation', duration: 'temporary', description: 'Управление кризисом' },
  { id: 'd21', name: '2FA система', type: 'defense', characteristic: 'informationSecurity', duration: 'temporary', description: 'Двухфакторная аутентификация' },
  { id: 'd22', name: 'CDN сеть', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'temporary', description: 'Ускорение доставки' },
  { id: 'd23', name: 'Ликвидность', type: 'defense', characteristic: 'financialStability', duration: 'temporary', description: 'Быстрая конвертация' },
  { id: 'd24', name: 'Патентование', type: 'defense', characteristic: 'innovationAbility', duration: 'temporary', description: 'Защита ИС' },
  { id: 'd25', name: 'Социальная реклама', type: 'defense', characteristic: 'reputation', duration: 'temporary', description: 'Улучшение имиджа' }
];

// Постоянные карты защиты (10 штук - действуют до атаки по защищаемой характеристике)
const permanentCards = [
  { id: 'p1', name: 'ISO 27001', type: 'defense', characteristic: 'informationSecurity', duration: 'permanent', description: 'Стандарт безопасности' },
  { id: 'p2', name: 'Облачная инфраструктура', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'permanent', description: 'Отказоустойчивость' },
  { id: 'p3', name: 'Аудит безопасности', type: 'defense', characteristic: 'financialStability', duration: 'permanent', description: 'Финансовый контроль' },
  { id: 'p4', name: 'НИОКР отдел', type: 'defense', characteristic: 'innovationAbility', duration: 'permanent', description: 'Постоянные исследования' },
  { id: 'p5', name: 'Совет директоров', type: 'defense', characteristic: 'reputation', duration: 'permanent', description: 'Надзор и контроль' },
  { id: 'p6', name: 'SOC центр', type: 'defense', characteristic: 'informationSecurity', duration: 'permanent', description: 'Круглосуточный мониторинг' },
  { id: 'p7', name: 'DRP план', type: 'defense', characteristic: 'technologyInfrastructure', duration: 'permanent', description: 'План восстановления' },
  { id: 'p8', name: 'Хедж-фонд', type: 'defense', characteristic: 'financialStability', duration: 'permanent', description: 'Страхование рисков' },
  { id: 'p9', name: 'R&D центр', type: 'defense', characteristic: 'innovationAbility', duration: 'permanent', description: 'Лаборатория разработки' },
  { id: 'p10', name: 'ESG программа', type: 'defense', characteristic: 'reputation', duration: 'permanent', description: 'Устойчивое развитие' }
];

export const defenseCards = {
  temporary: temporaryCards,
  permanent: permanentCards
};