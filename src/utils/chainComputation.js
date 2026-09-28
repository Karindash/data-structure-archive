import { normalize } from './helpers';

/**
 * Compute chains between scenarios based on state changes and requirements
 */
export const computeChains = (scenarios) => {
  const chains = [];
  const seen = {};

  scenarios.forEach((scenarioA) => {
    scenarios.forEach((scenarioB) => {
      if (scenarioA.id === scenarioB.id) return;

      (scenarioB.requires || []).forEach((requirement) => {
        (scenarioA.changes || []).forEach((change) => {
          const keyMatch = normalize(change.key) === normalize(requirement.key);
          const valueMatch = normalize(change.to) === normalize(requirement.val);

          if (keyMatch && valueMatch) {
            const label = `${change.entity ? change.entity + '.' : ''}${change.key} = ${change.to}`;
            const key = `${scenarioA.id}>${scenarioB.id}>${label}`;

            if (!seen[key]) {
              seen[key] = true;
              chains.push({
                from: scenarioA,
                to: scenarioB,
                label: label
              });
            }
          }
        });
      });
    });
  });

  return chains;
};

/**
 * Count occurrences of items in array
 */
const countOccurrences = (list) => {
  const map = {};
  list.forEach((item) => {
    if (item) {
      map[item] = (map[item] || 0) + 1;
    }
  });
  return map;
};

/**
 * Compute pattern statistics from scenarios
 */
export const computePatterns = (scenarios) => {
  // Collect all tags
  const tagList = scenarios.flatMap((s) => s.tags || []);
  const tagCounts = countOccurrences(tagList);

  // Collect all roles
  const roleList = scenarios.flatMap((s) => 
    (s.participants || []).map((p) => normalize(p.role))
  );
  const roleCounts = countOccurrences(roleList);

  // Collect entity-role pairs
  const entityRoles = {};
  scenarios.forEach((scenario) => {
    (scenario.participants || []).forEach((participant) => {
      if (!participant.entity) return;
      const key = `${participant.entity} sebagai ${normalize(participant.role)}`;
      entityRoles[key] = (entityRoles[key] || 0) + 1;
    });
  });

  return {
    tags: tagCounts,
    roles: roleCounts,
    entityRoles: entityRoles
  };
};
