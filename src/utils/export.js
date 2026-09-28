import { csvCell, timestamp } from './helpers';

/**
 * Build CSV content from scenarios
 */
export const buildCsvContent = (scenarios) => {
  const headers = ['id', 'ringkasan', 'hasil', 'tag', 'pelaku', 'perubahan', 'syarat_awal'];
  
  const rows = scenarios.map((scenario) => {
    return [
      scenario.id,
      scenario.summary,
      scenario.outcome,
      (scenario.tags || []).join('; '),
      (scenario.participants || []).map((p) => 
        `${p.entity} (${p.role})${p.state ? ' [' + p.state + ']' : ''}`
      ).join('; '),
      (scenario.changes || []).map((c) => 
        `${c.entity ? c.entity + '.' : ''}${c.key}: ${c.from || '?'} > ${c.to}`
      ).join('; '),
      (scenario.requires || []).map((r) => 
        `${r.key} = ${r.val}`
      ).join('; ')
    ].map(csvCell).join(',');
  });

  return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
};

/**
 * Download CSV file
 */
export const downloadCsv = (scenarios) => {
  const content = buildCsvContent(scenarios);
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `skenario-${timestamp()}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Download JSON file
 */
export const downloadJson = (data) => {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `skenario-${timestamp()}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
