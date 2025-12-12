// Application State (In-Memory Storage)
const appState = {
  currentUser: null,
  currentPage: 'home',
  previousPage: 'events',
  events: [],
  pastEvents: [],
  registrations: [],
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear()
};

// Load data from localStorage or JSON files
async function loadData() {
  try {
    // Try to load from localStorage first
    const savedRegistrations = localStorage.getItem('eventRegistrations');
    if (savedRegistrations) {
      appState.registrations = JSON.parse(savedRegistrations);
    }
    
    const savedEvents = localStorage.getItem('events');
    if (savedEvents) {
      appState.events = JSON.parse(savedEvents);
    } else {
      // If no saved events, initialize with default data
      initializeEvents();
    }
    
    const savedPastEvents = localStorage.getItem('pastEvents');
    if (savedPastEvents) {
      appState.pastEvents = JSON.parse(savedPastEvents);
    }
  } catch (error) {
    console.error('Error loading data:', error);
    initializeEvents();
  }
}

// Save registrations to localStorage
function saveRegistrations() {
  try {
    localStorage.setItem('eventRegistrations', JSON.stringify(appState.registrations));
  } catch (error) {
    console.error('Error saving registrations:', error);
  }
}

// Save events to localStorage
function saveEvents() {
  try {
    localStorage.setItem('events', JSON.stringify(appState.events));
  } catch (error) {
    console.error('Error saving events:', error);
  }
}

// Save past events (results) to localStorage
function savePastEvents() {
  try {
    localStorage.setItem('pastEvents', JSON.stringify(appState.pastEvents));
  } catch (error) {
    console.error('Error saving past events:', error);
  }
}

// Initialize Events Data
function initializeEvents() {
  appState.events = [
    {
      id: 1,
      name: "Annual Music Fest",
      category: "Cultural",
      date: "2025-11-15",
      time: "18:00",
      venue: "Main Auditorium",
      capacity: 500,
      registered: 342,
      status: "Open",
      description: "Join us for the biggest music festival of the year featuring live bands, solo performances, and DJ night",
      organizer: "Cultural Committee",
      deadline: "2025-11-10",
      requirements: "No prior experience needed. Open to all students."
    },
    {
      id: 2,
      name: "CodeStorm Hackathon",
      category: "Technical",
      date: "2025-11-20",
      time: "09:00",
      venue: "Computer Lab Block",
      capacity: 200,
      registered: 156,
      status: "Open",
      description: "24-hour coding marathon with exciting prizes and industry mentorship",
      organizer: "Tech Club",
      deadline: "2025-11-15",
      requirements: "Basic programming knowledge required. Team of 2-4 members."
    },
    {
      id: 3,
      name: "Inter-College Cricket Tournament",
      category: "Sports",
      date: "2025-11-25",
      time: "07:00",
      venue: "Sports Complex",
      capacity: 100,
      registered: 88,
      status: "Open",
      description: "Annual cricket championship featuring teams from 8 colleges",
      organizer: "Sports Department",
      deadline: "2025-11-18",
      requirements: "Team registration required. 11 players per team."
    },
    {
      id: 4,
      name: "National Quiz Competition",
      category: "Academic",
      date: "2025-11-18",
      time: "14:00",
      venue: "Seminar Hall A",
      capacity: 150,
      registered: 97,
      status: "Open",
      description: "Test your knowledge across science, history, current affairs, and general knowledge",
      organizer: "Academic Committee",
      deadline: "2025-11-16",
      requirements: "Individual or team participation (max 2 members)."
    },
    {
      id: 5,
      name: "Dance Competition - Rhythmica",
      category: "Cultural",
      date: "2025-12-05",
      time: "17:00",
      venue: "Main Auditorium",
      capacity: 300,
      registered: 211,
      status: "Open",
      description: "Showcase your dance talents in solo, duet, and group categories",
      organizer: "Cultural Committee",
      deadline: "2025-11-30",
      requirements: "Solo, duet, or group entries allowed. Maximum 8 minutes performance."
    },
    {
      id: 6,
      name: "AI & Machine Learning Workshop",
      category: "Technical",
      date: "2025-12-10",
      time: "10:00",
      venue: "Seminar Hall B",
      capacity: 80,
      registered: 80,
      status: "Closed",
      description: "Hands-on workshop on AI fundamentals and ML algorithms by industry experts",
      organizer: "Tech Club",
      deadline: "2025-12-05",
      requirements: "Laptop required. Python basics recommended."
    },
    {
      id: 7,
      name: "Football Championship",
      category: "Sports",
      date: "2025-12-15",
      time: "06:00",
      venue: "Football Ground",
      capacity: 120,
      registered: 64,
      status: "Open",
      description: "Annual football tournament with knockout rounds and finals",
      organizer: "Sports Department",
      deadline: "2025-12-10",
      requirements: "Team of 11 players with 5 substitutes."
    },
    {
      id: 8,
      name: "Debate Tournament",
      category: "Academic",
      date: "2025-12-08",
      time: "15:00",
      venue: "Conference Room",
      capacity: 60,
      registered: 48,
      status: "Open",
      description: "Parliamentary debate competition on contemporary issues",
      organizer: "Debating Society",
      deadline: "2025-12-05",
      requirements: "Team of 2 debaters. Prior debate experience preferred."
    },
    {
      id: 9,
      name: "Art Exhibition & Competition",
      category: "Cultural",
      date: "2025-12-20",
      time: "11:00",
      venue: "Art Gallery",
      capacity: 100,
      registered: 56,
      status: "Open",
      description: "Display and compete with your artworks - paintings, sculptures, digital art",
      organizer: "Fine Arts Club",
      deadline: "2025-12-15",
      requirements: "Submit up to 3 artworks. All mediums accepted."
    },
    {
      id: 10,
      name: "Tech Symposium 2025",
      category: "Technical",
      date: "2026-01-10",
      time: "09:00",
      venue: "Main Auditorium",
      capacity: 400,
      registered: 178,
      status: "Open",
      description: "Annual technical symposium with paper presentations, project demos, and guest lectures",
      organizer: "Tech Club",
      deadline: "2026-01-05",
      requirements: "Paper submission or project demo registration required."
    },
    {
      id: 11,
      name: "Athletics Meet",
      category: "Sports",
      date: "2026-01-20",
      time: "07:00",
      venue: "Athletics Track",
      capacity: 200,
      registered: 123,
      status: "Open",
      description: "Track and field events including 100m, 400m, relay, long jump, and more",
      organizer: "Sports Department",
      deadline: "2026-01-15",
      requirements: "Individual event registration. Medical certificate required."
    },
    {
      id: 12,
      name: "Science Seminar Series",
      category: "Academic",
      date: "2026-01-25",
      time: "14:00",
      venue: "Science Block Auditorium",
      capacity: 150,
      registered: 89,
      status: "Open",
      description: "Series of seminars by renowned scientists on cutting-edge research",
      organizer: "Science Association",
      deadline: "2026-01-20",
      requirements: "Open to all. No prerequisites."
    }
  ];

  // pastEvents will be loaded from localStorage or start empty
  // Only real posted results should appear here
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', async () => {
  // Check if we need to clear old sample data
  const appVersion = localStorage.getItem('appVersion');
  if (!appVersion || appVersion !== '2.0') {
    // Clear old sample pastEvents data
    const savedPastEvents = localStorage.getItem('pastEvents');
    if (savedPastEvents) {
      try {
        const pastEvents = JSON.parse(savedPastEvents);
        // Remove sample data (events with IDs 101-105)
        const filteredEvents = pastEvents.filter(e => e.id < 100 || e.id > 105);
        localStorage.setItem('pastEvents', JSON.stringify(filteredEvents));
      } catch (e) {
        console.error('Error filtering old data:', e);
      }
    }
    localStorage.setItem('appVersion', '2.0');
  }
  
  await loadData();
  
  // Restore user session from localStorage
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    appState.currentUser = JSON.parse(savedUser);
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('userMenu').style.display = 'flex';
    document.getElementById('userName').textContent = appState.currentUser.name;
  }
  
  updateAllEventStatuses(); // Auto-update event statuses based on deadlines
  setupEventListeners();
  setupQRCodePreview();
  updateStatistics();
  
  // Restore last page from localStorage
  const savedPage = localStorage.getItem('currentPage');
  if (savedPage && appState.currentUser) {
    if (savedPage === 'dashboard') {
      openDashboard();
    } else {
      navigateTo(savedPage);
    }
  } else {
    renderUpcomingEventsPreview();
  }

  // Initialize theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-color-scheme', savedTheme);
  updateThemeIcon(savedTheme);
});

// Event Listeners Setup
function setupEventListeners() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
    });
  });

  document.querySelectorAll('[data-page]').forEach(btn => {
    if (!btn.classList.contains('nav-link')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const page = btn.getAttribute('data-page');
        navigateTo(page);
      });
    }
  });

  // Mobile nav toggle
  document.getElementById('navToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('active');
  });

  // Login/Logout
  document.getElementById('loginBtn').addEventListener('click', openLoginModal);
  document.getElementById('logoutBtn').addEventListener('click', firebaseLogout);
  document.getElementById('dashboardBtn').addEventListener('click', openDashboard);

  // Modal Close Buttons
  document.getElementById('closeLoginModal').addEventListener('click', () => closeModal('loginModal'));
  document.getElementById('closeRegistrationModal').addEventListener('click', () => closeModal('registrationModal'));
  document.getElementById('closeCreateEventModal').addEventListener('click', () => closeModal('createEventModal'));
  document.getElementById('closePostResultsModal').addEventListener('click', () => closeModal('postResultsModal'));
  document.getElementById('closeEditProfileModal').addEventListener('click', () => closeModal('editProfileModal'));

  // Profile dropdown
  document.getElementById('profileIconBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleProfileDropdown();
  });
  document.getElementById('editProfileBtn').addEventListener('click', openEditProfileModal);

  // Forms
  document.getElementById('loginForm').addEventListener('submit', handleFirebaseLogin);
  document.getElementById('signupForm').addEventListener('submit', handleSignup);
  document.getElementById('eventRegistrationForm').addEventListener('submit', handleEventRegistration);
  document.getElementById('createEventForm').addEventListener('submit', handleCreateEvent);
  document.getElementById('postResultsForm').addEventListener('submit', handlePostResults);
  document.getElementById('editProfileForm').addEventListener('submit', handleEditProfile);
  
  // Signup user type change
  document.getElementById('signupUserType').addEventListener('change', toggleSignupStudentFields);

  // Filters
  document.getElementById('searchInput').addEventListener('input', filterEvents);
  document.getElementById('categoryFilter').addEventListener('change', filterEvents);
  document.getElementById('statusFilter').addEventListener('change', filterEvents);

  // Calendar
  document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
  document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));

  // Admin Tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabName = tab.getAttribute('data-tab');
      document.querySelectorAll('.admin-content').forEach(c => c.classList.remove('active'));
      document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`).classList.add('active');
      
      if (tabName === 'results') {
        renderAdminCompletedEvents();
      } else if (tabName === 'registrations') {
        renderAdminRegistrations();
      }
    });
  });

  // Admin Create Event
  document.getElementById('createEventBtn').addEventListener('click', () => {
    openModal('createEventModal');
  });

  // Theme Toggler
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
}

// Navigation
function navigateTo(page) {
  appState.currentPage = page;
  localStorage.setItem('currentPage', page);
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Show page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  if (page === 'home') {
    document.getElementById('homePage').classList.add('active');
    renderUpcomingEventsPreview();
  } else if (page === 'events') {
    document.getElementById('eventsPage').classList.add('active');
    renderEventsGrid();
  } else if (page === 'schedule') {
    document.getElementById('schedulePage').classList.add('active');
    renderCalendar();
  } else if (page === 'results') {
    document.getElementById('resultsPage').classList.add('active');
    renderResults();
  }

  // Close mobile menu
  document.getElementById('navMenu').classList.remove('active');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

function goBack() {
  // Navigate back to the previous page
  if (appState.previousPage === 'dashboard') {
    openDashboard();
  } else {
    navigateTo(appState.previousPage || 'events');
  }
}

function refreshCurrentPage() {
  // Add spinning animation to refresh icon
  const refreshButtons = document.querySelectorAll('.btn .fa-sync-alt');
  refreshButtons.forEach(btn => {
    btn.style.animation = 'spin 0.5s linear';
  });
  
  // Remove animation after completion
  setTimeout(() => {
    refreshButtons.forEach(btn => {
      btn.style.animation = '';
    });
  }, 500);
  
  // Refresh based on current page
  const currentPage = appState.currentPage;
  
  if (currentPage === 'events') {
    renderEvents();
    showToast('Events refreshed', 'success');
  } else if (currentPage === 'schedule') {
    renderCalendar();
    showToast('Schedule refreshed', 'success');
  } else if (currentPage === 'results') {
    renderResults();
    showToast('Results refreshed', 'success');
  } else if (currentPage === 'dashboard') {
    if (appState.currentUser?.type === 'admin') {
      renderAdminDashboard();
      showToast('Admin dashboard refreshed', 'success');
    } else {
      renderStudentDashboard();
      showToast('Dashboard refreshed', 'success');
    }
  } else {
    // For other pages, just reload the data
    loadData();
    showToast('Page refreshed', 'success');
  }
}

// Statistics
function updateStatistics() {
  const totalEvents = appState.events.length;
  const totalRegistrations = appState.events.reduce((sum, event) => sum + event.registered, 0);
  const activeEvents = appState.events.filter(e => e.status === 'Open').length;
  const completedEvents = appState.pastEvents.length;

  document.getElementById('totalEvents').textContent = totalEvents;
  document.getElementById('activeEvents').textContent = activeEvents;
  document.getElementById('completedEvents').textContent = completedEvents;

  // Admin stats
  if (document.getElementById('adminTotalEvents')) {
    document.getElementById('adminTotalEvents').textContent = totalEvents;
    document.getElementById('adminTotalRegistrations').textContent = totalRegistrations;
    document.getElementById('adminUpcomingEvents').textContent = `${activeEvents}/${totalEvents}`;
  }
}

// Render Events
function renderUpcomingEventsPreview() {
  const container = document.getElementById('upcomingEventsPreview');
  const upcomingEvents = appState.events.filter(e => e.status === 'Open').slice(0, 4);
  
  if (upcomingEvents.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary); padding: 2rem;">No events yet.</p>';
    return;
  }
  
  container.innerHTML = upcomingEvents.map(event => createEventCard(event)).join('');
  container.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = parseInt(card.getAttribute('data-event-id'));
      showEventDetails(eventId);
    });
  });
}

function renderEventsGrid() {
  const container = document.getElementById('eventsGrid');
  container.innerHTML = appState.events.map(event => createEventCard(event)).join('');
  
  // Add click listeners
  container.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = parseInt(card.getAttribute('data-event-id'));
      showEventDetails(eventId);
    });
  });
}

function createEventCard(event) {
  const categoryIcon = getCategoryIcon(event.category);
  
  return `
    <div class="event-card" data-event-id="${event.id}">
      <div class="event-image">
        <i class="${categoryIcon}"></i>
      </div>
      <div class="event-content">
        <span class="event-category category-${event.category.toLowerCase()}">${event.category}</span>
        <h3 class="event-title">${event.name}</h3>
        <div class="event-meta">
          <div class="event-meta-item">
            <i class="fas fa-calendar"></i>
            <span>${formatDate(event.date)}</span>
          </div>
          <div class="event-meta-item">
            <i class="fas fa-clock"></i>
            <span>${formatTime(event.time)}</span>
          </div>
          <div class="event-meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${event.venue}</span>
          </div>
        </div>
        <div class="event-footer">
          <span class="event-status ${event.status === 'Open' ? 'status-open' : 'status-closed'}">
            ${event.status === 'Open' ? '● Live' : '● Closed'}
          </span>
        </div>
      </div>
    </div>
  `;
}


// Event Details
function showEventDetails(eventId) {
  const event = appState.events.find(e => e.id === eventId);
  if (!event) return;
  
  // Store the previous page for back navigation
  appState.previousPage = appState.currentPage || 'events';
  
  const categoryIcon = getCategoryIcon(event.category);
  
  const detailsHTML = `
    <div class="event-details">
      <div class="event-banner">
        <i class="${categoryIcon}"></i>
      </div>
      
      <div class="event-details-header">
        <span class="event-category category-${event.category.toLowerCase()}">${event.category}</span>
        <h1 class="event-details-title">${event.name}</h1>
      </div>
      
      <div class="event-details-meta">
        <div class="meta-item">
          <i class="fas fa-calendar"></i>
          <div class="meta-content">
            <h4>Date</h4>
            <p>${formatDate(event.date)}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-clock"></i>
          <div class="meta-content">
            <h4>Time</h4>
            <p>${formatTime(event.time)}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-map-marker-alt"></i>
          <div class="meta-content">
            <h4>Venue</h4>
            <p>${event.venue}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-user-tie"></i>
          <div class="meta-content">
            <h4>Organizer</h4>
            <p>${event.organizer}</p>
          </div>
        </div>
        <div class="meta-item">
          <i class="fas fa-hourglass-end"></i>
          <div class="meta-content">
            <h4>Registration Deadline</h4>
            <p>${formatDate(event.deadline)}</p>
          </div>
        </div>
      </div>
      
      <div class="event-description">
        <h3>About This Event</h3>
        <p>${event.description}</p>
      </div>
      
      ${event.requirements ? `
        <div class="event-description">
          <h3>Requirements</h3>
          <p>${event.requirements}</p>
        </div>
      ` : ''}
      
      ${appState.currentUser?.type !== 'admin' ? `
        <div class="registration-section">
          <h3>Register for this Event</h3>
          
          ${(() => {
            // Check if user is already registered
            const userEmail = appState.currentUser?.email;
            const isRegistered = userEmail && appState.registrations.some(
              reg => reg.eventId === event.id && reg.email === userEmail
            );
            
            if (event.status === 'Closed') {
              return `
                <div style="text-align: center; padding: 2rem; background: var(--color-secondary); border-radius: var(--radius-base);">
                  <h4 style="color: var(--color-warning); margin-bottom: 0.5rem;">Registration Closed</h4>
                  <p style="color: var(--color-text-secondary);">Registration deadline has passed for this event.</p>
                </div>
              `;
            } else if (isRegistered) {
              return `
                <button class="btn btn--secondary btn--lg btn--full-width" disabled style="cursor: not-allowed; opacity: 0.7;">
                  <i class="fas fa-check-circle"></i> Already Registered
                </button>
              `;
            } else {
              return `
                <button class="btn btn--primary btn--lg btn--full-width" onclick="openRegistrationModal(${event.id})">
                  <i class="fas fa-check-circle"></i> Register Now
                </button>
              `;
            }
          })()}
        </div>
      ` : ''}
    </div>
  `;
  
  document.getElementById('eventDetailsContent').innerHTML = detailsHTML;
  document.getElementById('eventDetailsPage').classList.add('active');
  document.querySelectorAll('.page').forEach(p => {
    if (p.id !== 'eventDetailsPage') p.classList.remove('active');
  });
  window.scrollTo(0, 0);
}

// Filter Events
function filterEvents() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const status = document.getElementById('statusFilter').value;
  
  const filtered = appState.events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm);
    const matchesCategory = !category || event.category === category;
    
    // Check status based on event's status field
    let matchesStatus = true;
    if (status === 'Live') {
      // Live events are Open events
      matchesStatus = event.status === 'Open';
    } else if (status === 'Closed') {
      // Closed events
      matchesStatus = event.status === 'Closed';
    }
    // If status is empty ("All Events"), matchesStatus remains true
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const container = document.getElementById('eventsGrid');
  if (filtered.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary);">No events found matching your criteria.</p>';
  } else {
    container.innerHTML = filtered.map(event => createEventCard(event)).join('');
    container.querySelectorAll('.event-card').forEach(card => {
      card.addEventListener('click', () => {
        const eventId = parseInt(card.getAttribute('data-event-id'));
        showEventDetails(eventId);
      });
    });
  }
}

// Calendar
function renderCalendar() {
  const calendar = document.getElementById('calendar');
  const monthName = new Date(appState.currentYear, appState.currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  document.getElementById('currentMonth').textContent = monthName;
  
  const firstDay = new Date(appState.currentYear, appState.currentMonth, 1).getDay();
  const daysInMonth = new Date(appState.currentYear, appState.currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(appState.currentYear, appState.currentMonth, 0).getDate();
  
  let calendarHTML = '<div class="calendar-weekdays">';
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
    calendarHTML += `<div class="calendar-weekday">${day}</div>`;
  });
  calendarHTML += '</div><div class="calendar-days">';
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarHTML += `<div class="calendar-day other-month"><span class="calendar-day-number">${daysInPrevMonth - i}</span></div>`;
  }
  
  // Current month days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(appState.currentYear, appState.currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    const dayEvents = appState.events.filter(e => e.date === dateString);
    const isToday = date.toDateString() === today.toDateString();
    const hasEvents = dayEvents.length > 0;
    
    calendarHTML += `
      <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvents ? 'has-events' : ''}" data-date="${dateString}" ${hasEvents ? 'style="cursor: pointer;"' : ''}>
        <span class="calendar-day-number">${day}</span>
        ${hasEvents ? `<span class="event-count-badge">${dayEvents.length}</span>` : ''}
        <div class="calendar-day-events">
          ${dayEvents.map(e => `<span class="event-dot" style="background: ${getCategoryColor(e.category)};"></span>`).join('')}
        </div>
      </div>
    `;
  }
  
  // Next month days
  const totalCells = firstDay + daysInMonth;
  const remainingCells = 7 - (totalCells % 7);
  if (remainingCells < 7) {
    for (let i = 1; i <= remainingCells; i++) {
      calendarHTML += `<div class="calendar-day other-month"><span class="calendar-day-number">${i}</span></div>`;
    }
  }
  
  calendarHTML += '</div>';
  calendar.innerHTML = calendarHTML;
  
  // Add click listeners only for days with events
  calendar.querySelectorAll('.calendar-day.has-events').forEach(day => {
    day.addEventListener('click', () => {
      const date = day.getAttribute('data-date');
      if (date) {
        showDayEvents(date);
      }
    });
  });
}


function changeMonth(direction) {
  appState.currentMonth += direction;
  if (appState.currentMonth > 11) {
    appState.currentMonth = 0;
    appState.currentYear++;
  } else if (appState.currentMonth < 0) {
    appState.currentMonth = 11;
    appState.currentYear--;
  }
  renderCalendar();
}

function showDayEvents(date) {
  const dayEvents = appState.events.filter(e => e.date === date);
  if (dayEvents.length === 0) {
    return; // Don't do anything if no events
  }
  
  const container = document.getElementById('dateEventsContainer');
  const titleElement = document.getElementById('selectedDateTitle');
  const listElement = document.getElementById('dateEventsList');
  
  titleElement.textContent = `Events on ${formatDate(date)}`;
  listElement.innerHTML = dayEvents.map(event => createEventCard(event)).join('');
  
  // Add click listeners to event cards
  listElement.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', () => {
      const eventId = parseInt(card.getAttribute('data-event-id'));
      showEventDetails(eventId);
    });
  });
  
  container.style.display = 'block';
  
  // Scroll to the events list
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeDateEvents() {
  document.getElementById('dateEventsContainer').style.display = 'none';
}

function renderEventsList() {
  const container = document.getElementById('eventsList');
  const sortedEvents = [...appState.events].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  container.innerHTML = sortedEvents.map(event => `
    <div class="event-list-item" onclick="showEventDetails(${event.id})">
      <div class="event-list-info">
        <span class="event-category category-${event.category.toLowerCase()}">${event.category}</span>
        <h3>${event.name}</h3>
        <div class="event-list-meta">
          <span><i class="fas fa-calendar"></i> ${formatDate(event.date)}</span>
          <span><i class="fas fa-clock"></i> ${formatTime(event.time)}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${event.venue}</span>
        </div>
      </div>
      <div>
        <button class="btn btn--primary">View Details</button>
      </div>
    </div>
  `).join('');
}

// Results
function renderResults() {
  const container = document.getElementById('resultsGrid');
  
  if (appState.pastEvents.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem; color: var(--color-text-secondary);">
        <i class="fas fa-trophy" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
        <h3 style="margin-bottom: 0.5rem;">No Results Yet</h3>
        <p>Event results will appear here once they are published.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = appState.pastEvents.map(event => `
    <div class="result-card" onclick="showResultDetails(${event.id})">
      <span class="event-category category-${event.category.toLowerCase()}">${event.category}</span>
      <h3>${event.name}</h3>
      <p class="result-date">${formatDate(event.date)}</p>
      <button class="btn btn--primary btn--full-width">View Results</button>
    </div>
  `).join('');
}

function showResultDetails(eventId) {
  const event = appState.pastEvents.find(e => e.id === eventId);
  if (!event) return;
  
  // Store the previous page for back navigation
  appState.previousPage = appState.currentPage || 'results';
  
  const currentUserEmail = appState.currentUser?.email;
  
  // Check if current user is a winner
  const isFirstPlace = event.winners.first.email === currentUserEmail;
  const customPlacement = event.customPlacements?.find(p => p.email === currentUserEmail);
  const isWinner = isFirstPlace || customPlacement;
  
  // Check if user was registered for this event
  const wasRegistered = appState.registrations.some(r => 
    r.eventId === event.eventId && r.email === currentUserEmail
  );
  
  // Generate winner certificate button
  const getWinnerCertButton = () => {
    if (isFirstPlace && event.winners.first.certificate) {
      return `
        <button class="btn btn--primary btn--lg" onclick="downloadCertificateData('${event.winners.first.certificate}', '${event.name}_1st_Place_Certificate')">
          <i class="fas fa-medal" style="color: #FFD700;"></i> Download 1st Place Certificate
        </button>
      `;
    } else if (customPlacement && customPlacement.certificate) {
      return `
        <button class="btn btn--primary btn--lg" onclick="downloadCertificateData('${customPlacement.certificate}', '${event.name}_${getOrdinal(customPlacement.place)}_Place_Certificate')">
          <i class="fas fa-award"></i> Download ${getOrdinal(customPlacement.place)} Place Certificate
        </button>
      `;
    }
    return '';
  };
  
  // Generate participation certificate button
  const getParticipationCertButton = () => {
    if (wasRegistered && event.participationCertificate) {
      return `
        <button class="btn btn--secondary btn--lg" onclick="downloadCertificateData('${event.participationCertificate}', '${event.name}_Participation_Certificate')">
          <i class="fas fa-certificate"></i> Download Participation Certificate
        </button>
      `;
    }
    return '';
  };
  
  const detailsHTML = `
    <div class="result-details">
      <span class="event-category category-${event.category.toLowerCase()}">${event.category}</span>
      <h1 class="page-title">${event.name}</h1>
      <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">${formatDate(event.date)} • ${event.participants} Participants</p>
      
      <div class="winners-section">
        <h3><i class="fas fa-trophy"></i> Winners</h3>
        <div class="winner-item">
          <div class="winner-position">🥇</div>
          <div class="winner-info">
            <h4>1st Place</h4>
            <p>${event.winners.first.name}</p>
          </div>
        </div>
        ${event.customPlacements && event.customPlacements.length > 0 ? event.customPlacements.map(placement => {
          let icon = '🥈';
          if (placement.place === 2) icon = '🥈';
          else if (placement.place === 3) icon = '🥉';
          else icon = `<i class="fas fa-award" style="font-size: 1.5rem; color: var(--color-primary);"></i>`;
          
          return `
            <div class="winner-item">
              <div class="winner-position">${icon}</div>
              <div class="winner-info">
                <h4>${getOrdinal(placement.place)} Place</h4>
                <p>${placement.name}</p>
              </div>
            </div>
          `;
        }).join('') : ''}
      </div>
      
      <div class="event-description">
        <h3>Event Summary</h3>
        <p>${event.summary}</p>
      </div>
      
      ${currentUserEmail ? `
        <div style="margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem;">
          ${getWinnerCertButton()}
          ${getParticipationCertButton()}
          ${!isWinner && !wasRegistered ? `
            <p style="color: var(--color-text-secondary); text-align: center; padding: 1rem;">
              <i class="fas fa-info-circle"></i> You did not participate in this event
            </p>
          ` : ''}
        </div>
      ` : `
        <div style="margin-top: 2rem; padding: 1.5rem; background: var(--color-secondary); border-radius: var(--radius-base); text-align: center;">
          <i class="fas fa-lock" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p style="color: var(--color-text-secondary);">Please login to download certificates</p>
        </div>
      `}
    </div>
  `;
  
  document.getElementById('resultDetailsContent').innerHTML = detailsHTML;
  document.getElementById('resultDetailsPage').classList.add('active');
  document.querySelectorAll('.page').forEach(p => {
    if (p.id !== 'resultDetailsPage') p.classList.remove('active');
  });
  window.scrollTo(0, 0);
}

function downloadCertificateData(base64Data, filename) {
  if (!base64Data) {
    showToast('Certificate not available', 'error');
    return;
  }
  
  try {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = base64Data;
    
    // Determine file extension from base64 data
    const isPDF = base64Data.startsWith('data:application/pdf');
    const extension = isPDF ? 'pdf' : 'png';
    
    link.download = `${filename}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('Certificate downloaded successfully!', 'success');
  } catch (error) {
    console.error('Download error:', error);
    showToast('Failed to download certificate', 'error');
  }
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function openLoginModal() {
  openModal('loginModal');
}

// Custom Fields Management
let customFieldsCount = 0;

function addCustomField() {
  customFieldsCount++;
  const container = document.getElementById('customFieldsContainer');
  const fieldHTML = `
    <div class="custom-field-item" id="customField${customFieldsCount}" style="padding: 1rem; background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-base); margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <label class="form-label" style="margin: 0;"><i class="fas fa-question-circle"></i> Custom Field ${customFieldsCount}</label>
        <button type="button" class="btn btn--secondary btn--sm" onclick="removeCustomField(${customFieldsCount})" style="padding: 0.25rem 0.5rem; background: var(--color-red-500); color: white;">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div style="margin-bottom: 0.5rem;">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Question/Field Title</label>
        <input type="text" class="form-control custom-field-label" placeholder="e.g., What is your T-Shirt size?">
      </div>
      <div style="margin-bottom: 0.5rem;">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Field Type</label>
        <select class="form-control custom-field-type">
          <option value="text">Text Input</option>
          <option value="select">Multiple Choice (Dropdown)</option>
        </select>
      </div>
      <div class="custom-field-options" style="display: none;">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Options</label>
        <div class="options-container" style="margin-bottom: 0.5rem;"></div>
        <button type="button" class="btn btn--secondary btn--sm" onclick="addOption(${customFieldsCount})" style="width: 100%;">
          <i class="fas fa-plus"></i> Add Option
        </button>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', fieldHTML);
  
  // Add event listener for field type change
  const fieldElement = document.getElementById(`customField${customFieldsCount}`);
  const typeSelect = fieldElement.querySelector('.custom-field-type');
  const optionsDiv = fieldElement.querySelector('.custom-field-options');
  
  typeSelect.addEventListener('change', function() {
    if (this.value === 'select') {
      optionsDiv.style.display = 'block';
      // Add first two options by default
      const optionsContainer = fieldElement.querySelector('.options-container');
      if (optionsContainer.children.length === 0) {
        addOption(customFieldsCount);
        addOption(customFieldsCount);
      }
    } else {
      optionsDiv.style.display = 'none';
    }
  });
}

let optionCounters = {};

function addOption(fieldId) {
  if (!optionCounters[fieldId]) {
    optionCounters[fieldId] = 0;
  }
  optionCounters[fieldId]++;
  
  const fieldElement = document.getElementById(`customField${fieldId}`);
  const optionsContainer = fieldElement.querySelector('.options-container');
  const optionId = `option${fieldId}_${optionCounters[fieldId]}`;
  
  const optionHTML = `
    <div class="option-item" id="${optionId}" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;">
      <span style="color: var(--color-text-secondary); font-size: var(--font-size-sm); min-width: 60px;">Option ${optionCounters[fieldId]}</span>
      <input type="text" class="form-control option-value" placeholder="Enter option text" style="flex: 1;">
      <button type="button" class="btn btn--secondary btn--sm" onclick="removeOption('${optionId}')" style="padding: 0.25rem 0.5rem;">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
}

function removeOption(optionId) {
  const option = document.getElementById(optionId);
  if (option) {
    option.remove();
  }
}

function removeCustomField(fieldId) {
  const field = document.getElementById(`customField${fieldId}`);
  if (field) {
    field.remove();
  }
}

function getCustomFields() {
  const fields = [];
  const fieldElements = document.querySelectorAll('.custom-field-item');
  
  fieldElements.forEach(element => {
    const label = element.querySelector('.custom-field-label').value;
    const type = element.querySelector('.custom-field-type').value;
    
    if (label) {
      const field = { label, type };
      
      if (type === 'select') {
        const optionInputs = element.querySelectorAll('.option-value');
        field.options = Array.from(optionInputs)
          .map(input => input.value.trim())
          .filter(opt => opt);
      }
      
      fields.push(field);
    }
  });
  
  return fields;
}

function removeQRImage() {
  document.getElementById('eventQRCode').value = '';
  document.getElementById('qrPreview').style.display = 'none';
  document.getElementById('qrPreviewImage').src = '';
}

// Auto-update event status based on deadline
function updateEventStatus(event) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const deadline = new Date(event.deadline);
  deadline.setHours(0, 0, 0, 0);
  
  return deadline >= today ? 'Open' : 'Closed';
}

// Update all event statuses
function updateAllEventStatuses() {
  appState.events.forEach(event => {
    event.status = updateEventStatus(event);
  });
  saveEvents();
}

// QR Code Preview
function setupQRCodePreview() {
  const qrInput = document.getElementById('eventQRCode');
  if (qrInput) {
    qrInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const preview = document.getElementById('qrPreview');
          const previewImage = document.getElementById('qrPreviewImage');
          previewImage.src = event.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function openRegistrationModal(eventId) {
  if (!appState.currentUser) {
    showToast('Please login first to register for events', 'error');
    openModal('loginModal');
    return;
  }
  
  const event = appState.events.find(e => e.id === eventId);
  if (!event) return;
  
  document.getElementById('regEventId').value = eventId;
  
  // Display QR code if available
  const qrCodeContent = document.getElementById('qrCodeContent');
  const noQRMessage = document.getElementById('noQRMessage');
  const qrImage = document.getElementById('registrationQRCode');
  const transactionIdField = document.getElementById('transactionIdField');
  const transactionIdInput = document.getElementById('regTransactionId');
  
  if (event.qrCode) {
    qrImage.src = event.qrCode;
    qrCodeContent.style.display = 'block';
    noQRMessage.style.display = 'none';
    // Show and make transaction ID required
    transactionIdField.style.display = 'block';
    transactionIdInput.setAttribute('required', 'required');
  } else {
    qrCodeContent.style.display = 'none';
    noQRMessage.style.display = 'block';
    // Hide and remove required attribute from transaction ID
    transactionIdField.style.display = 'none';
    transactionIdInput.removeAttribute('required');
  }
  
  // Handle section field visibility based on event settings
  const sectionField = document.getElementById('regSectionField');
  const sectionInput = document.getElementById('regSection');
  
  if (event.requireSection) {
    sectionField.style.display = 'block';
    sectionInput.setAttribute('required', 'required');
  } else {
    sectionField.style.display = 'none';
    sectionInput.removeAttribute('required');
  }
  
  // Display custom fields
  const customFieldsContainer = document.getElementById('customFieldsRegistration');
  customFieldsContainer.innerHTML = '';
  
  if (event.customFields && event.customFields.length > 0) {
    event.customFields.forEach((field, index) => {
      let fieldHTML = `
        <div class="form-group">
          <label class="form-label">${field.label}</label>
      `;
      
      if (field.type === 'text') {
        fieldHTML += `<input type="text" class="form-control custom-reg-field" data-field-label="${field.label}">`;
      } else if (field.type === 'select') {
        fieldHTML += `
          <select class="form-control custom-reg-field" data-field-label="${field.label}">
            <option value="">Select ${field.label}</option>
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>
        `;
      }
      
      fieldHTML += `</div>`;
      customFieldsContainer.insertAdjacentHTML('beforeend', fieldHTML);
    });
  }
  
  // Pre-fill form with user data
  prefillRegistrationForm();
  
  openModal('registrationModal');
}

function downloadQRCode() {
  const qrImage = document.getElementById('registrationQRCode');
  const link = document.createElement('a');
  link.href = qrImage.src;
  link.download = 'payment-qr-code.png';
  link.click();
  showToast('QR Code downloaded!', 'success');
}

// Login
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const userType = document.getElementById('userType').value;
  
  appState.currentUser = {
    email: email,
    type: userType,
    name: email.split('@')[0]
  };
  
  // Save to localStorage
  localStorage.setItem('currentUser', JSON.stringify(appState.currentUser));
  
  // Update UI
  document.getElementById('loginBtn').style.display = 'none';
  document.getElementById('userMenu').style.display = 'flex';
  document.getElementById('userName').textContent = appState.currentUser.name;
  
  closeModal('loginModal');
  showToast(`Welcome, ${appState.currentUser.name}!`, 'success');
  
  // Reset form
  document.getElementById('loginForm').reset();
  
  // Redirect based on user type
  if (userType === 'admin') {
    openDashboard();
  } else {
    navigateTo('home');
  }
}

function logout() {
  appState.currentUser = null;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('currentPage');
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('userMenu').style.display = 'none';
  showToast('Logged out successfully', 'success');
  navigateTo('home');
}

function openDashboard() {
  if (!appState.currentUser) return;
  
  // Update current page to dashboard
  appState.currentPage = 'dashboard';
  localStorage.setItem('currentPage', 'dashboard');
  
  if (appState.currentUser.type === 'admin') {
    document.getElementById('adminDashboard').classList.add('active');
    document.querySelectorAll('.page').forEach(p => {
      if (p.id !== 'adminDashboard') p.classList.remove('active');
    });
    renderAdminDashboard();
  } else {
    document.getElementById('studentDashboard').classList.add('active');
    document.querySelectorAll('.page').forEach(p => {
      if (p.id !== 'studentDashboard') p.classList.remove('active');
    });
    renderStudentDashboard();
  }
  window.scrollTo(0, 0);
}

// Event Registration
function handleEventRegistration(e) {
  e.preventDefault();
  
  const eventId = parseInt(document.getElementById('regEventId').value);
  const event = appState.events.find(e => e.id === eventId);
  
  if (!event) return;
  
  const email = document.getElementById('regEmail').value;
  
  // Check if user already registered for this event
  const alreadyRegistered = appState.registrations.some(
    reg => reg.eventId === eventId && reg.email === email
  );
  
  if (alreadyRegistered) {
    showToast('You have already registered for this event!', 'error');
    closeModal('registrationModal');
    return;
  }
  
  const registration = {
    id: Date.now(),
    eventId: eventId,
    eventName: event.name,
    name: document.getElementById('regName').value,
    email: email,
    phone: document.getElementById('regPhone').value,
    rollNumber: document.getElementById('regRoll').value,
    department: document.getElementById('regDepartment').value,
    year: document.getElementById('regYear').value,
    date: new Date().toISOString()
  };
  
  // Add section if event requires it
  if (event.requireSection) {
    registration.section = document.getElementById('regSection').value;
  }
  
  // Add transaction ID if payment was required
  const transactionIdInput = document.getElementById('regTransactionId');
  if (event.qrCode && transactionIdInput.value) {
    registration.transactionId = transactionIdInput.value;
    registration.paymentStatus = 'Pending Verification';
  }
  
  // Collect custom field responses
  const customFieldResponses = {};
  document.querySelectorAll('.custom-reg-field').forEach(field => {
    const label = field.getAttribute('data-field-label');
    customFieldResponses[label] = field.value;
  });
  
  if (Object.keys(customFieldResponses).length > 0) {
    registration.customFieldResponses = customFieldResponses;
  }
  
  appState.registrations.push(registration);
  event.registered++;
  
  // Save to localStorage
  saveRegistrations();
  saveEvents();
  
  closeModal('registrationModal');
  showToast(`Registration successful! Registration ID: ${registration.id}`, 'success');
  
  // Reset form
  document.getElementById('eventRegistrationForm').reset();
  
  // Update views
  updateStatistics();
  if (appState.currentPage === 'events') {
    renderEventsGrid();
  }
  
  // Refresh event details page if it's currently showing this event
  const eventDetailsPage = document.getElementById('eventDetailsPage');
  if (eventDetailsPage.classList.contains('active')) {
    // Preserve the previous page before refreshing
    const savedPreviousPage = appState.previousPage;
    showEventDetails(eventId);
    appState.previousPage = savedPreviousPage;
  }
  
  // Refresh dashboard if user is on dashboard
  if (appState.currentPage === 'dashboard') {
    renderStudentDashboard();
  }
}

// Admin Functions
function renderAdminDashboard() {
  updateStatistics();
  renderAdminEventsList();
  renderAdminRegistrations();
}

function renderAdminEventsList() {
  const container = document.getElementById('adminEventsList');
  if (!container) return;
  
  if (appState.events.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 2rem;">No events created yet.</p>';
    return;
  }
  
  container.innerHTML = appState.events.map(event => `
    <div class="admin-event-item" style="cursor: pointer; display: flex; align-items: center; gap: 1rem;">
      <div class="admin-event-info" onclick="showAdminEventDetails(${event.id})" style="flex: 1;">
        <h4>${event.name}</h4>
        <div class="admin-event-meta">
          <span><i class="fas fa-calendar"></i> ${formatDate(event.date)}</span>
          <span><i class="fas fa-users"></i> ${event.registered} registered</span>
          <span class="event-status ${event.status === 'Open' ? 'status-open' : 'status-closed'}">${event.status}</span>
        </div>
      </div>
      <button class="btn btn--secondary btn--sm" onclick="event.stopPropagation(); downloadEventReport(${event.id})" style="background: var(--color-success); color: white; flex-shrink: 0;" title="Download Excel Report">
        <i class="fas fa-file-excel"></i> Excel
      </button>
      <button class="btn btn--secondary btn--sm" onclick="event.stopPropagation(); if(confirm('Delete this event?')) deleteEvent(${event.id})" style="background: var(--color-red-500); color: white; flex-shrink: 0;">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function handleCreateEvent(e) {
  e.preventDefault();
  
  const newEvent = {
    id: Date.now(),
    name: document.getElementById('eventName').value,
    category: document.getElementById('eventCategory').value,
    date: document.getElementById('eventDate').value,
    time: document.getElementById('eventTime').value,
    venue: document.getElementById('eventVenue').value,
    registered: 0,
    description: document.getElementById('eventDescription').value,
    organizer: document.getElementById('eventOrganizer').value,
    deadline: document.getElementById('eventDeadline').value,
    requirements: document.getElementById('eventRequirements').value,
    requireSection: document.getElementById('eventRequireSection').checked
  };
  
  // Auto-set status based on deadline
  newEvent.status = updateEventStatus(newEvent);
  
  // Handle QR Code upload
  const qrInput = document.getElementById('eventQRCode');
  if (qrInput.files && qrInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      newEvent.qrCode = event.target.result;
      
      // Get custom fields
      newEvent.customFields = getCustomFields();
      
      appState.events.push(newEvent);
      
      // Save to localStorage
      saveEvents();
      
      closeModal('createEventModal');
      showToast('Event created successfully!', 'success');
      
      // Reset form
      document.getElementById('createEventForm').reset();
      document.getElementById('customFieldsContainer').innerHTML = '';
      document.getElementById('qrPreview').style.display = 'none';
      customFieldsCount = 0;
      
      // Update views
      updateStatistics();
      renderAdminEventsList();
      
      // Also update the events page if it's currently active
      if (appState.currentPage === 'events') {
        renderEventsGrid();
      }
    };
    reader.readAsDataURL(qrInput.files[0]);
  } else {
    // No QR code, just save custom fields
    newEvent.customFields = getCustomFields();
    
    appState.events.push(newEvent);
    
    // Save to localStorage
    saveEvents();
    
    closeModal('createEventModal');
    showToast('Event created successfully!', 'success');
    
    // Reset form
    document.getElementById('createEventForm').reset();
    document.getElementById('customFieldsContainer').innerHTML = '';
    customFieldsCount = 0;
    
    // Update views
    updateStatistics();
    renderAdminEventsList();
    
    // Also update the events page if it's currently active
    if (appState.currentPage === 'events') {
      renderEventsGrid();
    }
  }
}

// Admin Event Details View
function showAdminEventDetails(eventId) {
  const event = appState.events.find(e => e.id === eventId);
  if (!event) return;
  
  const eventRegistrations = appState.registrations.filter(r => r.eventId === eventId);
  
  const detailsHTML = `
    <div class="admin-event-details">
      <button class="btn btn--secondary" onclick="renderAdminEventsList()">
        <i class="fas fa-arrow-left"></i> Back to Events
      </button>
      
      <h2 style="margin: 1.5rem 0;">${event.name}</h2>
      
      <div class="admin-detail-tabs">
        <button class="admin-detail-tab active" onclick="switchAdminTab('registrations', ${eventId})">
          <i class="fas fa-users"></i> Registered Members (${eventRegistrations.length})
        </button>
        <button class="admin-detail-tab" onclick="switchAdminTab('edit', ${eventId})">
          <i class="fas fa-edit"></i> Edit Event
        </button>
        <button class="admin-detail-tab" onclick="switchAdminTab('delete', ${eventId})">
          <i class="fas fa-trash"></i> Delete Event
        </button>
      </div>
      
      <div id="adminDetailContent"></div>
    </div>
  `;
  
  const container = document.getElementById('adminEventsList');
  container.innerHTML = detailsHTML;
  
  // Show registrations by default
  switchAdminTab('registrations', eventId);
}

function switchAdminTab(tab, eventId) {
  // Update active tab
  document.querySelectorAll('.admin-detail-tab').forEach(t => t.classList.remove('active'));
  event.target?.classList.add('active');
  
  const content = document.getElementById('adminDetailContent');
  const eventData = appState.events.find(e => e.id === eventId);
  
  if (tab === 'registrations') {
    showEventRegistrations(eventId, content);
  } else if (tab === 'edit') {
    showEditEventForm(eventId, content);
  } else if (tab === 'delete') {
    showDeleteEventConfirm(eventId, content);
  }
}

function showEventRegistrations(eventId, container) {
  const registrations = appState.registrations.filter(r => r.eventId === eventId);
  
  if (registrations.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary); padding: 2rem; text-align: center;">No registrations yet for this event.</p>';
    return;
  }
  
  container.innerHTML = `
    <div class="registrations-list">
      <h3>Registered Members</h3>
      ${registrations.map((reg, index) => `
        <div class="registration-item clickable" onclick="showRegistrationDetails(${reg.id})" style="cursor: pointer;">
          <div class="registration-number">#${index + 1}</div>
          <div class="registration-details">
            <h4>${reg.name}</h4>
            <div class="registration-meta">
              <span><i class="fas fa-envelope"></i> ${reg.email}</span>
              <span><i class="fas fa-phone"></i> ${reg.phone}</span>
              <span><i class="fas fa-id-card"></i> ${reg.rollNumber}</span>
              <span><i class="fas fa-building"></i> ${reg.department}</span>
              <span><i class="fas fa-graduation-cap"></i> ${reg.year} Year</span>
            </div>
            ${reg.transactionId ? `<p style="color: var(--color-primary); margin-top: 0.5rem;"><i class="fas fa-receipt"></i> Transaction ID: ${reg.transactionId}</p>` : ''}
            <p class="registration-date">Registered on ${formatDate(reg.date.split('T')[0])}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function showRegistrationDetails(registrationId) {
  const registration = appState.registrations.find(r => r.id === registrationId);
  if (!registration) return;
  
  const event = appState.events.find(e => e.id === registration.eventId);
  
  const detailsHTML = `
    <div class="registration-details-modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;" onclick="this.remove()">
      <div class="modal-content" style="max-width: 600px; max-height: 90vh; overflow-y: auto;" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h2><i class="fas fa-user-circle"></i> Registration Details</h2>
          <button class="modal-close" onclick="this.closest('.registration-details-modal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <div style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-base); margin-bottom: 1rem;">
            <h3 style="margin-bottom: 1rem; color: var(--color-primary);">Personal Information</h3>
            <div style="display: grid; gap: 1rem;">
              <div><strong>Name:</strong> ${registration.name}</div>
              <div><strong>Email:</strong> ${registration.email}</div>
              <div><strong>Phone:</strong> ${registration.phone}</div>
              <div><strong>Roll Number:</strong> ${registration.rollNumber}</div>
              <div><strong>Department:</strong> ${registration.department}</div>
              <div><strong>Year:</strong> ${registration.year}</div>
            </div>
          </div>
          
          <div style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-base); margin-bottom: 1rem;">
            <h3 style="margin-bottom: 1rem; color: var(--color-primary);">Event Information</h3>
            <div style="display: grid; gap: 1rem;">
              <div><strong>Event:</strong> ${registration.eventName}</div>
              <div><strong>Registration ID:</strong> ${registration.id}</div>
              <div><strong>Registration Date:</strong> ${formatDate(registration.date.split('T')[0])}</div>
              ${registration.transactionId ? `
                <div style="padding: 1rem; background: var(--color-bg-1); border-radius: var(--radius-base); border-left: 4px solid var(--color-primary);">
                  <strong>Transaction ID:</strong> ${registration.transactionId}<br>
                  <strong>Payment Status:</strong> <span style="color: var(--color-orange-500);">${registration.paymentStatus || 'Pending'}</span>
                </div>
              ` : ''}
            </div>
          </div>
          
          ${registration.customFieldResponses && Object.keys(registration.customFieldResponses).length > 0 ? `
            <div style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-base);">
              <h3 style="margin-bottom: 1rem; color: var(--color-primary);">Additional Information</h3>
              <div style="display: grid; gap: 1rem;">
                ${Object.entries(registration.customFieldResponses).map(([key, value]) => `
                  <div><strong>${key}:</strong> ${value}</div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', detailsHTML);
}

function removeEditQRImage() {
  const event = appState.events.find(e => e.id === parseInt(document.getElementById('editEventForm').getAttribute('data-event-id')));
  if (event) {
    delete event.qrCode;
    saveEvents();
  }
  // Refresh the form
  const container = document.getElementById('adminDetailContent');
  showEditEventForm(event.id, container);
  setupEditQRPreview();
}

function removeEditQRPreview() {
  document.getElementById('editEventQRCode').value = '';
  document.getElementById('editQrPreview').style.display = 'none';
  document.getElementById('editQrPreviewImage').src = '';
}

function setupEditQRPreview() {
  const qrInput = document.getElementById('editEventQRCode');
  if (qrInput) {
    qrInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          const preview = document.getElementById('editQrPreview');
          const previewImage = document.getElementById('editQrPreviewImage');
          previewImage.src = event.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function showEditEventForm(eventId, container) {
  const event = appState.events.find(e => e.id === eventId);
  
  container.innerHTML = `
    <div class="edit-event-form">
      <h3>Edit Event Details</h3>
      <form id="editEventForm" data-event-id="${eventId}" onsubmit="handleEditEvent(event, ${eventId})">
        <div class="form-group">
          <label class="form-label">Event Name *</label>
          <input type="text" id="editEventName" class="form-control" value="${event.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select id="editEventCategory" class="form-control" required>
            <option value="Cultural" ${event.category === 'Cultural' ? 'selected' : ''}>Cultural</option>
            <option value="Technical" ${event.category === 'Technical' ? 'selected' : ''}>Technical</option>
            <option value="Sports" ${event.category === 'Sports' ? 'selected' : ''}>Sports</option>
            <option value="Academic" ${event.category === 'Academic' ? 'selected' : ''}>Academic</option>
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date *</label>
            <input type="date" id="editEventDate" class="form-control" value="${event.date}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Time *</label>
            <input type="time" id="editEventTime" class="form-control" value="${event.time}" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Venue *</label>
          <input type="text" id="editEventVenue" class="form-control" value="${event.venue}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Description *</label>
          <textarea id="editEventDescription" class="form-control" rows="3" required>${event.description}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Organizer *</label>
          <input type="text" id="editEventOrganizer" class="form-control" value="${event.organizer}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Registration Deadline *</label>
          <input type="date" id="editEventDeadline" class="form-control" value="${event.deadline}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Requirements/Eligibility</label>
          <textarea id="editEventRequirements" class="form-control" rows="2">${event.requirements || ''}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Payment QR Code (Optional)</label>
          ${event.qrCode ? `
            <div style="margin-bottom: 1rem;">
              <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: 0.5rem;">Current QR Code:</p>
              <div style="position: relative; display: inline-block;">
                <img src="${event.qrCode}" style="max-width: 200px; border: 1px solid var(--color-card-border); border-radius: var(--radius-base);">
                <button type="button" class="btn btn--secondary btn--sm" onclick="removeEditQRImage()" style="position: absolute; top: 5px; right: 5px; padding: 0.25rem 0.5rem; background: var(--color-red-500); color: white; border-radius: 50%;">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          ` : ''}
          <input type="file" id="editEventQRCode" class="form-control" accept="image/*">
          <small style="color: var(--color-text-secondary); display: block; margin-top: 0.5rem;">Upload new QR code to replace existing one (if any)</small>
          <div id="editQrPreview" style="margin-top: 1rem; display: none; position: relative;">
            <img id="editQrPreviewImage" style="max-width: 200px; border: 1px solid var(--color-card-border); border-radius: var(--radius-base);">
            <button type="button" class="btn btn--secondary btn--sm" onclick="removeEditQRPreview()" style="position: absolute; top: 5px; right: 5px; padding: 0.25rem 0.5rem; background: var(--color-red-500); color: white; border-radius: 50%;">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Custom Registration Fields (Optional)</label>
          <div id="editCustomFieldsContainer"></div>
          <button type="button" class="btn btn--secondary" onclick="addEditCustomField()">
            <i class="fas fa-plus"></i> Add Custom Field
          </button>
        </div>
        <div style="padding: 1rem; background: var(--color-bg-1); border-radius: var(--radius-base); margin-bottom: 1rem;">
          <p style="margin: 0; color: var(--color-text-secondary); font-size: var(--font-size-sm);">
            <i class="fas fa-info-circle"></i> <strong>Status:</strong> Automatically set based on registration deadline. Event will be "Open" before deadline and "Closed" after.
          </p>
        </div>
        <button type="submit" class="btn btn--primary btn--lg">
          <i class="fas fa-save"></i> Save Changes
        </button>
      </form>
    </div>
  `;
  
  // Setup QR preview and load custom fields after form is rendered
  setTimeout(() => {
    setupEditQRPreview();
    loadEditCustomFields(event);
  }, 100);
}

let editCustomFieldsCount = 0;
let editOptionCounters = {};

function loadEditCustomFields(event) {
  const container = document.getElementById('editCustomFieldsContainer');
  if (!container || !event.customFields) return;
  
  container.innerHTML = '';
  editCustomFieldsCount = 0;
  editOptionCounters = {};
  
  event.customFields.forEach(field => {
    addEditCustomField(field);
  });
}

function addEditCustomField(fieldData = null) {
  editCustomFieldsCount++;
  const container = document.getElementById('editCustomFieldsContainer');
  const fieldHTML = `
    <div class="custom-field-item" id="editCustomField${editCustomFieldsCount}" style="padding: 1rem; background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-base); margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <label class="form-label" style="margin: 0;"><i class="fas fa-question-circle"></i> Custom Field ${editCustomFieldsCount}</label>
        <button type="button" class="btn btn--secondary btn--sm" onclick="removeEditCustomField(${editCustomFieldsCount})" style="padding: 0.25rem 0.5rem; background: var(--color-red-500); color: white;">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div style="margin-bottom: 0.5rem;">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Question/Field Title</label>
        <input type="text" class="form-control custom-field-label" placeholder="e.g., What is your T-Shirt size?" value="${fieldData ? fieldData.label : ''}">
      </div>
      <div style="margin-bottom: 0.5rem;">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Field Type</label>
        <select class="form-control custom-field-type">
          <option value="text" ${fieldData && fieldData.type === 'text' ? 'selected' : ''}>Text Input</option>
          <option value="select" ${fieldData && fieldData.type === 'select' ? 'selected' : ''}>Multiple Choice (Dropdown)</option>
        </select>
      </div>
      <div class="custom-field-options" style="display: ${fieldData && fieldData.type === 'select' ? 'block' : 'none'};">
        <label style="font-size: var(--font-size-sm); color: var(--color-text-secondary); display: block; margin-bottom: 0.25rem;">Options</label>
        <div class="options-container" style="margin-bottom: 0.5rem;"></div>
        <button type="button" class="btn btn--secondary btn--sm" onclick="addEditOption(${editCustomFieldsCount})" style="width: 100%;">
          <i class="fas fa-plus"></i> Add Option
        </button>
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', fieldHTML);
  
  const fieldElement = document.getElementById(`editCustomField${editCustomFieldsCount}`);
  const typeSelect = fieldElement.querySelector('.custom-field-type');
  const optionsDiv = fieldElement.querySelector('.custom-field-options');
  
  // Add event listener for field type change
  typeSelect.addEventListener('change', function() {
    if (this.value === 'select') {
      optionsDiv.style.display = 'block';
      const optionsContainer = fieldElement.querySelector('.options-container');
      if (optionsContainer.children.length === 0) {
        addEditOption(editCustomFieldsCount);
        addEditOption(editCustomFieldsCount);
      }
    } else {
      optionsDiv.style.display = 'none';
    }
  });
  
  // Load existing options if any
  if (fieldData && fieldData.options) {
    fieldData.options.forEach(option => {
      addEditOption(editCustomFieldsCount, option);
    });
  }
}

function addEditOption(fieldId, optionValue = '') {
  if (!editOptionCounters[fieldId]) {
    editOptionCounters[fieldId] = 0;
  }
  editOptionCounters[fieldId]++;
  
  const fieldElement = document.getElementById(`editCustomField${fieldId}`);
  const optionsContainer = fieldElement.querySelector('.options-container');
  const optionId = `editOption${fieldId}_${editOptionCounters[fieldId]}`;
  
  const optionHTML = `
    <div class="option-item" id="${optionId}" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;">
      <span style="color: var(--color-text-secondary); font-size: var(--font-size-sm); min-width: 60px;">Option ${editOptionCounters[fieldId]}</span>
      <input type="text" class="form-control option-value" placeholder="Enter option text" value="${optionValue}" style="flex: 1;">
      <button type="button" class="btn btn--secondary btn--sm" onclick="removeEditOption('${optionId}')" style="padding: 0.25rem 0.5rem;">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
}

function removeEditOption(optionId) {
  const option = document.getElementById(optionId);
  if (option) {
    option.remove();
  }
}

function removeEditCustomField(fieldId) {
  const field = document.getElementById(`editCustomField${fieldId}`);
  if (field) {
    field.remove();
  }
}

function getEditCustomFields() {
  const fields = [];
  const fieldElements = document.querySelectorAll('#editCustomFieldsContainer .custom-field-item');
  
  fieldElements.forEach(element => {
    const label = element.querySelector('.custom-field-label').value;
    const type = element.querySelector('.custom-field-type').value;
    
    if (label) {
      const field = { label, type };
      
      if (type === 'select') {
        const optionInputs = element.querySelectorAll('.option-value');
        field.options = Array.from(optionInputs)
          .map(input => input.value.trim())
          .filter(opt => opt);
      }
      
      fields.push(field);
    }
  });
  
  return fields;
}

function handleEditEvent(e, eventId) {
  e.preventDefault();
  
  const event = appState.events.find(ev => ev.id === eventId);
  if (!event) return;
  
  // Update event with new values
  event.name = document.getElementById('editEventName').value;
  event.category = document.getElementById('editEventCategory').value;
  event.date = document.getElementById('editEventDate').value;
  event.time = document.getElementById('editEventTime').value;
  event.venue = document.getElementById('editEventVenue').value;
  event.description = document.getElementById('editEventDescription').value;
  event.organizer = document.getElementById('editEventOrganizer').value;
  event.deadline = document.getElementById('editEventDeadline').value;
  event.requirements = document.getElementById('editEventRequirements').value;
  
  // Update status based on deadline
  event.status = updateEventStatus(event);
  
  // Update custom fields
  event.customFields = getEditCustomFields();
  
  // Handle QR Code upload
  const qrInput = document.getElementById('editEventQRCode');
  if (qrInput.files && qrInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(readerEvent) {
      event.qrCode = readerEvent.target.result;
      
      // Save to localStorage
      saveEvents();
      
      showToast('Event updated successfully!', 'success');
      updateStatistics();
      
      // Refresh the event details view
      showAdminEventDetails(eventId);
    };
    reader.readAsDataURL(qrInput.files[0]);
  } else {
    // No new QR code, just save
    saveEvents();
    
    showToast('Event updated successfully!', 'success');
    updateStatistics();
    
    // Refresh the event details view
    showAdminEventDetails(eventId);
  }
}

function showDeleteEventConfirm(eventId, container) {
  const event = appState.events.find(e => e.id === eventId);
  const registrations = appState.registrations.filter(r => r.eventId === eventId);
  
  container.innerHTML = `
    <div class="delete-event-confirm">
      <div style="text-align: center; padding: 2rem;">
        <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: var(--color-error); margin-bottom: 1rem;"></i>
        <h3 style="color: var(--color-error); margin-bottom: 1rem;">Delete Event</h3>
        <p style="margin-bottom: 1rem;">Are you sure you want to delete this event?</p>
        <div style="background: var(--color-secondary); padding: 1rem; border-radius: var(--radius-base); margin-bottom: 1.5rem;">
          <h4>${event.name}</h4>
          <p style="color: var(--color-text-secondary); margin-top: 0.5rem;">
            ${registrations.length} student(s) have registered for this event
          </p>
        </div>
        <p style="color: var(--color-error); margin-bottom: 2rem;">
          <strong>Warning:</strong> This action cannot be undone!
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
          <button class="btn btn--outline" onclick="renderAdminEventsList()">
            <i class="fas fa-times"></i> Cancel
          </button>
          <button class="btn btn--primary" style="background: var(--color-error);" onclick="confirmDeleteEvent(${eventId})">
            <i class="fas fa-trash"></i> Yes, Delete Event
          </button>
        </div>
      </div>
    </div>
  `;
}

function confirmDeleteEvent(eventId) {
  const index = appState.events.findIndex(e => e.id === eventId);
  if (index > -1) {
    appState.events.splice(index, 1);
    
    // Also remove all registrations for this event
    appState.registrations = appState.registrations.filter(r => r.eventId !== eventId);
    
    // Save to localStorage
    saveEvents();
    saveRegistrations();
    
    showToast('Event deleted successfully', 'success');
    updateStatistics();
    renderAdminEventsList();
  }
}

function downloadEventReport(eventId) {
  const event = appState.events.find(e => e.id === eventId);
  if (!event) {
    showToast('Event not found', 'error');
    return;
  }
  
  // Get all registrations for this event
  const registrations = appState.registrations.filter(r => r.eventId === eventId);
  
  if (registrations.length === 0) {
    showToast('No registrations found for this event', 'error');
    return;
  }
  
  // Create CSV content
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add header with event details
  csvContent += `Event Registration Report\n`;
  csvContent += `Event Name:,${event.name}\n`;
  csvContent += `Date:,${formatDate(event.date)}\n`;
  csvContent += `Total Registrations:,${registrations.length}\n`;
  csvContent += `\n`;
  
  // Add column headers
  const headers = ['S.No', 'Registration ID', 'Name', 'Email', 'Phone', 'Roll Number', 'Department', 'Year', 'Registration Date'];
  
  // Check if there are custom fields
  const hasCustomFields = registrations.some(r => r.customFieldResponses);
  if (hasCustomFields) {
    // Get all unique custom field labels
    const customFieldLabels = new Set();
    registrations.forEach(r => {
      if (r.customFieldResponses) {
        Object.keys(r.customFieldResponses).forEach(label => customFieldLabels.add(label));
      }
    });
    headers.push(...Array.from(customFieldLabels));
  }
  
  csvContent += headers.join(',') + '\n';
  
  // Add data rows
  registrations.forEach((reg, index) => {
    const row = [
      index + 1,
      reg.id,
      `"${reg.name}"`,
      reg.email,
      reg.phone,
      reg.rollNumber,
      reg.department,
      reg.year,
      new Date(reg.registeredAt).toLocaleDateString()
    ];
    
    // Add custom field responses
    if (hasCustomFields) {
      const customFieldLabels = headers.slice(9); // Get custom field headers
      customFieldLabels.forEach(label => {
        const value = reg.customFieldResponses?.[label] || '';
        row.push(`"${value}"`);
      });
    }
    
    csvContent += row.join(',') + '\n';
  });
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${event.name.replace(/[^a-z0-9]/gi, '_')}_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
  
  showToast('Excel report downloaded successfully!', 'success');
}

function deleteEvent(eventId) {
  if (confirm('Are you sure you want to delete this event?')) {
    const index = appState.events.findIndex(e => e.id === eventId);
    if (index > -1) {
      appState.events.splice(index, 1);
      showToast('Event deleted successfully', 'success');
      updateStatistics();
      renderAdminEventsList();
    }
  }
}

function renderAdminCompletedEvents() {
  const container = document.getElementById('adminCompletedEvents');
  
  // Find events that should have results posted
  const completedEvents = appState.events.filter(e => {
    const eventDate = new Date(e.date);
    const today = new Date();
    // Set both to midnight for date-only comparison
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return eventDate <= today;
  });
  
  if (completedEvents.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No completed events to post results for.</p>';
    return;
  }
  
  container.innerHTML = completedEvents.map(event => {
    // Check if results already posted for this event
    const hasResults = appState.pastEvents.some(pe => pe.eventId === event.id);
    
    return `
      <div class="admin-event-item" style="margin-bottom: 1rem;">
        <div class="admin-event-info">
          <h4>${event.name}</h4>
          <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${formatDate(event.date)} • ${event.registered} registrations</p>
        </div>
        ${hasResults ? 
          `<span style="color: var(--color-success); font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-check-circle"></i> Results Published
          </span>` :
          `<button class="btn btn--primary btn--sm" onclick="openPostResultsModal(${event.id})">
            <i class="fas fa-trophy"></i> Post Results
          </button>`
        }
      </div>
    `;
  }).join('');
}

let customPlacementCounter = 2;
let allRegistrations = [];

function openPostResultsModal(eventId) {
  // Get registered users for this event
  allRegistrations = appState.registrations.filter(r => r.eventId === eventId);
  
  // Check if there are any registrations
  if (allRegistrations.length === 0) {
    showToast('No registered participants for this event. Cannot post results.', 'error');
    return;
  }
  
  document.getElementById('resultEventId').value = eventId;
  
  // Clear form fields
  document.getElementById('customPlacementsContainer').innerHTML = '';
  const firstPlaceSearch = document.getElementById('firstPlaceSearch');
  const firstPlaceEmail = document.getElementById('firstPlaceEmail');
  if (firstPlaceSearch) firstPlaceSearch.value = '';
  if (firstPlaceEmail) firstPlaceEmail.value = '';
  
  // Hide all suggestion boxes
  document.querySelectorAll('.autocomplete-suggestions').forEach(div => {
    div.style.display = 'none';
    div.innerHTML = '';
  });
  
  customPlacementCounter = 2;
  
  openModal('postResultsModal');
}

function showWinnerSuggestions(inputId, suggestionsId) {
  const input = document.getElementById(inputId);
  const suggestionsDiv = document.getElementById(suggestionsId);
  
  if (!input || !suggestionsDiv) return;
  
  const searchTerm = input.value.toLowerCase().trim();
  
  // Filter registered users
  const filteredRegs = allRegistrations.filter(reg => {
    if (!searchTerm) return true;
    return reg.name.toLowerCase().includes(searchTerm) || 
           reg.email.toLowerCase().includes(searchTerm);
  });
  
  // Clear previous suggestions
  suggestionsDiv.innerHTML = '';
  
  if (filteredRegs.length === 0) {
    suggestionsDiv.innerHTML = '<div class="autocomplete-item no-results">No registered members found</div>';
    suggestionsDiv.style.display = 'block';
    return;
  }
  
  // Show suggestions
  filteredRegs.forEach(reg => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.innerHTML = `
      <div style="font-weight: 500;">${reg.name}</div>
      <div style="font-size: 0.875rem; color: var(--color-text-secondary);">${reg.email}</div>
    `;
    item.onclick = () => selectWinner(inputId, suggestionsId, reg);
    suggestionsDiv.appendChild(item);
  });
  
  suggestionsDiv.style.display = 'block';
}

function selectWinner(inputId, suggestionsId, registration) {
  const input = document.getElementById(inputId);
  const suggestionsDiv = document.getElementById(suggestionsId);
  const hiddenInput = document.getElementById(inputId.replace('Search', 'Email'));
  
  if (input) {
    input.value = `${registration.name} (${registration.email})`;
  }
  
  if (hiddenInput) {
    hiddenInput.value = registration.email;
  }
  
  if (suggestionsDiv) {
    suggestionsDiv.style.display = 'none';
  }
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.form-group')) {
    document.querySelectorAll('.autocomplete-suggestions').forEach(div => {
      div.style.display = 'none';
    });
  }
});

function addCustomPlacement() {
  const container = document.getElementById('customPlacementsContainer');
  
  const placementDiv = document.createElement('div');
  placementDiv.className = 'form-group';
  placementDiv.id = `customPlacement${customPlacementCounter}`;
  placementDiv.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
      <div style="flex: 1;">
        <label class="form-label">
          <i class="fas fa-award" style="color: var(--color-primary);"></i> 
          ${getOrdinal(customPlacementCounter)} Place
        </label>
        <div style="position: relative;">
          <input type="text" id="place${customPlacementCounter}Search" placeholder="Search by name or email..." 
                 class="form-control"
                 oninput="showWinnerSuggestions('place${customPlacementCounter}Search', 'place${customPlacementCounter}Suggestions')"
                 onfocus="showWinnerSuggestions('place${customPlacementCounter}Search', 'place${customPlacementCounter}Suggestions')"
                 autocomplete="off">
          <i class="fas fa-search" style="position: absolute; right: 12px; top: 12px; color: var(--color-text-secondary); pointer-events: none;"></i>
          <input type="hidden" id="place${customPlacementCounter}Email">
          <div id="place${customPlacementCounter}Suggestions" class="autocomplete-suggestions"></div>
        </div>
        <input type="file" id="place${customPlacementCounter}Cert" class="form-control" 
               accept="image/*,application/pdf" style="margin-top: 0.5rem;">
        <small style="color: var(--color-text-secondary); display: block; margin-top: 0.25rem;">
          Upload certificate (optional)
        </small>
      </div>
      <button type="button" class="btn btn--secondary btn--sm" 
              onclick="removeCustomPlacement(${customPlacementCounter})" 
              style="margin-top: 1.8rem;">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  container.appendChild(placementDiv);
  customPlacementCounter++;
}

function removeCustomPlacement(placementNum) {
  const element = document.getElementById(`customPlacement${placementNum}`);
  if (element) {
    element.remove();
  }
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

async function handlePostResults(e) {
  e.preventDefault();
  
  const eventId = parseInt(document.getElementById('resultEventId').value);
  const event = appState.events.find(e => e.id === eventId);
  
  if (!event) return;
  
  // Check if results already posted for this event
  const existingResult = appState.pastEvents.find(pe => pe.eventId === eventId);
  if (existingResult) {
    showToast('Results have already been published for this event', 'error');
    closeModal('postResultsModal');
    return;
  }
  
  // Get 1st place winner
  const firstPlaceEmail = document.getElementById('firstPlaceEmail').value;
  
  // Validate that 1st place winner is selected
  if (!firstPlaceEmail) {
    showToast('Please select a 1st place winner', 'error');
    return;
  }
  
  const firstPlaceReg = appState.registrations.find(r => r.email === firstPlaceEmail);
  
  // Validate that the selected email is from registered users
  if (!firstPlaceReg) {
    showToast('Selected winner is not a registered participant', 'error');
    return;
  }
  
  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // Get certificates
  const firstPlaceCertFile = document.getElementById('firstPlaceCert').files[0];
  const participationCertFile = document.getElementById('participationCert').files[0];
  
  // Convert certificates to base64
  const firstPlaceCert = await fileToBase64(firstPlaceCertFile);
  const participationCert = await fileToBase64(participationCertFile);
  
  // Collect all custom placements (starting from 2nd place)
  const customPlacements = [];
  for (let i = 2; i < customPlacementCounter; i++) {
    const emailSelect = document.getElementById(`place${i}Email`);
    const certFile = document.getElementById(`place${i}Cert`);
    
    if (emailSelect && emailSelect.value) {
      const reg = appState.registrations.find(r => r.email === emailSelect.value);
      const cert = certFile && certFile.files[0] ? await fileToBase64(certFile.files[0]) : null;
      
      customPlacements.push({
        place: i,
        email: emailSelect.value,
        name: reg ? reg.name : emailSelect.value,
        certificate: cert
      });
    }
  }
  
  const result = {
    id: Date.now(),
    eventId: eventId,
    name: event.name,
    category: event.category,
    date: event.date,
    winners: {
      first: {
        email: firstPlaceEmail,
        name: firstPlaceReg ? firstPlaceReg.name : firstPlaceEmail,
        certificate: firstPlaceCert
      }
    },
    customPlacements: customPlacements,
    participationCertificate: participationCert,
    participants: parseInt(document.getElementById('participantCount').value),
    summary: document.getElementById('eventSummary').value
  };
  
  appState.pastEvents.push(result);
  
  // Save to localStorage
  savePastEvents();
  saveEvents(); // Save events with hasResults flag
  
  // Mark event as completed (don't remove, just mark)
  event.hasResults = true;
  event.resultsId = result.id;
  
  closeModal('postResultsModal');
  showToast('Results posted successfully!', 'success');
  
  // Reset form
  document.getElementById('postResultsForm').reset();
  document.getElementById('customPlacementsContainer').innerHTML = '';
  customPlacementCounter = 2;
  
  // Update views
  updateStatistics();
  renderAdminCompletedEvents();
  renderResults();
}

function renderAdminRegistrations() {
  const container = document.getElementById('adminRegistrationsList');
  
  if (appState.registrations.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-secondary);">No registrations yet.</p>';
    return;
  }
  
  const recentRegistrations = appState.registrations.slice(-10).reverse();
  
  container.innerHTML = recentRegistrations.map(reg => `
    <div style="padding: 1rem; background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-base); margin-bottom: 0.75rem;">
      <h4 style="margin-bottom: 0.5rem;">${reg.name}</h4>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: 0.25rem;">
        <strong>Event:</strong> ${reg.eventName}
      </p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm); margin-bottom: 0.25rem;">
        <strong>Roll No:</strong> ${reg.rollNumber} | <strong>Dept:</strong> ${reg.department} | <strong>Year:</strong> ${reg.year}
      </p>
      <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
        <strong>Contact:</strong> ${reg.email} | ${reg.phone}
      </p>
    </div>
  `).join('');
}

// Student Dashboard
function renderStudentDashboard() {
  const currentUserEmail = appState.currentUser?.email;
  const myRegistrations = appState.registrations.filter(r => 
    appState.currentUser && r.email === currentUserEmail
  );
  
  const registeredContainer = document.getElementById('myRegisteredEvents');
  const resultsContainer = document.getElementById('myResultsCertificates');
  const historyContainer = document.getElementById('registrationHistory');
  
  if (myRegistrations.length === 0) {
    registeredContainer.innerHTML = '<p style="color: var(--color-text-secondary);">You haven\'t registered for any events yet.</p>';
    resultsContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No results available.</p>';
    historyContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No registration history.</p>';
    return;
  }
  
  // Available Events
  const upcomingRegs = myRegistrations.filter(r => {
    const event = appState.events.find(e => e.id === r.eventId);
    return event && new Date(event.date) > new Date();
  });
  
  if (upcomingRegs.length === 0) {
    registeredContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No events yet.</p>';
  } else {
    registeredContainer.innerHTML = upcomingRegs.map(reg => {
      const event = appState.events.find(e => e.id === reg.eventId);
      return `
        <div class="dashboard-event-item clickable" onclick="showEventDetails(${reg.eventId})" style="cursor: pointer;">
          <h4>${reg.eventName}</h4>
          <p>${event ? formatDate(event.date) : ''} • Registration ID: ${reg.id}</p>
        </div>
      `;
    }).join('');
  }
  
  // Results & Certificates
  const myResults = appState.pastEvents.filter(result => {
    // Check if user is a winner
    const isWinner = result.winners.first.email === currentUserEmail ||
                     result.customPlacements?.some(p => p.email === currentUserEmail);
    
    // Check if user participated (has participation certificate)
    const participated = appState.registrations.some(r => 
      r.eventId === result.eventId && r.email === currentUserEmail
    ) && result.participationCertificate;
    
    return isWinner || participated;
  });
  
  if (myResults.length === 0) {
    resultsContainer.innerHTML = '<p style="color: var(--color-text-secondary);">No results available yet.</p>';
  } else {
    resultsContainer.innerHTML = myResults.map(result => {
      const isFirstPlace = result.winners.first.email === currentUserEmail;
      const customPlacement = result.customPlacements?.find(p => p.email === currentUserEmail);
      
      let badge = '';
      let certAvailable = false;
      
      if (isFirstPlace) {
        badge = '<span style="color: #FFD700;"><i class="fas fa-medal"></i> 1st Place</span>';
        certAvailable = !!result.winners.first.certificate;
      } else if (customPlacement) {
        const place = customPlacement.place;
        let color = 'var(--color-primary)';
        let icon = 'fa-award';
        
        if (place === 2) {
          color = '#C0C0C0';
          icon = 'fa-medal';
        } else if (place === 3) {
          color = '#CD7F32';
          icon = 'fa-medal';
        }
        
        badge = `<span style="color: ${color};"><i class="fas ${icon}"></i> ${getOrdinal(place)} Place</span>`;
        certAvailable = !!customPlacement.certificate;
      } else {
        badge = '<span style="color: var(--color-text-secondary);"><i class="fas fa-certificate"></i> Participant</span>';
        certAvailable = !!result.participationCertificate;
      }
      
      return `
        <div class="dashboard-event-item clickable" onclick="showResultDetails(${result.id})" style="cursor: pointer;">
          <h4>${result.name}</h4>
          <p>${badge} ${certAvailable ? '• <i class="fas fa-download"></i> Certificate Available' : ''}</p>
        </div>
      `;
    }).join('');
  }
  
  // Registration History
  historyContainer.innerHTML = myRegistrations.reverse().map(reg => `
    <div class="dashboard-event-item">
      <h4>${reg.eventName}</h4>
      <p>Registered on ${formatDate(reg.date.split('T')[0])}</p>
    </div>
  `).join('');
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Theme Management
function toggleTheme() {
  const html = document.documentElement;
  const isDarkMode = html.getAttribute('data-color-scheme') === 'dark';
  const newTheme = isDarkMode ? 'light' : 'dark';
  html.setAttribute('data-color-scheme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#themeToggleBtn i');
  if (theme === 'dark') {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  } else {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
}