function getRandomColorClass() {
    const classes = ['clr1', 'clr2', 'clr3', 'clr4', 'clr5', 'clr6', 'clr7', 'clr8', 'clr9'];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
  }

  // Assign random color classes once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.area h3.alert-link');
    elements.forEach(function(element) {
      element.classList.add(getRandomColorClass());
    });
  });