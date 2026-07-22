export const attackCards = [
  // Одиночные атаки (5 штук)
  { id: 'a1', name: 'Фишинговая атака', type: 'single', characteristics: ['informationSecurity'], damage: 1, description: 'Атака на информационную безопасность' },
  { id: 'a2', name: 'DDoS-атака', type: 'single', characteristics: ['technologyInfrastructure'], damage: 1, description: 'Перегрузка серверов' },
  { id: 'a3', name: 'Финансовое мошенничество', type: 'single', characteristics: ['financialStability'], damage: 1, description: 'Атака на финансовую стабильность' },
  { id: 'a4', name: 'Промышленный шпионаж', type: 'single', characteristics: ['innovationAbility'], damage: 1, description: 'Кража инноваций' },
  { id: 'a5', name: 'Чёрный пиар', type: 'single', characteristics: ['reputation'], damage: 1, description: 'Атака на репутацию' },
  
  // Двойные атаки (20 штук)
  { id: 'a6', name: 'Компрометация данных', type: 'double', characteristics: ['informationSecurity', 'reputation'], damage: 2, description: 'Утечка данных и потеря репутации' },
  { id: 'a7', name: 'Кибервымогательство', type: 'double', characteristics: ['informationSecurity', 'financialStability'], damage: 2, description: 'Блокировка данных за выкуп' },
  { id: 'a8', name: 'Атака на инфраструктуру', type: 'double', characteristics: ['technologyInfrastructure', 'informationSecurity'], damage: 2, description: 'Компрометация оборудования' },
  { id: 'a9', name: 'Инсайдерская угроза', type: 'double', characteristics: ['informationSecurity', 'innovationAbility'], damage: 2, description: 'Утечка инноваций' },
  { id: 'a10', name: 'Мошенничество с отчётами', type: 'double', characteristics: ['financialStability', 'reputation'], damage: 2, description: 'Фальсификация отчётности' },
  { id: 'a11', name: 'Саботаж серверов', type: 'double', characteristics: ['technologyInfrastructure', 'financialStability'], damage: 2, description: 'Уничтожение оборудования' },
  { id: 'a12', name: 'Плагиат инноваций', type: 'double', characteristics: ['innovationAbility', 'reputation'], damage: 2, description: 'Кража идей и потеря репутации' },
  { id: 'a13', name: 'Взлом базы данных', type: 'double', characteristics: ['informationSecurity', 'technologyInfrastructure'], damage: 2, description: 'Полный взлом системы' },
  { id: 'a14', name: 'Финансовый кризис', type: 'double', characteristics: ['financialStability', 'innovationAbility'], damage: 2, description: 'Нет денег на инновации' },
  { id: 'a15', name: 'Скандал с руководством', type: 'double', characteristics: ['reputation', 'financialStability'], damage: 2, description: 'Потеря доверия инвесторов' },
  { id: 'a16', name: 'Уничтожение R&D', type: 'double', characteristics: ['innovationAbility', 'technologyInfrastructure'], damage: 2, description: 'Уничтожение лабораторий' },
  { id: 'a17', name: 'Атака цепочки поставок', type: 'double', characteristics: ['technologyInfrastructure', 'reputation'], damage: 2, description: 'Компрометация партнёров' },
  { id: 'a18', name: 'Кража бюджетов', type: 'double', characteristics: ['financialStability', 'informationSecurity'], damage: 2, description: 'Хищение средств' },
  { id: 'a19', name: 'Дискредитация бренда', type: 'double', characteristics: ['reputation', 'innovationAbility'], damage: 2, description: 'Подрыв доверия к продуктам' },
  { id: 'a20', name: 'Системный взлом', type: 'double', characteristics: ['informationSecurity', 'financialStability', 'technologyInfrastructure'], damage: 2, description: 'Полная компрометация' },
  { id: 'a21', name: 'Промышленный саботаж', type: 'double', characteristics: ['technologyInfrastructure', 'innovationAbility'], damage: 2, description: 'Уничтожение производства' },
  { id: 'a22', name: 'Кредитное мошенничество', type: 'double', characteristics: ['financialStability', 'reputation'], damage: 2, description: 'Подрыв кредитного рейтинга' },
  { id: 'a23', name: 'Утечка коммерческой тайны', type: 'double', characteristics: ['innovationAbility', 'informationSecurity'], damage: 2, description: 'Потеря ноу-хау' },
  { id: 'a24', name: 'Дестабилизация рынка', type: 'double', characteristics: ['reputation', 'financialStability'], damage: 2, description: 'Падение акций' },
  { id: 'a25', name: 'Коллапс IT-систем', type: 'double', characteristics: ['technologyInfrastructure', 'informationSecurity'], damage: 2, description: 'Полный отказ систем' },
  
  // Карта с выбором (1 штука)
  { id: 'a26', name: 'Точечная атака', type: 'choose', characteristics: [], damage: 1, description: 'Выберите характеристику для атаки' }
];