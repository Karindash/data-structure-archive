/**
 * Application-wide constants
 */

export const TABS = {
  NOTES: 'catatan',
  SCENARIO: 'skenario',
  CONNECTIONS: 'sambung',
  JSON: 'json'
};

export const DEFAULT_ROLES = ['subjek', 'latar', 'objek'];

export const ROW_TYPES = {
  PARTICIPANT: 'part',
  CHANGE: 'chg',
  REQUIREMENT: 'req'
};

export const FIELD_CONFIGS = {
  [ROW_TYPES.PARTICIPANT]: [
    { key: 'entity', label: 'Entitas (mis. S, Mobil)', list: 'entity-list' },
    { key: 'role', label: 'Peran', list: 'role-list' },
    { key: 'state', label: 'Kondisi awal (kunci=nilai, ...)' }
  ],
  [ROW_TYPES.CHANGE]: [
    { key: 'entity', label: 'Entitas', list: 'entity-list' },
    { key: 'key', label: 'Atribut' },
    { key: 'from', label: 'Dari' },
    { key: 'to', label: 'Menjadi' }
  ],
  [ROW_TYPES.REQUIREMENT]: [
    { key: 'key', label: 'Atribut' },
    { key: 'val', label: 'Harus bernilai' }
  ]
};
