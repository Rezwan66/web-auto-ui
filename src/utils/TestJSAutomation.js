export function fillAndSubmitForm() {
  // Check if we're already on the form page
  if (window.location.pathname !== '/form') {
    console.log('Navigating to /form page...');
    window.location.href = '/form';

    // Wait for navigation to complete (we'll check every 100ms)
    const checkNavigation = setInterval(() => {
      if (window.location.pathname === '/form') {
        clearInterval(checkNavigation);
        executeFormFill();
      }
    }, 100);
  } else {
    executeFormFill();
  }

  function executeFormFill() {
    // Small delay to ensure DOM is ready (adjust as needed)
    setTimeout(() => {
      try {
        document.querySelector('[name="title"]').value = 'Sydney Sweeney';
        document.querySelector('[name="details"]').value = 'Bazonka donks!!!';
        document.querySelector('#postStoryButton').click();
        console.log('Form filled and submitted.');
      } catch (error) {
        console.error('Error filling form:', error);
      }
    }, 200); // 200ms delay after navigation
  }
}
