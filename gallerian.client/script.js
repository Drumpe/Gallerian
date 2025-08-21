document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data (in a real app, this would be from an API) ---
    const profileData = {
        username: 'Artist_Name',
        bio: 'This is a sample bio for the artist.',
        profilePic: 'https://via.placeholder.co/150',
        socials: {
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            linkedin: 'https://linkedin.com',
        },
        uploadedArtworks: [
            { id: 1, title: 'Serene Sunset', artist: 'Artist_Name', image: 'https://via.placeholder.co/400x400?text=Uploaded+1', description: 'A serene painting.', tags: ['landscape', 'oil paint'] },
            { id: 2, title: 'Urban Geometry', artist: 'Artist_Name', image: 'https://via.placeholder.co/400x400?text=Uploaded+2', description: 'Digital art.', tags: ['digital', 'abstract'] },
        ],
        likedArtworks: [
            { id: 3, title: 'Cosmic Dream', artist: 'Another Artist', image: 'https://via.placeholder.co/150x150?text=Liked+1', description: 'Space art.', tags: ['sci-fi', 'digital'] },
            { id: 4, title: 'Forest Whispers', artist: 'Other Artist', image: 'https://via.placeholder.co/150x150?text=Liked+2', description: 'Watercolor painting.', tags: ['watercolor', 'nature'] },
        ],
    };

    const searchResultsData = [
        { id: 1, title: 'Digital Landscape', artist: 'Artist One', image: 'https://via.placeholder.co/400x400?text=Digital+Landscape', description: 'A futuristic digital painting.', tags: ['digital', 'landscape'] },
        { id: 2, title: 'Portrait in Oil', artist: 'Artist Two', image: 'https://via.placeholder.co/400x400?text=Portrait+in+Oil', description: 'A classic oil portrait.', tags: ['oil paint', 'portrait'] },
        { id: 3, title: 'Abstract Sculpture', artist: 'Artist Three', image: 'https://via.placeholder.co/400x400?text=Abstract+Sculpture', description: 'A modern sculpture.', tags: ['sculpture', 'abstract'] },
        { id: 4, title: 'City at Night', artist: 'Artist Four', image: 'https://via.placeholder.co/400x400?text=City+at+Night', description: 'Photography of a city.', tags: ['photography', 'city'] },
    ];

    const recentArtworkData = [{
        id: 1,
        image: 'https://placehold.co/400x400?text=Artwork+1',
        title: 'Serene Sunset',
        artist: 'Alex Rivera',
        description: 'A beautiful oil painting capturing the last moments of light over a quiet lake.',
        tags: ['landscape', 'oil painting', 'nature', 'sunset']
    }, {
        id: 2,
        image: 'https://placehold.co/400x400?text=Artwork+2',
        title: 'Urban Geometry',
        artist: 'Samira Khan',
        description: 'A striking piece of digital art focused on geometric shapes and vibrant colors.',
        tags: ['digital art', 'geometric', 'abstract', 'cityscape']
    }, {
        id: 3,
        image: 'https://placehold.co/400x400?text=Artwork+3',
        title: 'Whispers of the Forest',
        artist: 'Ben Carter',
        description: 'An ethereal watercolor painting of a mysterious forest with soft, muted tones.',
        tags: ['watercolor', 'fantasy', 'forest', 'nature']
    }, {
        id: 4,
        image: 'https://placehold.co/400x400?text=Artwork+4',
        title: 'Cosmic Dream',
        artist: 'Elara Vance',
        description: 'An imaginative space-themed piece with vibrant nebulae and distant galaxies.',
        tags: ['sci-fi', 'space', 'fantasy', 'digital']
    }];


    // --- DOM Elements ---
    const loginButton = document.getElementById('loginButton');
    const loginButtonHero = document.getElementById('loginButtonHero');
    const signUpButton = document.getElementById('signUpButton');
    const logoutButton = document.getElementById('logoutButton');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const addArtworkBtn = document.getElementById('addArtworkBtn');

    // Pop-up elements
    const loginPopup = document.getElementById('loginPopup');
    const signUpPopup = document.getElementById('signUpPopup');
    const editProfilePopup = document.getElementById('editProfilePopup');
    const addArtworkPopup = document.getElementById('addArtworkPopup');
    const artworkPopup = document.getElementById('artworkPopup');
    const closeButtons = document.querySelectorAll('.close-popup');

    const uploadedArtworkContainer = document.getElementById('uploaded-artwork-container');
    const likedArtworkContainer = document.getElementById('liked-artwork-container');
    const artworkContainer = document.getElementById('artwork-container');
    const resultsSection = document.getElementById('resultsSection');
    const searchForm = document.getElementById('searchForm');


    // --- General Pop-up Functions ---
    const showPopup = (popup, controllingButton = null) => {
        popup.classList.remove('d-none');
        document.body.classList.add('no-scroll');
        if (controllingButton) {
            controllingButton.setAttribute('aria-expanded', 'true');
        }
        popup.focus();
    };

    const hidePopup = (popup, controllingButton = null) => {
        popup.classList.add('d-none');
        document.body.classList.remove('no-scroll');
        if (controllingButton) {
            controllingButton.setAttribute('aria-expanded', 'false');
            controllingButton.focus();
        }
    };

    const openArtworkPopup = (artwork) => {
        const artworkDetails = document.getElementById('artworkDetails');
        const isProfileOwner = true; // This would be dynamic based on login state
        const deleteBtnHtml = isProfileOwner ? `<button type="button" id="deleteArtworkBtn" class="btn btn-danger mt-3" data-id="${artwork.id}">Delete Artwork</button>` : '';

        artworkDetails.innerHTML = `
            <img src="${artwork.image}" alt="Artwork titled ${artwork.title}" class="img-fluid mb-3" />
            <h3 id="artwork-popup-title">${artwork.title}</h3>
            <p><strong>Artist:</strong> ${artwork.artist}</p>
            <p><strong>Description:</strong> ${artwork.description}</p>
            <p><strong>Tags:</strong> ${artwork.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}</p>
            ${deleteBtnHtml}
        `;
        if (isProfileOwner) {
            document.getElementById('deleteArtworkBtn').addEventListener('click', () => handleDeleteArtwork(artwork.id));
        }
        showPopup(artworkPopup);
    };

    // --- Page Initialization Logic ---
    const initPage = () => {
        // Home page
        if (artworkContainer) {
            renderArtworkCards(recentArtworkData);
        }
        // User Profile page
        if (document.querySelector('.user-profile-container')) {
            initializeUserProfile();
        }
        // Search Results page
        if (document.getElementById('resultsSection')) {
            initializeSearchResults();
        }
    };

    // --- User Profile Page Functions ---
    const initializeUserProfile = () => {
        renderProfileData(profileData);
        renderArtwork(profileData.uploadedArtworks, uploadedArtworkContainer);
        renderArtwork(profileData.likedArtworks, likedArtworkContainer, true);
        setupEventListeners();
    };

    const renderProfileData = (user) => {
        document.getElementById('profile-picture').src = user.profilePic;
        document.getElementById('profile-picture').alt = `Profile picture for ${user.username}`;
        document.getElementById('user-username').textContent = user.username;
        document.getElementById('user-bio').textContent = user.bio;
        const socialList = document.getElementById('social-media-icons');
        socialList.innerHTML = '';
        for (const [platform, url] of Object.entries(user.socials)) {
            if (url) {
                const link = document.createElement('a');
                link.href = url;
                link.className = 'text-white mx-2';
                link.setAttribute('aria-label', `${user.username}'s ${platform} page`);
                link.innerHTML = `<i class="fab fa-${platform}"></i>`;
                socialList.appendChild(link);
            }
        }
    };

    // --- Artwork Rendering Functions ---
    const renderArtwork = (artworks, container, isLiked = false) => {
        if (!container) return;
        container.innerHTML = '';
        artworks.forEach(artwork => {
            const article = document.createElement('article');
            article.className = 'col artwork-card-container';
            const sizeClass = isLiked ? 'w-100 h-100' : 'h-100';
            article.innerHTML = `
                <button class="card artwork-card p-0 text-start border-0 ${sizeClass}" aria-label="View details of ${artwork.title}" data-id="${artwork.id}" data-type="${isLiked ? 'liked' : 'uploaded'}">
                    <img src="${artwork.image}" class="card-img-top" alt="Artwork titled ${artwork.title}" />
                    <div class="card-body">
                        <h5 class="card-title">${artwork.title}</h5>
                        <p class="card-text"><small class="text-muted">By: ${artwork.artist}</small></p>
                    </div>
                </button>
            `;
            article.querySelector('button').addEventListener('click', () => openArtworkPopup(artwork));
            container.appendChild(article);
        });
    };

    const renderArtworkCards = (data) => {
        data.forEach(artwork => {
            const cardCol = document.createElement('div');
            cardCol.className = 'col';
            cardCol.innerHTML = `
                <div class="card h-100" data-artwork-id="${artwork.id}" role="button" tabindex="0">
                    <div class="image-container">
                        <img src="${artwork.image}" class="card-img-top" alt="${artwork.title}" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${artwork.title}</h5>
                        <p class="card-text"><small class="text-muted">By: ${artwork.artist}</small></p>
                    </div>
                </div>
            `;
            cardCol.querySelector('.card').addEventListener('click', () => openArtworkPopup(artwork));
            artworkContainer.appendChild(cardCol);
        });
    };

    // --- Search Results Page Functions ---
    const initializeSearchResults = () => {
        renderSearchResults(searchResultsData);
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = document.getElementById('searchInput').value;
                console.log(`Searching for: ${query}`);
                renderSearchResults(searchResultsData); // Using mock data for demonstration
            });
        }
    };

    const renderSearchResults = (results) => {
        if (!resultsSection) return;
        resultsSection.innerHTML = '';
        if (results.length === 0) {
            resultsSection.innerHTML = '<p class="text-center">No results found.</p>';
            return;
        }

        results.forEach(artwork => {
            const article = document.createElement('article');
            article.className = 'col artwork-card-container';
            article.innerHTML = `
                <button class="card artwork-card h-100 p-0 text-start border-0" aria-label="View details of ${artwork.title}" data-id="${artwork.id}">
                    <img src="${artwork.image}" class="card-img-top" alt="Artwork titled ${artwork.title}" />
                    <div class="card-body">
                        <h5 class="card-title">${artwork.title}</h5>
                        <p class="card-text"><small class="text-muted">By: ${artwork.artist}</small></p>
                    </div>
                </button>
            `;
            article.querySelector('button').addEventListener('click', () => openArtworkPopup(artwork));
            resultsSection.appendChild(article);
        });
    };

    // --- Event Listeners ---
    const setupEventListeners = () => {
        if (loginButton) loginButton.addEventListener('click', () => showPopup(loginPopup, loginButton));
        if (loginButtonHero) loginButtonHero.addEventListener('click', () => showPopup(loginPopup, loginButtonHero));
        if (signUpButton) signUpButton.addEventListener('click', () => showPopup(signUpPopup, signUpButton));
        if (editProfileBtn) editProfileBtn.addEventListener('click', () => showPopup(editProfilePopup, editProfileBtn));
        if (addArtworkBtn) addArtworkBtn.addEventListener('click', () => showPopup(addArtworkPopup, addArtworkBtn));

        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const popupToClose = e.target.closest('.popup-overlay');
                hidePopup(popupToClose);
            });
        });

        if (loginPopup) loginPopup.addEventListener('click', (e) => { if (e.target === loginPopup) hidePopup(loginPopup); });
        if (signUpPopup) signUpPopup.addEventListener('click', (e) => { if (e.target === signUpPopup) hidePopup(signUpPopup); });
        if (artworkPopup) artworkPopup.addEventListener('click', (e) => { if (e.target === artworkPopup) hidePopup(artworkPopup); });
        if (editProfilePopup) editProfilePopup.addEventListener('click', (e) => { if (e.target === editProfilePopup) hidePopup(editProfilePopup); });
        if (addArtworkPopup) addArtworkPopup.addEventListener('click', (e) => { if (e.target === addArtworkPopup) hidePopup(addArtworkPopup); });

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (event) => {
                event.preventDefault();
                alert('Login successful!');
                window.location.href = 'userProfile.html';
            });
        }

        if (logoutButton) {
            logoutButton.addEventListener('click', (event) => {
                event.preventDefault();
                alert('You have been logged out.');
                window.location.href = 'index.html';
            });
        }
        
        const editProfileForm = document.getElementById('editProfileForm');
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', handleEditProfileSubmit);
        }

        const addArtworkForm = document.getElementById('addArtworkForm');
        if (addArtworkForm) {
            addArtworkForm.addEventListener('submit', handleAddArtworkSubmit);
        }
    };
    
    // --- Form Handlers ---
    const handleEditProfileSubmit = (event) => {
        event.preventDefault();
        alert('Profile changes saved!');
        hidePopup(document.getElementById('editProfilePopup'), document.getElementById('editProfileBtn'));
    };

    const handleAddArtworkSubmit = (event) => {
        event.preventDefault();
        const selectedTags = Array.from(document.querySelectorAll('#addArtworkForm input[type="checkbox"]:checked')).map(cb => cb.value);
        if (selectedTags.length === 0) {
            alert('Please select at least one tag.');
            return;
        }
        alert('Artwork uploaded successfully!');
        hidePopup(document.getElementById('addArtworkPopup'), document.getElementById('addArtworkBtn'));
    };
    
    const handleDeleteArtwork = (artworkId) => {
        if (confirm('Are you sure you want to delete this artwork?')) {
            console.log(`Deleting artwork with ID: ${artworkId}`);
            alert('Artwork deleted!');
            hidePopup(document.getElementById('artworkPopup'));
        }
    };

    // --- Final Initialization ---
    initPage();
    setupEventListeners();
});