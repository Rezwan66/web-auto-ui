// Helper to check if an element is inside an ignored container
function isIgnored(el) {
  return el.closest('[data-ignore-metadata="true"]');
}

// Extracts metadata from the current page
export default function extractPageMetadata() {
  const url = window.location.href;

  // Get all input, textarea, select fields NOT inside ignored containers
  const fields = Array.from(
    document.querySelectorAll('input, textarea, select')
  )
    .filter(el => !isIgnored(el))
    .map(el => ({
      tag: el.tagName.toLowerCase(),
      type: el.type || undefined,
      name: el.name || undefined,
      id: el.id || undefined,
      placeholder: el.placeholder || undefined,
      label: el.labels?.[0]?.innerText || undefined,
      selector: getUniqueSelector(el),
    }));

  // Get all buttons (including submit, add to cart, etc.) NOT inside ignored containers
  const buttons = Array.from(
    document.querySelectorAll('button, input[type="submit"]')
  )
    .filter(el => !isIgnored(el))
    .map(el => ({
      tag: el.tagName.toLowerCase(),
      type: el.type || undefined,
      text: el.innerText || el.value || undefined,
      id: el.id || undefined,
      name: el.name || undefined,
      selector: getUniqueSelector(el),
    }));

  return { url, fields, buttons };
}

// Helper to get a unique selector for an element
function getUniqueSelector(el) {
  if (el.id) return `#${el.id}`;
  if (el.name) return `${el.tagName.toLowerCase()}[name="${el.name}"]`;
  if (el.className)
    return `${el.tagName.toLowerCase()}.${el.className.split(' ').join('.')}`;
  return el.tagName.toLowerCase();
}
