import { characteristicKeys } from './characteristics';

// 18 различных профилей компаний
const companyTemplates = [
  { informationSecurity: 'low', technologyInfrastructure: 'low', financialStability: 'low', innovationAbility: 'high', reputation: 'high' },
  { informationSecurity: 'low', technologyInfrastructure: 'low', financialStability: 'high', innovationAbility: 'low', reputation: 'high' },
  { informationSecurity: 'low', technologyInfrastructure: 'low', financialStability: 'high', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'low', technologyInfrastructure: 'high', financialStability: 'low', innovationAbility: 'low', reputation: 'high' },
  { informationSecurity: 'low', technologyInfrastructure: 'high', financialStability: 'low', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'low', technologyInfrastructure: 'high', financialStability: 'high', innovationAbility: 'low', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'low', financialStability: 'low', innovationAbility: 'low', reputation: 'high' },
  { informationSecurity: 'high', technologyInfrastructure: 'low', financialStability: 'low', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'low', financialStability: 'high', innovationAbility: 'low', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'high', financialStability: 'low', innovationAbility: 'low', reputation: 'low' },
  { informationSecurity: 'low', technologyInfrastructure: 'low', financialStability: 'low', innovationAbility: 'low', reputation: 'high' },
  { informationSecurity: 'low', technologyInfrastructure: 'low', financialStability: 'low', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'low', technologyInfrastructure: 'high', financialStability: 'high', innovationAbility: 'low', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'low', financialStability: 'high', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'high', financialStability: 'low', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'low', technologyInfrastructure: 'high', financialStability: 'high', innovationAbility: 'high', reputation: 'low' },
  { informationSecurity: 'high', technologyInfrastructure: 'low', financialStability: 'high', innovationAbility: 'low', reputation: 'high' },
  { informationSecurity: 'high', technologyInfrastructure: 'high', financialStability: 'low', innovationAbility: 'low', reputation: 'high' }
];

const companyNames = [
  'ТехноГлобал', 'АльфаТех', 'БезопасныйМир', 'ИнновацияЛаб',
  'ФинансГрупп', 'КиберСекьюрити', 'ДиджиталСити', 'НекстДжен',
  'КлаудТех', 'ДатаХаб', 'СофтСолюшнс', 'НетворкПро',
  'СмартСистемс', 'АйТиЭксперт', 'ТехноПарк', 'БизнесСофт',
  'ВиртуалКорп', 'КиберДайнемикс'
];

export function generateCompanies(count) {
  const shuffled = [...companyTemplates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count).map((profile, index) => ({
    id: `company_${index + 1}`,
    name: companyNames[index % companyNames.length] + ` ${index + 1}`,
    characteristics: { ...profile }
  }));
}