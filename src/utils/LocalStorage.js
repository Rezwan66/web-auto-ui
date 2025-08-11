export function loadIteration(useCase) {
  const key = `iteration_${useCase}`;
  const val = window.localStorage.getItem(key);
  return val ? parseInt(val, 10) : 1;
}

export function saveIteration(useCase, iteration) {
  const key = `iteration_${useCase}`;
  window.localStorage.setItem(key, iteration.toString());
}
