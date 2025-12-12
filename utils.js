(function(root) {
  const Utils = {};

  Utils.formatDate = function(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  Utils.formatTime = function(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  Utils.getCategoryIcon = function(category) {
    const icons = {
      'Cultural': 'fas fa-music',
      'Technical': 'fas fa-laptop-code',
      'Sports': 'fas fa-running',
      'Academic': 'fas fa-book'
    };
    return icons[category] || 'fas fa-calendar';
  };

  Utils.getCategoryColor = function(category) {
    const colors = {
      'Technical': '#3B82F6',
      'Cultural': '#14B8A6',
      'Sports': '#F97316',
      'Academic': '#10B981'
    };
    return colors[category] || '#3B82F6';
  };

  Utils.getOrdinal = function(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  Utils.updateEventStatus = function(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(event.deadline);
    deadline.setHours(0, 0, 0, 0);

    return deadline >= today ? 'Open' : 'Closed';
  };

  // Export for Node.js or expose to global for browser
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
  } else {
    // In browser, we can either expose Utils object, or individual functions to keep compatibility
    // with existing code that calls formatDate() directly.
    // Let's expose individual functions to global scope to minimize changes in app.js
    root.formatDate = Utils.formatDate;
    root.formatTime = Utils.formatTime;
    root.getCategoryIcon = Utils.getCategoryIcon;
    root.getCategoryColor = Utils.getCategoryColor;
    root.getOrdinal = Utils.getOrdinal;
    root.updateEventStatus = Utils.updateEventStatus;

    // Also expose Utils namespace if needed later
    root.Utils = Utils;
  }
})(typeof window !== 'undefined' ? window : this);
