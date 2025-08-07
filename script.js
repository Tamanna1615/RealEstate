let isLoggedIn = false;
let registeredUsers = [];

const allProperties = [
    {
        id: 1, location: "Mumbai", type: "Apartment", price: 24000000, beds: 3, baths: 2, sqft: 1850,
        address: "A-102, Skyline Towers, Bandra West, Mumbai", image: "https://www.mumbaipropertyexchange.com/images/builders/projects/28632/28632-main.webp?height=350", status: "For Sale",
        description: "A luxurious 3BHK apartment with breathtaking sea views and high-end finishes in the heart of Mumbai's most prestigious neighborhood.",
        lat: 19.055, lon: 72.845
    },
    {
        id: 2, location: "Bengaluru", type: "Villa", price: 48000000, beds: 5, baths: 4, sqft: 4500,
        address: "5, Green Valley, Sarjapur Road, Bengaluru", image: "https://www.prestigesraintreepark.info/images/prestige/prestige-luxury-villa-projects-in-bangalore.webp", status: "Open House",
        description: "An exquisite modern villa with a private garden and swimming pool, perfect for a family seeking tranquility in Bengaluru's tech corridor.",
        lat: 12.915, lon: 77.671
    },
    {
        id: 3, location: "Delhi", type: "Bungalow", price: 55000000, beds: 6, baths: 5, sqft: 6000,
        address: "B-27, Defence Colony, New Delhi", image: "https://assets.architecturaldigest.in/photos/6008380951daf9662c148f37/16:9/w_1920,c_limit/dada-partners-architecture-project-caryota-house-main-1366x768.jpg", status: "For Sale",
        description: "A grand bungalow with classic architecture and a sprawling lawn in one of Delhi's most sought-after and secure localities.",
        lat: 28.568, lon: 77.242
    },
    {
        id: 4, location: "Pune", type: "Apartment", price: 9500000, beds: 2, baths: 2, sqft: 1100,
        address: "401, Sapphire Residences, Hinjawadi, Pune", image: "https://www.adanirealty.com/-/media/project/realty/residential/pune/atelier-greens/carousel-images/thumbnail-image/1.ashx", status: "For Rent",
        description: "A cozy 2BHK apartment ideal for young professionals, offering modern amenities and a vibrant community life near the city's IT hub.",
        lat: 18.591, lon: 73.743
    },
    {
        id: 5, location: "Jaipur", type: "Farmhouse", price: 32000000, beds: 4, baths: 4, sqft: 5000,
        address: "Jaipur-Ajmer Highway, Near Mahindra World City, Jaipur", image: "https://d24l7ypac8dw56.cloudfront.net/MenuImages/IMG20221104WA0003-91827-98911.jpg", status: "For Sale",
        description: "A serene farmhouse retreat with a large plot, surrounded by nature, perfect for weekend getaways and peaceful living away from the city bustle.",
        lat: 26.839, lon: 75.766
    },
    {
        id: 6, location: "Hyderabad", type: "Penthouse", price: 38000000, beds: 4, baths: 4, sqft: 3500,
        address: "1501, The Icon, Gachibowli, Hyderabad", image: "https://img.waa2.com/2025-05-15/68257e12b05e5.jpeg?_gl=1*y777n4*_ga*MTEzNTU2NDEyNC4xNzU0MzAxNjY3*_ga_VJ258E9TJJ*czE3NTQzMDE2NjckbzEkZzEkdDE3NTQzMDE2OTEkajM2JGwwJGgw", status: "For Sale",
        description: "An exclusive penthouse with a private terrace and panoramic city views, representing the pinnacle of luxury in Hyderabad's financial district.",
        lat: 17.447, lon: 78.384
    }
];

const allAgents = [
    {
        id: 1, name: "Priya Sharma", specialty: "Luxury Properties, Mumbai", phone: "+91 9876543210", email: "priya.sharma@bp.com",
        image: "https://placehold.co/100x100/1a1a1a/ffffff?text=PS"

    },
    {
        id: 2, name: "Sanjay Gupta", specialty: "Tech Hub Homes, Bengaluru", phone: "+91 9988776655", email: "sanjay.gupta@bp.com",
        image: "https://placehold.co/100x100/1a1a1a/ffffff?text=SG"
    },
    {
        id: 3, name: "Fatima Khan", specialty: "Historic Properties, Delhi", phone: "+91 9123456789", email: "fatima.khan@bp.com",
        image: "https://placehold.co/100x100/1a1a1a/ffffff?text=FK"
    }
];


function formatPrice(price) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    });
    return formatter.format(price);
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
}


function renderProperties(properties) {
    const listingsContainer = document.getElementById('property-listings');
    listingsContainer.innerHTML = '';
    properties.forEach(property => {
        const propertyCard = `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:-translate-y-1 hover:shadow-xl">
                        <img src="${property.image}" onerror="this.onerror=null; this.src='https://placehold.co/600x400/1a1a1a/ffffff?text=${property.location.replace(' ', '+')}+${property.type}';" alt="${property.beds}BHK ${property.type} in ${property.location}" class="w-full h-48 object-cover">
                        <div class="p-6">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-sm font-semibold text-gray-500">${property.location}</span>
                                <span class="text-xs px-2 py-1 rounded-full text-white ${property.status === 'For Sale' ? 'bg-gray-800' : 'bg-blue-600'}">${property.status}</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 truncate">${property.address}</h3>
                            <p class="mt-2 text-3xl font-extrabold text-gray-800">${formatPrice(property.price)}</p>
                            <div class="mt-4 flex items-center text-gray-600 space-x-4">
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-bed"></i>
                                    <span>${property.beds} Beds</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-bath"></i>
                                    <span>${property.baths} Baths</span>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <i class="fas fa-ruler-combined"></i>
                                    <span>${property.sqft} sqft</span>
                                </div>
                            </div>
                            <div class="mt-6 flex space-x-4">
                                <button data-property-id="${property.id}" class="view-property-btn w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150">
                                    View Property
                                </button>
                                <button data-property-id="${property.id}" class="contact-agent-btn w-full px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition duration-150">
                                    Contact Agent
                                </button>
                            </div>
                        </div>
                    </div>
                `;
        listingsContainer.innerHTML += propertyCard;
    });
}

function renderPropertyDetails(property) {
    const modalContent = document.getElementById('propertyDetailsContent');
    modalContent.innerHTML = `
                <img src="${property.image}" onerror="this.onerror=null; this.src='https://placehold.co/800x600/1a1a1a/ffffff?text=${property.location.replace(' ', '+')}+${property.type}';" alt="${property.beds}BHK ${property.type}" class="w-full h-64 object-cover rounded-lg mb-6">
                <h3 class="text-3xl font-bold text-gray-900 mb-2">${property.address}</h3>
                <p class="text-4xl font-extrabold text-gray-800 mb-4">${formatPrice(property.price)}</p>
                <div class="flex items-center text-gray-600 space-x-6 mb-6">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-bed"></i>
                        <span>${property.beds} Beds</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-bath"></i>
                        <span>${property.baths} Baths</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${property.sqft} sqft</span>
                    </div>
                </div>
                <p class="text-gray-700 leading-relaxed mb-6">${property.description}</p>
                <div class="bg-gray-100 p-4 rounded-lg">
                    <h4 class="font-bold text-gray-900 mb-2">Key Features:</h4>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        <li>${property.type} in ${property.location}</li>
                        <li>Status: ${property.status}</li>
                        <li>Address: ${property.address}</li>
                        <li>Exclusive Listing</li>
                    </ul>
                </div>
                <button data-property-id="${property.id}" class="contact-agent-btn mt-6 w-full px-4 py-3 bg-gray-900 text-white rounded-md text-lg font-medium hover:bg-gray-800 transition duration-150">
                    Contact Agent
                </button>
            `;
    showModal('propertyDetailsModal');
}

function renderAgents(agents) {
    const listingsContainer = document.getElementById('agent-listings');
    listingsContainer.innerHTML = '';
    agents.forEach(agent => {
        const agentCard = `
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 text-center transition transform hover:-translate-y-1 hover:shadow-xl">
                        <img src="${agent.image}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/1a1a1a/ffffff?text=${agent.name.split(' ').map(n => n[0]).join('')}';" alt="Agent ${agent.name}" class="w-24 h-24 rounded-full object-cover mb-4">
                        <h3 class="text-xl font-bold text-gray-900">${agent.name}</h3>
                        <p class="text-sm text-gray-500 font-medium mb-4">${agent.specialty}</p>
                        <button data-agent-id="${agent.id}" class="contact-agent-details-btn px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition duration-150">
                            Contact Agent
                        </button>
                    </div>
                `;
        listingsContainer.innerHTML += agentCard;
    });
}

function renderAgentDetails(agent) {
    const modalContent = document.getElementById('agentDetailsContent');
    modalContent.innerHTML = `
                <img src="${agent.image}" onerror="this.onerror=null; this.src='https://placehold.co/100x100/1a1a1a/ffffff?text=${agent.name.split(' ').map(n => n[0]).join('')}';" alt="Agent ${agent.name}" class="w-24 h-24 rounded-full object-cover mb-4 mx-auto">
                <h3 class="text-2xl font-bold text-gray-900">${agent.name}</h3>
                <p class="text-lg text-gray-600 mb-4">${agent.specialty}</p>
                <div class="space-y-2 text-left">
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-envelope text-gray-500"></i>
                        <a href="mailto:${agent.email}" class="text-gray-700 hover:text-gray-900 transition underline">${agent.email}</a>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-phone-alt text-gray-500"></i>
                        <a href="tel:${agent.phone}" class="text-gray-700 hover:text-gray-900 transition underline">${agent.phone}</a>
                    </div>
                </div>
            `;
    showModal('agentDetailsModal');
}

function filterProperties() {
    const location = document.getElementById('locationFilter').value;
    const propertyType = document.getElementById('propertyTypeFilter').value;
    const priceRange = document.getElementById('priceRangeFilter').value;

    const filtered = allProperties.filter(p => {
        const locationMatch = location === 'All' || p.location === location;
        const typeMatch = propertyType === 'All' || p.type === propertyType;

        let priceMatch = false;
        switch (priceRange) {
            case 'All':
                priceMatch = true;
                break;
            case 'under_1Cr':
                priceMatch = p.price < 10000000;
                break;
            case '1Cr_to_5Cr':
                priceMatch = p.price >= 10000000 && p.price <= 50000000;
                break;
            case 'over_5Cr':
                priceMatch = p.price > 50000000;
                break;
        }

        return locationMatch && typeMatch && priceMatch;
    });
    renderProperties(filtered);
}

function initMap() {
    const map = L.map('map').setView([20.5937, 78.9629], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = [];

    allProperties.forEach(property => {
        const marker = L.marker([property.lat, property.lon]).addTo(map);
        marker.bindPopup(`
                    <div class="p-2">
                        <h4 class="font-bold text-gray-900">${property.address}</h4>
                        <p class="text-sm text-gray-600">${formatPrice(property.price)}</p>
                        <p class="text-xs text-gray-500">${property.type} in ${property.location}</p>
                    </div>
                `);
        markers.push({ marker: marker, property: property });
    });

    const mapFilterButtons = document.querySelectorAll('#map-container button');
    mapFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;

            mapFilterButtons.forEach(btn => {
                if (btn.dataset.filter === filterType) {
                    btn.classList.add('bg-gray-900', 'text-white');
                    btn.classList.remove('bg-white', 'text-gray-800', 'border-gray-300');
                } else {
                    btn.classList.remove('bg-gray-900', 'text-white');
                    btn.classList.add('bg-white', 'text-gray-800', 'border-gray-300');
                }
            });

            markers.forEach(({ marker, property }) => {
                if (filterType === 'All' || property.type === filterType) {
                    marker.setOpacity(1);
                } else {
                    marker.setOpacity(0);
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProperties(allProperties.slice(0, 3));
    renderAgents(allAgents);
    initMap();

    document.getElementById('property-listings').addEventListener('click', (e) => {
        if (e.target.classList.contains('view-property-btn')) {
            const propertyId = parseInt(e.target.dataset.propertyId);
            const property = allProperties.find(p => p.id === propertyId);
            if (property) {
                renderPropertyDetails(property);
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('contact-agent-btn')) {
            const propertyId = parseInt(e.target.dataset.propertyId);
            const property = allProperties.find(p => p.id === propertyId);
            if (property) {
                const agent = allAgents.find(a => a.specialty.includes(property.location));
                if (agent) {
                    renderAgentDetails(agent);
                } else {
                    renderAgentDetails(allAgents[0]);
                }
            }
            hideModal('propertyDetailsModal');
        }
    });

    document.getElementById('agent-listings').addEventListener('click', (e) => {
        if (e.target.classList.contains('contact-agent-details-btn')) {
            const agentId = parseInt(e.target.dataset.agentId);
            const agent = allAgents.find(a => a.id === agentId);
            if (agent) {
                renderAgentDetails(agent);
            }
        }
    });

    document.getElementById('viewAllPropertiesBtn').addEventListener('click', () => {
        renderProperties(allProperties);
    });

    document.getElementById('search-properties-button').addEventListener('click', filterProperties);

    const authButton = document.getElementById('authButton');
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    authButton.addEventListener('click', () => showModal('authModal'));
    closeAuthModal.addEventListener('click', () => hideModal('authModal'));

    const showRegisterLink = document.getElementById('showRegisterLink');
    const showLoginLink = document.getElementById('showLoginLink');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const modalTitle = document.getElementById('modalTitle');

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        modalTitle.textContent = 'Create Account';
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        modalTitle.textContent = 'Sign In';
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    });

    document.getElementById('closePropertyDetailsModal').addEventListener('click', () => hideModal('propertyDetailsModal'));
    document.getElementById('closeAgentDetailsModal').addEventListener('click', () => hideModal('agentDetailsModal'));

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal-overlay')) {
                hideModal(modal.id);
            }
        });
    });

    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'Please enter both email and password.';
            successMessage.classList.add('hidden');
            return;
        }

        const user = registeredUsers.find(user => user.email === email && user.password === password);

        if (user) {
            isLoggedIn = true;
            authButton.textContent = 'Sign Out';
            hideModal('authModal');
            successMessage.classList.remove('hidden');
            successMessage.querySelector('p:last-child').textContent = 'You have successfully signed in!';
            errorMessage.classList.add('hidden');

            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);

        } else {
            isLoggedIn = false;
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'Invalid email or password.';
            successMessage.classList.add('hidden');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('registerName').value;
        const regEmail = document.getElementById('registerEmail').value;
        const regPassword = document.getElementById('registerPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        if (!fullName || !regEmail || !regPassword || !confirmPass) {
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'All fields are required for registration.';
            successMessage.classList.add('hidden');
            return;
        }

        if (regPassword !== confirmPass) {
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'Passwords do not match.';
            successMessage.classList.add('hidden');
            return;
        }

        if (registeredUsers.some(user => user.email === regEmail)) {
            errorMessage.classList.remove('hidden');
            errorText.textContent = 'An account with this email already exists. Please sign in.';
            successMessage.classList.add('hidden');
            return;
        }


        registeredUsers.push({ fullName: fullName, email: regEmail, password: regPassword });
        console.log('Registered user:', { fullName, regEmail, regPassword });
        console.log('All registered users:', registeredUsers);

        successMessage.classList.remove('hidden');
        successMessage.querySelector('p:last-child').textContent = 'Account created successfully. Please sign in.';
        errorMessage.classList.add('hidden');

        document.getElementById('registerName').value = '';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('confirmPassword').value = '';

        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        modalTitle.textContent = 'Sign In';

        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 3000);
    });

    authButton.addEventListener('click', () => {
        if (isLoggedIn) {
            isLoggedIn = false;
            authButton.textContent = 'Sign In';
            alert('You have been signed out.');
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');
        } else {
            showModal('authModal');
        }
    });
});
