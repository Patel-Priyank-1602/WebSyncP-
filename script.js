let categories = [
    {
        id: 'social-media',
        name: 'Social Media',
        websites: [
            { id: 'social-1', name: 'Twitter', url: 'https://twitter.com' },
            { id: 'social-2', name: 'Instagram', url: 'https://instagram.com' },
            { id: 'social-3', name: 'Facebook', url: 'https://facebook.com' },
            { id: 'social-4', name: 'LinkedIn', url: 'https://linkedin.com' }
        ]
    },
    {
        id: 'ai-tools',
        name: 'AI Tools',
        websites: [
            { id: 'ai-1', name: 'ChatGPT', url: 'https://chat.openai.com' },
            { id: 'ai-2', name: 'Claude', url: 'https://claude.ai' },
            { id: 'ai-3', name: 'Midjourney', url: 'https://midjourney.com' },
            { id: 'ai-4', name: 'Hugging Face', url: 'https://huggingface.co' }
        ]
    },
    {
        id: 'movies',
        name: 'Movies',
        websites: [
            { id: 'movie-1', name: 'Netflix', url: 'https://netflix.com' },
            { id: 'movie-2', name: 'Amazon Prime', url: 'https://primevideo.com' },
            { id: 'movie-3', name: 'Disney+', url: 'https://disneyplus.com' },
            { id: 'movie-4', name: 'HBO Max', url: 'https://hbomax.com' }
        ]
    },
    {
        id: 'mail',
        name: 'Mail',
        websites: [
            { id: 'mail-1', name: 'Gmail', url: 'https://mail.google.com' },
            { id: 'mail-2', name: 'Outlook', url: 'https://outlook.com' },
            { id: 'mail-3', name: 'ProtonMail', url: 'https://proton.me' },
            { id: 'mail-4', name: 'Yahoo Mail', url: 'https://mail.yahoo.com' }
        ]
    },
    {
        id: 'drive',
        name: 'Cloud Storage',
        websites: [
            { id: 'drive-1', name: 'Google Drive', url: 'https://drive.google.com' },
            { id: 'drive-2', name: 'Dropbox', url: 'https://dropbox.com' },
            { id: 'drive-3', name: 'OneDrive', url: 'https://onedrive.live.com' },
            { id: 'drive-4', name: 'iCloud', url: 'https://icloud.com' }
        ]
    },
    {
        id: 'others',
        name: 'Others',
        websites: [
            { id: 'other-1', name: 'YouTube', url: 'https://youtube.com' },
            { id: 'other-2', name: 'GitHub', url: 'https://github.com' },
            { id: 'other-3', name: 'Reddit', url: 'https://reddit.com' },
            { id: 'other-4', name: 'Wikipedia', url: 'https://wikipedia.org' }
        ]
    }
];

const categoriesContainer = document.getElementById('categories');
const searchInput = document.getElementById('searchInput');
const addWebsiteModal = document.getElementById('addWebsiteModal');
const addCategoryModal = document.getElementById('addCategoryModal');
const editWebsiteModal = document.getElementById('editWebsiteModal');
const editCategoryModal = document.getElementById('editCategoryModal');
const notification = document.getElementById('notification');
const closeAddWebsiteModal = document.getElementById('closeAddWebsiteModal');
const closeAddCategoryModal = document.getElementById('closeAddCategoryModal');
const closeEditWebsiteModal = document.getElementById('closeEditWebsiteModal');
const closeEditCategoryModal = document.getElementById('closeEditCategoryModal');
const addWebsiteForm = document.getElementById('addWebsiteForm');
const addCategoryForm = document.getElementById('addCategoryForm');
const editWebsiteForm = document.getElementById('editWebsiteForm');
const editCategoryForm = document.getElementById('editCategoryForm');
const websiteCategorySelect = document.getElementById('websiteCategory');
const editWebsiteCategorySelect = document.getElementById('editWebsiteCategory');
const currentCategoryIdInput = document.getElementById('currentCategoryId');
const cancelAddWebsite = document.getElementById('cancelAddWebsite');
const cancelAddCategory = document.getElementById('cancelAddCategory');
const cancelEditWebsite = document.getElementById('cancelEditWebsite');
const cancelEditCategory = document.getElementById('cancelEditCategory');
const googleSearchForm = document.getElementById('googleSearchForm');

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('themeSwitch');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitch.checked = true;
    }

    // Theme switch event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    initializeData();
});

function showNotification(message, type = 'success') {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function initializeData() {
    const storedData = localStorage.getItem('webHubData');
    if (storedData) {
        categories = JSON.parse(storedData);
    }
    renderCategories();
    populateCategorySelect();
    setupDragAndDrop();
}

function saveData() {
    try {
        localStorage.setItem('webHubData', JSON.stringify(categories));
    } catch (error) {
        showNotification('Failed to save data', 'error');
        console.error('Save error:', error);
    }
}

function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch (error) {
        return null;
    }
}

function renderCategories() {
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const delayFactor = categories.indexOf(category) * 0.1;
        renderCategory(category, delayFactor);
    });
    const addCategoryElement = document.createElement('div');
    addCategoryElement.className = 'add-category';
    addCategoryElement.style.animationDelay = `${(categories.length + 1) * 0.1}s`;
    addCategoryElement.innerHTML = `
        <i class="fas fa-plus"></i>
        <span>Add New Category</span>
    `;
    addCategoryElement.addEventListener('click', () => openAddCategoryModal());
    categoriesContainer.appendChild(addCategoryElement);
}

function renderCategory(category, delayFactor = 0) {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'category';
    categoryElement.dataset.id = category.id;
    categoryElement.draggable = true;
    categoryElement.style.animationDelay = `${delayFactor}s`;

    categoryElement.innerHTML = `
        <div class="tooltip">${category.websites.length} websites</div>
        <div class="category-header">
            <h3 class="category-title">${category.name}</h3>
            <div class="category-actions">
                <button class="move-up" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="move-down" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="edit-category" title="Edit Category"><i class="fas fa-edit"></i></button>
                <button class="delete-category" title="Delete Category"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="websites" data-category-id="${category.id}">
            ${renderWebsites(category.websites, category.id)}
        </div>
        <div class="add-website" data-category="${category.id}">
            <i class="fas fa-plus"></i>
            <span>Add Website</span>
        </div>
    `;

    categoriesContainer.appendChild(categoryElement);
}

function renderWebsites(websites, categoryId) {
    if (websites.length === 0) {
        return '<div class="no-websites">No websites added yet</div>';
    }

    return websites.map((website, index) => {
        const faviconUrl = getFaviconUrl(website.url);
        const iconContent = faviconUrl ?
            `<img src="${faviconUrl}" alt="${website.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<i class=\'fas fa-globe\'></i>';">` :
            `<i class="fas fa-globe"></i>`;

        return `
            <div class="website" data-id="${website.id}" data-category="${categoryId}" style="animation-delay: ${index * 0.05}s">
                <div class="website-icon">
                    ${iconContent}
                </div>
                <a href="${website.url}" class="website-link" target="_blank" title="${website.url}">
                    ${website.name}
                </a>
                <div class="website-actions">
                    <button class="move-up" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                    <button class="move-down" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                    <button class="edit-website" title="Edit Website"><i class="fas fa-edit"></i></button>
                    <button class="delete-website" title="Delete Website"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

function setupDragAndDrop() {
    const categoryElements = document.querySelectorAll('.category');

    categoryElements.forEach(category => {
        category.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', category.dataset.id);
            category.classList.add('dragging');
        });

        category.addEventListener('dragend', () => {
            category.classList.remove('dragging');
        });

        category.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        category.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text/plain');
            const targetId = category.dataset.id;

            if (draggedId !== targetId) {
                const draggedIndex = categories.findIndex(cat => cat.id === draggedId);
                const targetIndex = categories.findIndex(cat => cat.id === targetId);

                const [draggedCategory] = categories.splice(draggedIndex, 1);
                categories.splice(targetIndex, 0, draggedCategory);

                saveData();
                renderCategories();
                setupDragAndDrop();
                showNotification('Category reordered');
            }
        });
    });

    categoriesContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
}

function populateCategorySelect() {
    websiteCategorySelect.innerHTML = '';
    editWebsiteCategorySelect.innerHTML = '';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        websiteCategorySelect.appendChild(option);

        const editOption = document.createElement('option');
        editOption.value = category.id;
        editOption.textContent = category.name;
        editWebsiteCategorySelect.appendChild(editOption);
    });
}

function openAddWebsiteModal(categoryId = null) {
    if (categoryId) {
        currentCategoryIdInput.value = categoryId;
        websiteCategorySelect.value = categoryId;
    } else {
        currentCategoryIdInput.value = '';
    }
    addWebsiteForm.reset();
    addWebsiteModal.classList.add('active');
}

function openAddCategoryModal() {
    addCategoryForm.reset();
    addCategoryModal.classList.add('active');
}

function openEditWebsiteModal(categoryId, websiteId) {
    const category = categories.find(cat => cat.id === categoryId);
    const website = category.websites.find(web => web.id === websiteId);

    document.getElementById('editWebsiteName').value = website.name;
    document.getElementById('editWebsiteUrl').value = website.url;
    document.getElementById('editWebsiteId').value = websiteId;
    document.getElementById('editWebsiteCategoryId').value = categoryId;

    editWebsiteCategorySelect.value = categoryId;
    editWebsiteModal.classList.add('active');
}

function openEditCategoryModal(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    document.getElementById('editCategoryName').value = category.name;
    document.getElementById('editCategoryId').value = categoryId;
    editCategoryModal.classList.add('active');
}

function closeModals() {
    addWebsiteModal.classList.remove('active');
    addCategoryModal.classList.remove('active');
    editWebsiteModal.classList.remove('active');
    editCategoryModal.classList.remove('active');
}

function addWebsite(name, url, categoryId) {
    try {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) throw new Error('Category not found');

        if (!name || !url) throw new Error('Name and URL are required');

        const newWebsite = {
            id: `website-${Date.now()}`,
            name: name.trim(),
            url: url.startsWith('http') ? url : `https://${url}`
        };

        category.websites.push(newWebsite);
        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Website added successfully');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function deleteWebsite(categoryId, websiteId) {
    if (confirm('Are you sure you want to delete this website?')) {
        try {
            const category = categories.find(cat => cat.id === categoryId);
            if (!category) throw new Error('Category not found');

            category.websites = category.websites.filter(website => website.id !== websiteId);
            saveData();
            renderCategories();
            setupDragAndDrop();
            showNotification('Website deleted successfully');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
}

function editWebsite(websiteId, categoryId, newName, newUrl, newCategoryId) {
    try {
        const oldCategory = categories.find(cat => cat.id === categoryId);
        const website = oldCategory.websites.find(web => web.id === websiteId);

        if (!website) throw new Error('Website not found');

        website.name = newName.trim();
        website.url = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;

        if (categoryId !== newCategoryId) {
            oldCategory.websites = oldCategory.websites.filter(web => web.id !== websiteId);
            const newCategory = categories.find(cat => cat.id === newCategoryId);
            newCategory.websites.push(website);
        }

        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Website updated successfully');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function addCategory(name) {
    try {
        if (!name) throw new Error('Category name is required');
        if (categories.some(cat => cat.name.toLowerCase() === name.toLowerCase())) {
            throw new Error('Category already exists');
        }

        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const newCategory = {
            id: `${id}-${Date.now()}`,
            name: name.trim(),
            websites: []
        };

        categories.push(newCategory);
        saveData();
        renderCategories();
        populateCategorySelect();
        setupDragAndDrop();
        showNotification('Category added successfully');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function editCategory(categoryId, newName) {
    try {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) throw new Error('Category not found');

        if (categories.some(cat => cat.id !== categoryId && cat.name.toLowerCase() === newName.toLowerCase())) {
            throw new Error('Category name already exists');
        }

        category.name = newName.trim();
        saveData();
        renderCategories();
        populateCategorySelect();
        setupDragAndDrop();
        showNotification('Category updated successfully');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category and all its websites?')) {
        try {
            categories = categories.filter(category => category.id !== categoryId);
            saveData();
            renderCategories();
            populateCategorySelect();
            setupDragAndDrop();
            showNotification('Category deleted successfully');
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
}

function moveCategoryUp(categoryId) {
    try {
        const index = categories.findIndex(cat => cat.id === categoryId);
        if (index <= 0) return;

        [categories[index - 1], categories[index]] = [categories[index], categories[index - 1]];
        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Category moved up');
    } catch (error) {
        showNotification('Failed to move category', 'error');
    }
}

function moveCategoryDown(categoryId) {
    try {
        const index = categories.findIndex(cat => cat.id === categoryId);
        if (index === -1 || index >= categories.length - 1) return;

        [categories[index], categories[index + 1]] = [categories[index + 1], categories[index]];
        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Category moved down');
    } catch (error) {
        showNotification('Failed to move category', 'error');
    }
}

function moveWebsiteUp(categoryId, websiteId) {
    try {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) throw new Error('Category not found');

        const index = category.websites.findIndex(website => website.id === websiteId);
        if (index <= 0) return;

        [category.websites[index - 1], category.websites[index]] =
            [category.websites[index], category.websites[index - 1]];
        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Website moved up');
    } catch (error) {
        showNotification('Failed to move website', 'error');
    }
}

function moveWebsiteDown(categoryId, websiteId) {
    try {
        const category = categories.find(cat => cat.id === categoryId);
        if (!category) throw new Error('Category not found');

        const index = category.websites.findIndex(website => website.id === websiteId);
        if (index === -1 || index >= category.websites.length - 1) return;

        [category.websites[index], category.websites[index + 1]] =
            [category.websites[index + 1], category.websites[index]];
        saveData();
        renderCategories();
        setupDragAndDrop();
        showNotification('Website moved down');
    } catch (error) {
        showNotification('Failed to move website', 'error');
    }
}

function searchWebsites(query) {
    if (!query) {
        renderCategories();
        setupDragAndDrop();
        return;
    }

    const lowerQuery = query.toLowerCase();
    const filteredCategories = categories
        .map(category => {
            // Check if category name matches
            const categoryMatch = category.name.toLowerCase().includes(lowerQuery);
            
            // Filter websites within category
            const filteredWebsites = category.websites.filter(website =>
                website.name.toLowerCase().includes(lowerQuery) ||
                website.url.toLowerCase().includes(lowerQuery)
            );

            // Return category if either the category name matches or there are matching websites
            if (categoryMatch || filteredWebsites.length > 0) {
                return {
                    ...category,
                    websites: categoryMatch ? category.websites : filteredWebsites
                };
            }
            return null;
        })
        .filter(category => category !== null);

    categoriesContainer.innerHTML = '';
    if (filteredCategories.length === 0) {
        categoriesContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No categories or websites found matching "${query}"</p>
            </div>
        `;
        return;
    }

    filteredCategories.forEach(category => renderCategory(category));
    setupDragAndDrop();
}

// Event Listeners
searchInput.addEventListener('input', e => searchWebsites(e.target.value));
closeAddWebsiteModal.addEventListener('click', closeModals);
closeAddCategoryModal.addEventListener('click', closeModals);
closeEditWebsiteModal.addEventListener('click', closeModals);
closeEditCategoryModal.addEventListener('click', closeModals);
cancelAddWebsite.addEventListener('click', closeModals);
cancelAddCategory.addEventListener('click', closeModals);
cancelEditWebsite.addEventListener('click', closeModals);
cancelEditCategory.addEventListener('click', closeModals);

addWebsiteForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('websiteName').value;
    const url = document.getElementById('websiteUrl').value;
    const categoryId = document.getElementById('websiteCategory').value;
    addWebsite(name, url, categoryId);
    closeModals();
});

addCategoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('categoryName').value;
    addCategory(name);
    closeModals();
});

editWebsiteForm.addEventListener('submit', e => {
    e.preventDefault();
    const websiteId = document.getElementById('editWebsiteId').value;
    const categoryId = document.getElementById('editWebsiteCategoryId').value;
    const name = document.getElementById('editWebsiteName').value;
    const url = document.getElementById('editWebsiteUrl').value;
    const newCategoryId = document.getElementById('editWebsiteCategory').value;
    editWebsite(websiteId, categoryId, name, url, newCategoryId);
    closeModals();
});

editCategoryForm.addEventListener('submit', e => {
    e.preventDefault();
    const categoryId = document.getElementById('editCategoryId').value;
    const name = document.getElementById('editCategoryName').value;
    editCategory(categoryId, name);
    closeModals();
});

window.addEventListener('click', e => {
    if (e.target === addWebsiteModal ||
        e.target === addCategoryModal ||
        e.target === editWebsiteModal ||
        e.target === editCategoryModal) {
        closeModals();
    }
});

categoriesContainer.addEventListener('click', (e) => {
    const categoryElement = e.target.closest('.category');
    const websiteElement = e.target.closest('.website');
    const categoryId = categoryElement?.dataset.id;

    if (e.target.closest('.move-up') && !websiteElement) {
        moveCategoryUp(categoryId);
    }
    if (e.target.closest('.move-down') && !websiteElement) {
        moveCategoryDown(categoryId);
    }
    if (e.target.closest('.delete-category')) {
        deleteCategory(categoryId);
    }
    if (e.target.closest('.edit-category')) {
        openEditCategoryModal(categoryId);
    }
    if (e.target.closest('.add-website')) {
        openAddWebsiteModal(categoryId);
    }

    if (websiteElement) {
        const websiteId = websiteElement.dataset.id;
        const websiteCategoryId = websiteElement.dataset.category;

        if (e.target.closest('.move-up')) {
            moveWebsiteUp(websiteCategoryId, websiteId);
        }
        if (e.target.closest('.move-down')) {
            moveWebsiteDown(websiteCategoryId, websiteId);
        }
        if (e.target.closest('.delete-website')) {
            deleteWebsite(websiteCategoryId, websiteId);
        }
        if (e.target.closest('.edit-website')) {
            openEditWebsiteModal(websiteCategoryId, websiteId);
        }
    }
});