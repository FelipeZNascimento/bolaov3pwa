import { TRecordFilter } from 'sections/records/types';

const defaultFilter: TRecordFilter = {
  id: null,
  display: '',
  description: '',
  orderBy: '',
  limit: 0,
  needsLoggedUser: false,
  route: '',
  sortAsc: false,
  season: null,
  week: null,
  userId: null
};

const defaultButtons: TRecordFilter[] = [
  {
    id: 0,
    display: 'top 20',
    description: 'Melhores 20 semanas da história do Bolão',
    orderBy: 'percentage',
    limit: 20,
    needsLoggedUser: false,
    route: 'top',
    sortAsc: false,
    season: null,
    week: null,
    userId: null
  },
  {
    id: 1,
    display: 'bottom 20',
    description: 'Piores 20 semanas da história do Bolão',
    orderBy: 'percentage',
    limit: 20,
    needsLoggedUser: false,
    route: 'bottom',
    sortAsc: true,
    season: null,
    week: null,
    userId: null
  },
  {
    id: 2,
    accumulated: true,
    display: 'checkpoints',
    description: 'Semana a semana com pontuação acumulada',
    orderBy: 'points',
    limit: 20,
    needsLoggedUser: false,
    route: 'checkpoints',
    sortAsc: false,
    season: null,
    week: 1,
    userId: null,
    weekSelector: true
  },
  {
    id: 3,
    display: 'meu top 20',
    description: 'Minhas melhores 20 semanas',
    orderBy: 'percentage',
    limit: 20,
    needsLoggedUser: true,
    route: 'topmine',
    sortAsc: false,
    season: null,
    week: null,
    userId: null
  },
  {
    id: 4,
    display: 'meu bottom 20',
    description: 'Minhas piores 20 semanas',
    orderBy: 'percentage',
    limit: 20,
    needsLoggedUser: true,
    route: 'bottommine',
    sortAsc: true,
    season: null,
    week: null,
    userId: null
  },
  {
    id: 2,
    accumulated: true,
    display: 'meus checkpoints',
    description: 'Semana a semana com pontuação acumulada',
    orderBy: 'points',
    limit: 20,
    needsLoggedUser: true,
    route: 'checkpointsmine',
    sortAsc: false,
    season: null,
    week: 1,
    userId: null,
    weekSelector: true
  }
];

export { defaultButtons, defaultFilter };
