document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const loginButton = document.getElementById('loginButton');
    const loginButtonHero = document.getElementById('loginButtonHero');
    const signUpButton = document.getElementById('signUpButton');
    const loginPopup = document.getElementById('loginPopup');
    const signUpPopup = document.getElementById('signUpPopup');
    const artworkPopup = document.getElementById('artworkPopup');
    const closeButtons = document.querySelectorAll('.close-popup');
    const artworkContainer = document.getElementById('artwork-container');
    const artworkDetails = document.getElementById('artworkDetails');

    // --- Pop-up Functionality ---
    
    // Function to show a pop-up
    function showPopup(popup) {
        popup.classList.remove('d-none');
        document.body.classList.add('no-scroll'); // Optional: Add a class to disable body scroll
    }

    // Function to hide a pop-up
    function hidePopup(popup) {
        popup.classList.add('d-none');
        document.body.classList.remove('no-scroll'); // Optional: Remove the class to re-enable scroll
    }

    // Event listeners to show pop-ups
    loginButton.addEventListener('click', () => showPopup(loginPopup));
    loginButtonHero.addEventListener('click', () => showPopup(loginPopup));
    signUpButton.addEventListener('click', () => showPopup(signUpPopup));

    // Event listeners to hide pop-ups using close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const popupToClose = e.target.closest('.popup-overlay');
            hidePopup(popupToClose);
        });
    });

    // Event listener to hide pop-ups when clicking outside the content
    [loginPopup, signUpPopup, artworkPopup].forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                hidePopup(popup);
            }
        });
    });

    // --- Dynamic Content Generation for Artwork Cards ---

    // A placeholder for API data. In a real app, this would be a fetch() call to a backend.
    const recentArtworkData = [
        {
            id: 1,
            image: 'https://placehold.co/400x400?text=Artwork+1',
            title: 'Serene Sunset',
            artist: 'Alex Rivera',
            description: 'A beautiful oil painting capturing the last moments of light over a quiet lake.',
            tags: ['landscape', 'oil painting', 'nature', 'sunset']
        },
        {
            id: 2,
            image: 'https://placehold.co/400x400?text=Artwork+2',
            title: 'Urban Geometry',
            artist: 'Samira Khan',
            description: 'A striking piece of digital art focused on geometric shapes and vibrant colors.',
            tags: ['digital art', 'geometric', 'abstract', 'cityscape']
        },
        {
            id: 3,
            image: 'https://placehold.co/400x400?text=Artwork+3',
            title: 'Whispers of the Forest',
            artist: 'Ben Carter',
            description: 'An ethereal watercolor painting of a mysterious forest with soft, muted tones.',
            tags: ['watercolor', 'fantasy', 'forest', 'nature']
        },
        {
            id: 4,
            image: 'https://placehold.co/400x400?text=Artwork+4',
            title: 'Cosmic Dream',
            artist: 'Elara Vance',
            description: 'An imaginative space-themed piece with vibrant nebulae and distant galaxies.',
            tags: ['sci-fi', 'space', 'fantasy', 'digital']
        }
    ];

    // Function to create a single artwork card
    const createArtworkCard = (artwork) => {
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

        // Add a click event listener to the card to show the artwork details pop-up
        cardCol.querySelector('.card').addEventListener('click', () => {
            displayArtworkDetails(artwork);
        });

        return cardCol;
    };

    // Function to render all artwork cards
    const renderArtworkCards = (data) => {
        data.forEach(artwork => {
            const card = createArtworkCard(artwork);
            artworkContainer.appendChild(card);
        });
    };

    // Function to display the full artwork details in a pop-up
    const displayArtworkDetails = (artwork) => {
        artworkDetails.innerHTML = `
            <div class="artwork-details-content">
                <img src="${artwork.image}" alt="${artwork.title}" class="img-fluid mb-3">
                <h3 id="artwork-popup-title">${artwork.title}</h3>
                <p><strong>Artist:</strong> ${artwork.artist}</p>
                <p><strong>Description:</strong> ${artwork.description}</p>
                <p><strong>Tags:</strong> ${artwork.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(' ')}</p>
            </div>
        `;
        showPopup(artworkPopup);
    };

    // Initial render of artwork cards
    renderArtworkCards(recentArtworkData);
});