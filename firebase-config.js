// Firebase Configuration
// TODO: Replace with your Firebase project credentials
// Get these from: Firebase Console > Project Settings > Your apps > Web app

const firebaseConfig = {
  apiKey: "AIzaSyCop5pK8RB3crwamAhBRO6H6dX_HF6HFvo",
  authDomain: "clgevent-management-system.firebaseapp.com",
  projectId: "clgevent-management-system",
  storageBucket: "clgevent-management-system.firebasestorage.app",
  messagingSenderId: "750166055970",
  appId: "1:750166055970:web:50771cbdd5f1409000fe7b",
  measurementId: "G-DBRN87FG3Q"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
      console.log('The current browser does not support persistence.');
    }
  });

// Auth state observer
auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log('User logged in:', user.email);
    
    // Get user data from Firestore
    try {
      const userDoc = await db.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        appState.currentUser = {
          uid: user.uid,
          email: user.email,
          name: userData.name,
          type: userData.userType,
          department: userData.department || '',
          year: userData.year || '',
          section: userData.section || '',
          emailVerified: user.emailVerified
        };
        
        // Update UI
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('userMenu').style.display = 'flex';
        
        // Show profile icon
        document.getElementById('profileIconContainer').style.display = 'block';
        
        // Update profile dropdown
        updateProfileDropdown();
        
        // Load user's data
        await loadUserData();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  } else {
    console.log('User logged out');
    appState.currentUser = null;
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('profileIconContainer').style.display = 'none';
  }
});

// Switch between login and signup tabs
function switchAuthTab(tab) {
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const modalTitle = document.getElementById('authModalTitle');
  
  if (tab === 'login') {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginTab.style.borderBottomColor = 'var(--color-primary)';
    signupTab.style.borderBottomColor = 'transparent';
    loginTab.style.color = 'var(--color-primary)';
    signupTab.style.color = 'var(--color-text-secondary)';
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    modalTitle.textContent = 'Login';
  } else {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupTab.style.borderBottomColor = 'var(--color-primary)';
    loginTab.style.borderBottomColor = 'transparent';
    signupTab.style.color = 'var(--color-primary)';
    loginTab.style.color = 'var(--color-text-secondary)';
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
    modalTitle.textContent = 'Sign Up';
  }
}

// Handle Signup
async function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const userType = document.getElementById('signupUserType').value;
  
  try {
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    // Create user account
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Prepare user data
    const userData = {
      name: name,
      email: email,
      userType: userType,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      emailVerified: true
    };
    
    // Add student-specific fields if user is a student
    if (userType === 'student') {
      userData.department = document.getElementById('signupDepartment').value || '';
      userData.year = document.getElementById('signupYear').value || '';
      userData.section = document.getElementById('signupSection').value || '';
    }
    
    // Save user data to Firestore
    await db.collection('users').doc(user.uid).set(userData);
    
    // Close modal
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      loginModal.classList.remove('active');
    }
    
    // Show success message
    if (typeof showToast === 'function') {
      showToast(`Welcome, ${name}! Your account has been created successfully.`, 'success');
    }
    
    // Reset form
    document.getElementById('signupForm').reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Redirect based on user type (user is already logged in)
    setTimeout(() => {
      if (userType === 'admin') {
        if (typeof openDashboard === 'function') {
          openDashboard();
        }
      } else {
        if (typeof navigateTo === 'function') {
          navigateTo('home');
        }
      }
    }, 500);
    
  } catch (error) {
    console.error('Signup error:', error);
    let errorMessage = 'Failed to create account. ';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage += 'This email is already registered.';
        break;
      case 'auth/invalid-email':
        errorMessage += 'Invalid email address.';
        break;
      case 'auth/weak-password':
        errorMessage += 'Password should be at least 6 characters.';
        break;
      default:
        errorMessage += error.message;
    }
    
    showToast(errorMessage, 'error');
    
    // Reset button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Account';
    submitBtn.disabled = false;
  }
}

// Handle Login
async function handleFirebaseLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    // Sign in
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Get user data
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    
    // Close modal
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
      loginModal.classList.remove('active');
    }
    
    // Show success message
    if (typeof showToast === 'function') {
      showToast(`Welcome back, ${userData.name}!`, 'success');
    }
    
    // Reset form
    document.getElementById('loginForm').reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Redirect based on user type
    if (userData.userType === 'admin') {
      if (typeof openDashboard === 'function') {
        openDashboard();
      }
    } else {
      if (typeof navigateTo === 'function') {
        navigateTo('home');
      }
    }
    
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'Failed to login. ';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage += 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage += 'Incorrect password.';
        break;
      case 'auth/invalid-email':
        errorMessage += 'Invalid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage += 'This account has been disabled.';
        break;
      default:
        errorMessage += error.message;
    }
    
    showToast(errorMessage, 'error');
    
    // Reset button
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
    submitBtn.disabled = false;
  }
}

// Handle Logout
async function firebaseLogout() {
  try {
    await auth.signOut();
    appState.currentUser = null;
    showToast('Logged out successfully', 'success');
    navigateTo('home');
  } catch (error) {
    console.error('Logout error:', error);
    showToast('Failed to logout', 'error');
  }
}

// Show email verification notice
function showEmailVerificationNotice() {
  const user = auth.currentUser;
  if (user && !user.emailVerified) {
    const notice = document.createElement('div');
    notice.id = 'emailVerificationNotice';
    notice.style.cssText = `
      position: fixed;
      top: 70px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-warning);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--radius-base);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 90%;
    `;
    notice.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <span>Please verify your email address. Check your inbox for the verification link.</span>
      <button onclick="resendVerificationEmail()" style="background: white; color: var(--color-warning); border: none; padding: 0.5rem 1rem; border-radius: var(--radius-sm); cursor: pointer; font-weight: 500;">
        Resend Email
      </button>
      <button onclick="document.getElementById('emailVerificationNotice').remove()" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 1.5rem; padding: 0 0.5rem;">
        &times;
      </button>
    `;
    
    // Remove existing notice if any
    const existingNotice = document.getElementById('emailVerificationNotice');
    if (existingNotice) existingNotice.remove();
    
    document.body.appendChild(notice);
  }
}

// Resend verification email
async function resendVerificationEmail() {
  const user = auth.currentUser;
  if (user) {
    try {
      await user.sendEmailVerification();
      showToast('Verification email sent! Please check your inbox.', 'success');
    } catch (error) {
      console.error('Error sending verification email:', error);
      showToast('Failed to send verification email. Please try again later.', 'error');
    }
  }
}

// Load user data from Firestore
async function loadUserData() {
  if (!appState.currentUser) return;
  
  try {
    // Load events
    const eventsSnapshot = await db.collection('events').get();
    appState.events = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Load registrations
    const registrationsSnapshot = await db.collection('registrations').get();
    appState.registrations = registrationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Load past events (results)
    const pastEventsSnapshot = await db.collection('pastEvents').get();
    appState.pastEvents = pastEventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Update UI
    updateStatistics();
    if (appState.currentPage === 'home') {
      renderUpcomingEventsPreview();
    }
    
  } catch (error) {
    console.error('Error loading user data:', error);
  }
}

// Update profile dropdown with user info
function updateProfileDropdown() {
  if (!appState.currentUser) return;
  
  document.getElementById('profileName').textContent = appState.currentUser.name || 'User';
  document.getElementById('profileEmail').textContent = appState.currentUser.email || '';
  document.getElementById('profileId').textContent = `ID: ${appState.currentUser.uid || 'N/A'}`;
  document.getElementById('profileDepartment').textContent = `Department: ${appState.currentUser.department || 'N/A'}`;
  document.getElementById('profileYear').textContent = `Year: ${appState.currentUser.year || 'N/A'}`;
  document.getElementById('profileSection').textContent = `Section: ${appState.currentUser.section || 'N/A'}`;
}

// Toggle profile dropdown
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.classList.toggle('show');
}

// Close profile dropdown when clicking outside
document.addEventListener('click', function(event) {
  const profileContainer = document.getElementById('profileIconContainer');
  const dropdown = document.getElementById('profileDropdown');
  
  if (profileContainer && !profileContainer.contains(event.target)) {
    dropdown?.classList.remove('show');
  }
});

// Open edit profile modal
function openEditProfileModal() {
  if (!appState.currentUser) return;
  
  // Populate form with current data
  document.getElementById('editProfileName').value = appState.currentUser.name || '';
  document.getElementById('editProfileEmail').value = appState.currentUser.email || '';
  document.getElementById('editProfileDepartment').value = appState.currentUser.department || '';
  document.getElementById('editProfileYear').value = appState.currentUser.year || '';
  document.getElementById('editProfileSection').value = appState.currentUser.section || '';
  
  openModal('editProfileModal');
  
  // Close profile dropdown
  document.getElementById('profileDropdown').classList.remove('show');
}

// Handle edit profile form submission
async function handleEditProfile(e) {
  e.preventDefault();
  
  if (!appState.currentUser) return;
  
  const name = document.getElementById('editProfileName').value;
  const department = document.getElementById('editProfileDepartment').value;
  const year = document.getElementById('editProfileYear').value;
  const section = document.getElementById('editProfileSection').value;
  
  try {
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;
    
    // Update Firestore
    await db.collection('users').doc(appState.currentUser.uid).update({
      name: name,
      department: department,
      year: year,
      section: section
    });
    
    // Update local state
    appState.currentUser.name = name;
    appState.currentUser.department = department;
    appState.currentUser.year = year;
    appState.currentUser.section = section;
    
    // Update profile dropdown
    updateProfileDropdown();
    
    closeModal('editProfileModal');
    showToast('Profile updated successfully!', 'success');
    
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
  } catch (error) {
    console.error('Error updating profile:', error);
    showToast('Failed to update profile', 'error');
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    submitBtn.disabled = false;
  }
}

// Show/hide student fields in signup form based on user type
function toggleSignupStudentFields() {
  const userType = document.getElementById('signupUserType').value;
  const studentFields = document.getElementById('signupStudentFields');
  const yearField = document.getElementById('signupYearField');
  const sectionField = document.getElementById('signupSectionField');
  
  if (userType === 'student') {
    studentFields.style.display = 'block';
    yearField.style.display = 'block';
    sectionField.style.display = 'block';
  } else {
    studentFields.style.display = 'none';
    yearField.style.display = 'none';
    sectionField.style.display = 'none';
  }
}

// Pre-fill registration form with user data
function prefillRegistrationForm() {
  if (!appState.currentUser) return;
  
  document.getElementById('regName').value = appState.currentUser.name || '';
  document.getElementById('regEmail').value = appState.currentUser.email || '';
  
  if (appState.currentUser.department) {
    document.getElementById('regDepartment').value = appState.currentUser.department;
  }
  if (appState.currentUser.year) {
    document.getElementById('regYear').value = appState.currentUser.year;
  }
  if (appState.currentUser.section) {
    document.getElementById('regSection').value = appState.currentUser.section;
  }
}
