let categories = [
  {
    id: "social-media",
    name: "Social Media",
    websites: [
      { id: "social-1", name: "Twitter", url: "https://twitter.com" },
      { id: "social-2", name: "Instagram", url: "https://instagram.com" },
      { id: "social-3", name: "Facebook", url: "https://facebook.com" },
      { id: "social-4", name: "LinkedIn", url: "https://linkedin.com" },
    ],
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    websites: [
      { id: "ai-1", name: "ChatGPT", url: "https://chat.openai.com" },
      { id: "ai-2", name: "Claude", url: "https://claude.ai" },
      { id: "ai-3", name: "Midjourney", url: "https://midjourney.com" },
      { id: "ai-4", name: "Hugging Face", url: "https://huggingface.co" },
    ],
  },
  {
    id: "movies",
    name: "Movies",
    websites: [
      { id: "movie-1", name: "Netflix", url: "https://netflix.com" },
      { id: "movie-2", name: "Amazon Prime", url: "https://primevideo.com" },
      { id: "movie-3", name: "Disney+", url: "https://disneyplus.com" },
      { id: "movie-4", name: "HBO Max", url: "https://hbomax.com" },
    ],
  },
  {
    id: "mail",
    name: "Mail",
    websites: [
      { id: "mail-1", name: "Gmail", url: "https://mail.google.com" },
      { id: "mail-2", name: "Outlook", url: "https://outlook.com" },
      { id: "mail-3", name: "ProtonMail", url: "https://proton.me" },
      { id: "mail-4", name: "Yahoo Mail", url: "https://mail.yahoo.com" },
    ],
  },
  {
    id: "drive",
    name: "Cloud Storage",
    websites: [
      { id: "drive-1", name: "Google Drive", url: "https://drive.google.com" },
      { id: "drive-2", name: "Dropbox", url: "https://dropbox.com" },
      { id: "drive-3", name: "OneDrive", url: "https://onedrive.live.com" },
      { id: "drive-4", name: "iCloud", url: "https://icloud.com" },
    ],
  },
  {
    id: "others",
    name: "Others",
    websites: [
      { id: "other-1", name: "YouTube", url: "https://youtube.com" },
      { id: "other-2", name: "GitHub", url: "https://github.com" },
      { id: "other-3", name: "Reddit", url: "https://reddit.com" },
      { id: "other-4", name: "Wikipedia", url: "https://wikipedia.org" },
    ],
  },
];

const categoriesContainer = document.getElementById("categories");
const gridView = document.getElementById("gridView");
const searchInput = document.getElementById("searchInput");
const addWebsiteModal = document.getElementById("addWebsiteModal");
const addCategoryModal = document.getElementById("addCategoryModal");
const editWebsiteModal = document.getElementById("editWebsiteModal");
const editCategoryModal = document.getElementById("editCategoryModal");
const notification = document.getElementById("notification");
const closeAddWebsiteModal = document.getElementById("closeAddWebsiteModal");
const closeAddCategoryModal = document.getElementById("closeAddCategoryModal");
const closeEditWebsiteModal = document.getElementById("closeEditWebsiteModal");
const closeEditCategoryModal = document.getElementById("closeEditCategoryModal");
const addWebsiteForm = document.getElementById("addWebsiteForm");
const addCategoryForm = document.getElementById("addCategoryForm");
const editWebsiteForm = document.getElementById("editWebsiteForm");
const editCategoryForm = document.getElementById("editCategoryForm");
const websiteCategorySelect = document.getElementById("websiteCategory");
const editWebsiteCategorySelect = document.getElementById("editWebsiteCategory");
const currentCategoryIdInput = document.getElementById("currentCategoryId");
const cancelAddWebsite = document.getElementById("cancelAddWebsite");
const cancelAddCategory = document.getElementById("cancelAddCategory");
const cancelEditWebsite = document.getElementById("cancelEditWebsite");
const cancelEditCategory = document.getElementById("cancelEditCategory");
const saveEditWebsite = document.getElementById("saveEditWebsite");
const googleSearchForm = document.getElementById("googleSearchForm");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const contextMenu = document.getElementById("contextMenu");
const backgroundToggleBtn = document.getElementById("backgroundToggleBtn");
const backgroundModal = document.getElementById("backgroundModal");
const closeBackgroundModal = document.getElementById("closeBackgroundModal");
const cancelBackground = document.getElementById("cancelBackground");
const applyBackground = document.getElementById("applyBackground");
const removeBackground = document.getElementById("removeBackground");
const backgroundUrl = document.getElementById("backgroundUrl");
const backgroundFile = document.getElementById("backgroundFile");
const backgroundOpacity = document.getElementById("backgroundOpacity");
const opacityValue = document.getElementById("opacityValue");
const addWebsiteGrid = document.getElementById("addWebsiteGrid");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const imageInsertModal = document.getElementById("imageInsertModal");
const closeImageInsertModal = document.getElementById("closeImageInsertModal");
const cancelImageInsert = document.getElementById("cancelImageInsert");
const applyCustomImage = document.getElementById("applyCustomImage");
const resetWebsiteImage = document.getElementById("resetWebsiteImage");
const selectWebsite = document.getElementById("selectWebsite");
const customImageUrl = document.getElementById("customImageUrl");
const customImageFile = document.getElementById("customImageFile");
const backgroundToggleContainer = document.getElementById("backgroundToggleContainer");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const rightMenu = document.getElementById("rightMenu");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");
const backgroundMenuItem = document.getElementById("backgroundMenuItem");
const themeText = document.getElementById("themeText");
const viewText = document.getElementById("viewText");
const customizeImageBtn = document.getElementById("customizeImageBtn");
const sharingModal = document.getElementById("sharingModal");
const closeSharingModal = document.getElementById("closeSharingModal");
const sharingToggleBtn = document.getElementById("sharingToggleBtn");
const copyShareURL = document.getElementById("copyShareURL");
const exportDataBtn = document.getElementById("exportData");
const importDataBtn = document.getElementById("importData");
const importFile = document.getElementById("importFile");
const resetDataBtn = document.getElementById("resetData");

let draggedWebsite = null;
let draggedCategory = null;
let longPressTimer = null;
let longPressActive = false;
let isDragging = false;
let isGridView = false;
let currentContextWebsite = null;
let customImages = {};

document.addEventListener("DOMContentLoaded", () => {
  // Check for shared data in URL first
  loadFromURL();
  
  const currentTheme = localStorage.getItem("theme") || "dark";

  // Set initial theme
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    themeToggleBtn.classList.add("light-mode");
    themeText.textContent = "Light Mode";
  } else {
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    themeText.textContent = "Dark Mode";
  }

  // Load saved view preference
  const savedView = localStorage.getItem("viewMode") || "category";
  if (savedView === "grid") {
    toggleView();
  } else {
    viewText.textContent = "Grid View";
  }

  // Load custom images
  const savedCustomImages = localStorage.getItem("customImages");
  if (savedCustomImages) {
    customImages = JSON.parse(savedCustomImages);
    console.log("Loaded custom images:", customImages);
  }

  initializeData();
});

// Menu Toggle Functionality
menuToggleBtn.addEventListener("click", () => {
  rightMenu.classList.add("active");
  menuOverlay.classList.add("active");
  menuToggleBtn.classList.add("active");
});

closeMenu.addEventListener("click", closeRightMenu);
menuOverlay.addEventListener("click", closeRightMenu);

function closeRightMenu() {
  rightMenu.classList.remove("active");
  menuOverlay.classList.remove("active");
  menuToggleBtn.classList.remove("active");
}

// Theme Toggle Functionality
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");

  if (currentTheme === "light") {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    themeToggleBtn.classList.remove("light-mode");
    themeText.textContent = "Dark Mode";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    themeToggleBtn.classList.add("light-mode");
    themeText.textContent = "Light Mode";
  }
});

// View Toggle Functionality
viewToggleBtn.addEventListener("click", toggleView);

function toggleView() {
  isGridView = !isGridView;

  if (isGridView) {
    categoriesContainer.style.display = "none";
    gridView.style.display = "grid";
    viewToggleBtn.innerHTML = '<i class="fas fa-list"></i><span>Category View</span>';
    viewToggleBtn.classList.add("active");
    backgroundMenuItem.style.display = "block";
    document.body.classList.add("grid-view-active");
    renderGridView();
    localStorage.setItem("viewMode", "grid");
    viewText.textContent = "Category View";
  } else {
    categoriesContainer.style.display = "grid";
    gridView.style.display = "none";
    viewToggleBtn.innerHTML = '<i class="fas fa-th"></i><span>Grid View</span>';
    viewToggleBtn.classList.remove("active");
    backgroundMenuItem.style.display = "none";
    document.body.classList.remove("grid-view-active");
    renderCategories();
    setupDragAndDrop();
    localStorage.setItem("viewMode", "category");
    viewText.textContent = "Grid View";
  }
}

function renderGridView() {
  gridView.innerHTML = "";

  // Create a container for categories to display side by side
  const categoriesRow = document.createElement("div");
  categoriesRow.className = "categories-row";

  // Filter out empty categories
  const validCategories = categories.filter(category => category.websites.length > 0);

  // Create 4 column containers for masonry layout
  const columns = [];
  for (let i = 0; i < 4; i++) {
    const column = document.createElement("div");
    column.className = "category-column";
    columns.push(column);
    categoriesRow.appendChild(column);
  }

  // Distribute categories across columns (round-robin for even distribution)
  validCategories.forEach((category, categoryIndex) => {
    const columnIndex = categoryIndex % 4;

    // Create category section
    const categorySection = document.createElement("div");
    categorySection.className = "grid-category-section";
    categorySection.style.animationDelay = `${categoryIndex * 0.1}s`;

    // Create category header
    const categoryHeader = document.createElement("div");
    categoryHeader.className = "grid-category-header";
    categoryHeader.innerHTML = `
      <h3 class="grid-category-title">${category.name}</h3>
      <span class="grid-category-count">${category.websites.length} websites</span>
    `;
    categorySection.appendChild(categoryHeader);

    // Create category container for websites
    const categoryContainer = document.createElement("div");
    categoryContainer.className = "grid-category-container";
    categoryContainer.dataset.categoryId = category.id;

    // Add websites for this category
    category.websites.forEach((website, websiteIndex) => {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.dataset.id = website.id;
      gridItem.dataset.category = category.id;
      gridItem.dataset.url = website.url;
      gridItem.style.animationDelay = `${categoryIndex * 0.1 + websiteIndex * 0.05}s`;

      const customImageKey = `${category.id}-${website.id}`;
      const customImageSrc = customImages[customImageKey];
      console.log(
        `Grid View: Rendering website ${website.name} (${customImageKey}). Custom image source:`,
        customImageSrc ? "Exists" : "None"
      );

      let iconContent;
      if (customImageSrc) {
        iconContent = `<img src="${customImageSrc}" alt="${website.name}">`;
      } else {
        const faviconUrl = getFaviconUrl(website.url);
        iconContent = faviconUrl
          ? `<img src="${faviconUrl}" alt="${website.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<i class=\'fas fa-globe\'></i>';">`
          : `<i class="fas fa-globe"></i>`;
      }

      gridItem.innerHTML = `
        <div class="grid-item-icon">
          ${iconContent}
        </div>
        <div class="grid-item-name">${website.name}</div>
      `;

      // Add click event to open website
      gridItem.addEventListener("click", (e) => {
        if (!e.defaultPrevented && !longPressActive && !isDragging) {
          window.open(website.url, "_blank");
        }
      });

      // Right-click to open Edit Website Modal
      gridItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const websiteId = website.id;
        const categoryId = category.id;
        console.log(
          "Right-click on grid item. Opening Edit Website Modal for:",
          website.name,
          "ID:",
          websiteId,
          "Category ID:",
          categoryId
        );
        openEditWebsiteModal(categoryId, websiteId);
      });

      // Long press for dragging
      gridItem.addEventListener("mousedown", (e) => {
        if (e.target.closest(".grid-item-icon") || e.target.closest(".grid-item-name")) {
          longPressTimer = setTimeout(() => {
            activateLongPress(gridItem);
          }, 500);
        }
      });

      gridItem.addEventListener("mouseup", (e) => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      gridItem.addEventListener("mouseleave", () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      // Touch events for mobile
      gridItem.addEventListener("touchstart", (e) => {
        if (e.target.closest(".grid-item-icon") || e.target.closest(".grid-item-name")) {
          longPressTimer = setTimeout(() => {
            activateLongPress(gridItem);
          }, 500);
        }
      });

      gridItem.addEventListener("touchend", (e) => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      gridItem.addEventListener("touchcancel", () => {
        if (longPressTimer) {
          clearTimeout(longPressTimer);
          longPressTimer = null;
        }
      });

      // Drag events
      gridItem.addEventListener("dragstart", (e) => {
        if (!longPressActive) {
          e.preventDefault();
          return;
        }
        e.stopPropagation();
        isDragging = true;
        draggedWebsite = {
          id: website.id,
          categoryId: category.id,
        };
        gridItem.classList.add("dragging");
      });

      gridItem.addEventListener("dragend", () => {
        gridItem.classList.remove("dragging");
        gridItem.classList.remove("long-press-active");
        draggedWebsite = null;
        longPressActive = false;
        isDragging = false;
      });

      categoryContainer.appendChild(gridItem);
    });

    // Drag and drop events for category container
    categoryContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (draggedWebsite) {
        categoryContainer.classList.add("drag-over");
      }
    });

    categoryContainer.addEventListener("dragleave", (e) => {
      if (!categoryContainer.contains(e.relatedTarget)) {
        categoryContainer.classList.remove("drag-over");
      }
    });

    categoryContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      categoryContainer.classList.remove("drag-over");

      if (draggedWebsite) {
        const targetCategoryId = categoryContainer.dataset.categoryId;
        const sourceCategoryId = draggedWebsite.categoryId;
        const websiteId = draggedWebsite.id;

        // Find source and target categories
        const sourceCategory = categories.find((cat) => cat.id === sourceCategoryId);
        const targetCategory = categories.find((cat) => cat.id === targetCategoryId);

        if (sourceCategory && targetCategory) {
          // Find the website
          const websiteIndex = sourceCategory.websites.findIndex((web) => web.id === websiteId);
          const website = sourceCategory.websites[websiteIndex];

          if (website) {
            // Calculate drop position
            const afterElement = getDragAfterElement(categoryContainer, e.clientX, e.clientY);

            if (sourceCategoryId === targetCategoryId) {
              // Reordering within same category
              sourceCategory.websites.splice(websiteIndex, 1);
              if (afterElement) {
                const afterIndex = sourceCategory.websites.findIndex((web) => web.id === afterElement.dataset.id);
                sourceCategory.websites.splice(afterIndex, 0, website);
              } else {
                sourceCategory.websites.push(website);
              }
              showNotification("Website reordered");
            } else {
              // Moving between categories
              sourceCategory.websites.splice(websiteIndex, 1);
              if (afterElement) {
                const afterIndex = targetCategory.websites.findIndex((web) => web.id === afterElement.dataset.id);
                targetCategory.websites.splice(afterIndex, 0, website);
              } else {
                targetCategory.websites.push(website);
              }
              // Move custom image if exists
              const oldCustomImageKey = `${sourceCategoryId}-${websiteId}`;
              const newCustomImageKey = `${targetCategoryId}-${websiteId}`;
              if (customImages[oldCustomImageKey]) {
                customImages[newCustomImageKey] = customImages[oldCustomImageKey];
                delete customImages[oldCustomImageKey];
                saveCustomImages();
              }
              showNotification(`Website moved to ${targetCategory.name}`);
            }

            saveData();
            renderGridView();
          }
        }
      }
    });

    categorySection.appendChild(categoryContainer);
    columns[columnIndex].appendChild(categorySection);
  });

  gridView.appendChild(categoriesRow);

  // Add bottom action buttons container
  const bottomActionsContainer = document.createElement("div");
  bottomActionsContainer.className = "bottom-actions-container";

  // Add "Add Website" button
  const addWebsiteElement = document.createElement("div");
  addWebsiteElement.className = "add-website-grid";
  addWebsiteElement.innerHTML = `
    <div class="add-website-grid-icon">
      <i class="fas fa-plus"></i>
    </div>
    <div class="add-website-grid-name">Add Website</div>
  `;
  addWebsiteElement.addEventListener("click", () => openAddWebsiteModal());
  bottomActionsContainer.appendChild(addWebsiteElement);

  // Add "Add Category" button
  const addCategoryElement = document.createElement("div");
  addCategoryElement.className = "add-category-grid";
  addCategoryElement.innerHTML = `
    <div class="add-category-grid-icon">
      <i class="fas fa-folder-plus"></i>
    </div>
    <div class="add-category-grid-name">Add New Category</div>
  `;
  addCategoryElement.addEventListener("click", () => openAddCategoryModal());
  bottomActionsContainer.appendChild(addCategoryElement);

  gridView.appendChild(bottomActionsContainer);
}

// Modified getDragAfterElement for grid view (uses both x and y coordinates)
function getDragAfterElement(container, x, y) {
  const draggableElements = [...container.querySelectorAll(".grid-item:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offsetX = x - box.left - box.width / 2;
      const offsetY = y - box.top - box.height / 2;
      const offset = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      if (offset < closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.POSITIVE_INFINITY }
  ).element;
}

// Context Menu Functionality
function showContextMenu(e, websiteId, categoryId) {
  currentContextWebsite = { websiteId, categoryId };
  console.log("Context menu shown. currentContextWebsite set to:", currentContextWebsite);

  contextMenu.style.display = "block";
  contextMenu.style.left = `${e.pageX}px`;
  contextMenu.style.top = `${e.pageY}px`;

  // Adjust position if menu goes off screen
  const rect = contextMenu.getBoundingClientRect();
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (rect.right > windowWidth) {
    contextMenu.style.left = `${e.pageX - rect.width}px`;
  }

  if (rect.bottom > windowHeight) {
    contextMenu.style.top = `${e.pageY - rect.height}px`;
  }
}

function hideContextMenu() {
  contextMenu.style.display = "none";
  currentContextWebsite = null;
  console.log("Context menu hidden. currentContextWebsite reset.");
}

// Context menu event listeners
document.getElementById("editWebsiteContext").addEventListener("click", () => {
  console.log("Edit Website context menu item clicked.");
  if (currentContextWebsite) {
    console.log("Calling openEditWebsiteModal with:", currentContextWebsite.categoryId, currentContextWebsite.websiteId);
    openEditWebsiteModal(currentContextWebsite.categoryId, currentContextWebsite.websiteId);
    hideContextMenu();
  } else {
    console.warn("currentContextWebsite is null when Edit Website was clicked.");
  }
});

document.getElementById("deleteWebsiteContext").addEventListener("click", () => {
  console.log("Delete Website context menu item clicked.");
  if (currentContextWebsite) {
    deleteWebsite(currentContextWebsite.categoryId, currentContextWebsite.websiteId);
    hideContextMenu();
  }
});

document.getElementById("openWebsiteContext").addEventListener("click", () => {
  console.log("Open Website context menu item clicked.");
  if (currentContextWebsite) {
    const category = categories.find((cat) => cat.id === currentContextWebsite.categoryId);
    const website = category.websites.find((web) => web.id === currentContextWebsite.websiteId);
    if (website) {
      window.open(website.url, "_blank");
    } else {
      console.error("Website not found for opening:", currentContextWebsite);
    }
    hideContextMenu();
  }
});

document.getElementById("customImageContext").addEventListener("click", () => {
  console.log("Custom Image context menu item clicked.");
  if (currentContextWebsite) {
    openImageInsertModal(currentContextWebsite.categoryId, currentContextWebsite.websiteId);
    hideContextMenu();
  }
});

// Hide context menu when clicking elsewhere
document.addEventListener("click", (e) => {
  if (!contextMenu.contains(e.target)) {
    hideContextMenu();
  }
});

function showNotification(message, type = "success") {
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";

  if (notification.timeoutId) {
    clearTimeout(notification.timeoutId);
  }

  notification.timeoutId = setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

function initializeData() {
  const storedData = localStorage.getItem("webHubData");
  if (storedData) {
    categories = JSON.parse(storedData);
  }

  if (isGridView) {
    renderGridView();
  } else {
    renderCategories();
    setupDragAndDrop();
  }

  populateCategorySelect();
  populateWebsiteSelect();
  loadSavedBackground();
}

function saveData() {
  try {
    localStorage.setItem("webHubData", JSON.stringify(categories));
  } catch (error) {
    showNotification("Failed to save data", "error");
    console.error("Save error:", error);
  }
}

function saveCustomImages() {
  try {
    localStorage.setItem("customImages", JSON.stringify(customImages));
    console.log("Custom images saved to localStorage:", customImages);
  } catch (error) {
    showNotification("Failed to save custom images", "error");
    console.error("Save custom images error:", error);
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
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const delayFactor = categories.indexOf(category) * 0.1;
    renderCategory(category, delayFactor);
  });

  const addCategoryElement = document.createElement("div");
  addCategoryElement.className = "add-category";
  addCategoryElement.style.animationDelay = `${(categories.length + 1) * 0.1}s`;
  addCategoryElement.innerHTML = `
        <i class="fas fa-plus"></i>
        <span>Add New Category</span>
    `;
  addCategoryElement.addEventListener("click", () => openAddCategoryModal());
  categoriesContainer.appendChild(addCategoryElement);
}

function renderCategory(category, delayFactor = 0) {
  const categoryElement = document.createElement("div");
  categoryElement.className = "category";
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

  return websites
    .map((website, index) => {
      const customImageKey = `${categoryId}-${website.id}`;
      const customImageSrc = customImages[customImageKey];
      console.log(
        `Category View: Rendering website ${website.name} (${customImageKey}). Custom image source:`,
        customImageSrc ? "Exists" : "None"
      );

      let iconContent;
      if (customImageSrc) {
        iconContent = `<img src="${customImageSrc}" alt="${website.name}">`;
      } else {
        const faviconUrl = getFaviconUrl(website.url);
        iconContent = faviconUrl
          ? `<img src="${faviconUrl}" alt="${website.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<i class=\'fas fa-globe\'></i>';">`
          : `<i class="fas fa-globe"></i>`;
      }

      return `
          <div class="website" data-id="${website.id}" data-category="${categoryId}" data-url="${website.url}" style="animation-delay: ${index * 0.05}s">
              <div class="website-icon">
                  ${iconContent}
              </div>
              <span class="website-link" title="${website.url}">
                  ${website.name}
              </span>
              <div class="website-actions">
                  <button class="move-up" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                  <button class="move-down" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                  <button class="edit-website" title="Edit Website"><i class="fas fa-edit"></i></button>
                  <button class="delete-website" title="Delete Website"><i class="fas fa-trash"></i></button>
              </div>
          </div>
      `;
    })
    .join("");
}

function setupWebsiteLongPress() {
  const websiteElements = document.querySelectorAll(".website");

  websiteElements.forEach((website) => {
    // Add right-click context menu
    website.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const websiteId = website.dataset.id;
      const categoryId = website.dataset.category;
      console.log(
        "Right-click on category website:",
        website.dataset.name,
        "ID:",
        websiteId,
        "Category ID:",
        categoryId
      );
      showContextMenu(e, websiteId, categoryId);
    });

    // Mouse events
    website.addEventListener("mousedown", (e) => {
      if (e.target.closest(".website-actions")) return;

      longPressTimer = setTimeout(() => {
        activateLongPress(website);
      }, 500);
    });

    website.addEventListener("mouseup", (e) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }

      if (!longPressActive && !isDragging && !e.target.closest(".website-actions")) {
        const url = website.dataset.url;
        window.open(url, "_blank");
      }
    });

    website.addEventListener("mouseleave", () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    // Touch events
    website.addEventListener("touchstart", (e) => {
      if (e.target.closest(".website-actions")) return;

      longPressTimer = setTimeout(() => {
        activateLongPress(website);
      }, 500);
    });

    website.addEventListener("touchend", (e) => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }

      if (!longPressActive && !isDragging && !e.target.closest(".website-actions")) {
        const url = website.dataset.url;
        window.open(url, "_blank");
      }
    });

    website.addEventListener("touchcancel", () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    // Drag events
    website.addEventListener("dragstart", (e) => {
      if (!longPressActive) {
        e.preventDefault();
        return;
      }

      e.stopPropagation();
      isDragging = true;
      draggedWebsite = {
        id: website.dataset.id,
        categoryId: website.dataset.category,
      };
      website.classList.add("dragging");
    });

    website.addEventListener("dragend", () => {
      website.classList.remove("dragging");
      website.classList.remove("long-press-active");
      draggedWebsite = null;
      longPressActive = false;
      isDragging = false;
    });
  });
}

function activateLongPress(element) {
  longPressActive = true;
  element.classList.add("long-press-active");
  element.draggable = true;

  if (navigator.vibrate) {
    navigator.vibrate(50);
  }

  showNotification("Drag mode activated", "success");

  setTimeout(() => {
    if (longPressActive && !isDragging) {
      deactivateLongPress(element);
    }
  }, 5000);
}

function deactivateLongPress(element) {
  longPressActive = false;
  element.classList.remove("long-press-active");
  element.draggable = false;
}

function setupDragAndDrop() {
  const categoryElements = document.querySelectorAll(".category");
  categoryElements.forEach((category) => {
    category.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("website")) return;
      e.dataTransfer.setData("text/plain", category.dataset.id);
      category.classList.add("dragging");
      draggedCategory = category.dataset.id;
    });

    category.addEventListener("dragend", () => {
      category.classList.remove("dragging");
      draggedCategory = null;
    });

    category.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (draggedCategory && draggedCategory !== category.dataset.id) {
        category.classList.add("drag-over");
      }
    });

    category.addEventListener("dragleave", () => {
      category.classList.remove("drag-over");
    });

    category.addEventListener("drop", (e) => {
      e.preventDefault();
      category.classList.remove("drag-over");

      if (draggedCategory) {
        const draggedId = draggedCategory;
        const targetId = category.dataset.id;

        if (draggedId !== targetId) {
          const draggedIndex = categories.findIndex((cat) => cat.id === draggedId);
          const targetIndex = categories.findIndex((cat) => cat.id === targetId);

          const [draggedCategoryObj] = categories.splice(draggedIndex, 1);
          categories.splice(targetIndex, 0, draggedCategoryObj);

          saveData();
          renderCategories();
          setupDragAndDrop();
          showNotification("Category reordered");
        }
      }
    });
  });

  const websiteContainers = document.querySelectorAll(".websites");
  websiteContainers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (draggedWebsite) {
        container.classList.add("drag-over");
      }
    });

    container.addEventListener("dragleave", (e) => {
      if (!container.contains(e.relatedTarget)) {
        container.classList.remove("drag-over");
      }
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.classList.remove("drag-over");

      if (draggedWebsite) {
        const targetCategoryId = container.dataset.categoryId;
        const sourceCategoryId = draggedWebsite.categoryId;
        const websiteId = draggedWebsite.id;

        const sourceCategory = categories.find((cat) => cat.id === sourceCategoryId);
        const targetCategory = categories.find((cat) => cat.id === targetCategoryId);

        if (sourceCategory && targetCategory) {
          const websiteIndex = sourceCategory.websites.findIndex((web) => web.id === websiteId);
          const website = sourceCategory.websites[websiteIndex];

          if (website) {
            const afterElement = getDragAfterElement(container, e.clientY);

            if (sourceCategoryId === targetCategoryId) {
              sourceCategory.websites.splice(websiteIndex, 1);
              if (afterElement) {
                const afterIndex = sourceCategory.websites.findIndex((web) => web.id === afterElement.dataset.id);
                sourceCategory.websites.splice(afterIndex, 0, website);
              } else {
                sourceCategory.websites.push(website);
              }
              showNotification("Website reordered");
            } else {
              sourceCategory.websites.splice(websiteIndex, 1);
              if (afterElement) {
                const afterIndex = targetCategory.websites.findIndex((web) => web.id === afterElement.dataset.id);
                targetCategory.websites.splice(afterIndex, 0, website);
              } else {
                targetCategory.websites.push(website);
              }
              showNotification(`Website moved to ${targetCategory.name}`);
            }

            saveData();
            renderCategories();
            setupDragAndDrop();
          }
        }
      }
    });
  });

  setupWebsiteLongPress();

  categoriesContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll(".website:not(.dragging)")];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function populateCategorySelect() {
  websiteCategorySelect.innerHTML = "";
  editWebsiteCategorySelect.innerHTML = "";

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    websiteCategorySelect.appendChild(option);

    const editOption = document.createElement("option");
    editOption.value = category.id;
    editOption.textContent = category.name;
    editWebsiteCategorySelect.appendChild(editOption);
  });
}

function populateWebsiteSelect() {
  selectWebsite.innerHTML = '<option value="">Choose a website...</option>';

  categories.forEach((category) => {
    category.websites.forEach((website) => {
      const option = document.createElement("option");
      option.value = `${category.id}-${website.id}`;
      option.textContent = `${website.name} (${category.name})`;
      selectWebsite.appendChild(option);
    });
  });
}

function openAddWebsiteModal(categoryId = null) {
  if (categoryId) {
    currentCategoryIdInput.value = categoryId;
    websiteCategorySelect.value = categoryId;
  } else {
    currentCategoryIdInput.value = "";
  }
  addWebsiteForm.reset();
  addWebsiteModal.classList.add("active");
}

function openAddCategoryModal() {
  addCategoryForm.reset();
  addCategoryModal.classList.add("active");
}

function openEditWebsiteModal(categoryId, websiteId) {
  const category = categories.find((cat) => cat.id === categoryId);
  const website = category.websites.find((web) => web.id === websiteId);

  if (!website) {
    console.error("Error: Website not found for editing. Category ID:", categoryId, "Website ID:", websiteId);
    showNotification("Error: Website not found for editing.", "error");
    return;
  }

  document.getElementById("editWebsiteName").value = website.name;
  document.getElementById("editWebsiteUrl").value = website.url;
  document.getElementById("editWebsiteId").value = websiteId;
  document.getElementById("editWebsiteCategoryId").value = categoryId;
  editWebsiteCategorySelect.value = categoryId;

  editWebsiteModal.classList.add("active");
  console.log("Opened Edit Website Modal for:", website.name, "ID:", websiteId, "Category ID:", categoryId);
}

function openEditCategoryModal(categoryId) {
  const category = categories.find((cat) => cat.id === categoryId);
  document.getElementById("editCategoryName").value = category.name;
  document.getElementById("editCategoryId").value = categoryId;
  editCategoryModal.classList.add("active");
}

function openImageInsertModal(categoryId = null, websiteId = null) {
  if (categoryId && websiteId) {
    selectWebsite.value = `${categoryId}-${websiteId}`;
    console.log("Image Insert Modal: Pre-selecting website:", selectWebsite.value);
  } else {
    selectWebsite.value = "";
    console.log("Image Insert Modal: No specific website pre-selected.");
  }
  customImageUrl.value = "";
  customImageFile.value = "";
  imageInsertModal.classList.add("active");
}

function closeModals() {
  addWebsiteModal.classList.remove("active");
  addCategoryModal.classList.remove("active");
  editWebsiteModal.classList.remove("active");
  editCategoryModal.classList.remove("active");
  imageInsertModal.classList.remove("active");
  sharingModal.classList.remove("active");
}

function addWebsite(name, url, categoryId) {
  try {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error("Category not found");
    if (!name || !url) throw new Error("Name and URL are required");

    const newWebsite = {
      id: `website-${Date.now()}`,
      name: name.trim(),
      url: url.startsWith("http") ? url : `https://${url}`,
    };

    category.websites.push(newWebsite);
    saveData();

    if (isGridView) {
      renderGridView();
    } else {
      renderCategories();
      setupDragAndDrop();
    }

    populateWebsiteSelect();
    showNotification("Website added successfully");
  } catch (error) {
    showNotification(error.message, "error");
  }
}

function deleteWebsite(categoryId, websiteId) {
  if (confirm("Are you sure you want to delete this website?")) {
    try {
      const category = categories.find((cat) => cat.id === categoryId);
      if (!category) throw new Error("Category not found");

      category.websites = category.websites.filter((website) => website.id !== websiteId);

      const customImageKey = `${categoryId}-${websiteId}`;
      if (customImages[customImageKey]) {
        delete customImages[customImageKey];
        saveCustomImages();
      }

      saveData();

      if (isGridView) {
        renderGridView();
      } else {
        renderCategories();
        setupDragAndDrop();
      }

      populateWebsiteSelect();
      showNotification("Website deleted successfully");
    } catch (error) {
      showNotification(error.message, "error");
    }
  }
}

function editWebsite(websiteId, categoryId, newName, newUrl, newCategoryId) {
  try {
    const oldCategory = categories.find((cat) => cat.id === categoryId);
    const website = oldCategory.websites.find((web) => web.id === websiteId);

    if (!website) throw new Error("Website not found");

    website.name = newName.trim();
    website.url = newUrl.startsWith("http") ? newUrl : `https://${newUrl}`;

    if (categoryId !== newCategoryId) {
      const oldCustomImageKey = `${categoryId}-${websiteId}`;
      const newCustomImageKey = `${newCategoryId}-${websiteId}`;

      if (customImages[oldCustomImageKey]) {
        customImages[newCustomImageKey] = customImages[oldCustomImageKey];
        delete customImages[oldCustomImageKey];
        saveCustomImages();
      }

      oldCategory.websites = oldCategory.websites.filter((web) => web.id !== websiteId);
      const newCategory = categories.find((cat) => cat.id === newCategoryId);
      newCategory.websites.push(website);
    }

    saveData();

    if (isGridView) {
      renderGridView();
    } else {
      renderCategories();
      setupDragAndDrop();
    }

    populateWebsiteSelect();
    showNotification("Website updated successfully");
  } catch (error) {
    showNotification(error.message, "error");
  }
}

function addCategory(name) {
  try {
    if (!name) throw new Error("Category name is required");
    if (categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())) {
      throw new Error("Category already exists");
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newCategory = {
      id: `${id}-${Date.now()}`,
      name: name.trim(),
      websites: [],
    };

    categories.push(newCategory);
    saveData();
    renderCategories();
    populateCategorySelect();
    populateWebsiteSelect();
    setupDragAndDrop();
    showNotification("Category added successfully");
  } catch (error) {
    showNotification(error.message, "error");
  }
}

function editCategory(categoryId, newName) {
  try {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error("Category not found");

    if (categories.some((cat) => cat.id !== categoryId && cat.name.toLowerCase() === newName.toLowerCase())) {
      throw new Error("Category name already exists");
    }

    category.name = newName.trim();
    saveData();
    renderCategories();
    populateCategorySelect();
    populateWebsiteSelect();
    setupDragAndDrop();
    showNotification("Category updated successfully");
  } catch (error) {
    showNotification(error.message, "error");
  }
}

function deleteCategory(categoryId) {
  if (confirm("Are you sure you want to delete this category and all its websites?")) {
    try {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.websites.forEach((website) => {
          const customImageKey = `${categoryId}-${website.id}`;
          if (customImages[customImageKey]) {
            delete customImages[customImageKey];
          }
        });
        saveCustomImages();
      }

      categories = categories.filter((category) => category.id !== categoryId);
      saveData();

      if (isGridView) {
        renderGridView();
      } else {
        renderCategories();
        setupDragAndDrop();
      }

      populateCategorySelect();
      populateWebsiteSelect();
      showNotification("Category deleted successfully");
    } catch (error) {
      showNotification("Failed to delete category", "error");
    }
  }
}

function moveCategoryUp(categoryId) {
  try {
    const index = categories.findIndex((cat) => cat.id === categoryId);
    if (index <= 0) return;
    [categories[index - 1], categories[index]] = [categories[index], categories[index - 1]];
    saveData();
    renderCategories();
    setupDragAndDrop();
    showNotification("Category moved up");
  } catch (error) {
    showNotification("Failed to move category", "error");
  }
}

function moveCategoryDown(categoryId) {
  try {
    const index = categories.findIndex((cat) => cat.id === categoryId);
    if (index === -1 || index >= categories.length - 1) return;
    [categories[index], categories[index + 1]] = [categories[index + 1], categories[index]];
    saveData();
    renderCategories();
    setupDragAndDrop();
    showNotification("Category moved down");
  } catch (error) {
    showNotification("Failed to move category", "error");
  }
}

function moveWebsiteUp(categoryId, websiteId) {
  try {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error("Category not found");

    const index = category.websites.findIndex((website) => website.id === websiteId);
    if (index <= 0) return;
    [category.websites[index - 1], category.websites[index]] = [category.websites[index], category.websites[index - 1]];

    saveData();
    renderCategories();
    setupDragAndDrop();
    showNotification("Website moved up");
  } catch (error) {
    showNotification("Failed to move website", "error");
  }
}

function moveWebsiteDown(categoryId, websiteId) {
  try {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) throw new Error("Category not found");

    const index = category.websites.findIndex((website) => website.id === websiteId);
    if (index === -1 || index >= category.websites.length - 1) return;
    [category.websites[index], category.websites[index + 1]] = [category.websites[index + 1], category.websites[index]];

    saveData();
    renderCategories();
    setupDragAndDrop();
    showNotification("Website moved down");
  } catch (error) {
    showNotification("Failed to move website", "error");
  }
}

function searchWebsites(query) {
  if (!query) {
    if (isGridView) {
      renderGridView();
    } else {
      renderCategories();
      setupDragAndDrop();
    }
    return;
  }

  const lowerQuery = query.toLowerCase();

  if (isGridView) {
    const allWebsites = [];
    categories.forEach((category) => {
      category.websites.forEach((website) => {
        if (website.name.toLowerCase().includes(lowerQuery) || website.url.toLowerCase().includes(lowerQuery)) {
          allWebsites.push({
            ...website,
            categoryId: category.id,
            categoryName: category.name,
          });
        }
      });
    });

    gridView.innerHTML = "";

    if (allWebsites.length === 0) {
      gridView.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: var(--text-secondary); margin-bottom: 20px;"></i>
                    <p>No websites found matching "${query}"</p>
                </div>
            `;
      return;
    }

    allWebsites.forEach((website, index) => {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.dataset.id = website.id;
      gridItem.dataset.category = website.categoryId;
      gridItem.dataset.url = website.url;
      gridItem.style.animationDelay = `${index * 0.05}s`;

      const customImageKey = `${website.categoryId}-${website.id}`;
      const customImageSrc = customImages[customImageKey];

      let iconContent;
      if (customImageSrc) {
        iconContent = `<img src="${customImageSrc}" alt="${website.name}">`;
      } else {
        const faviconUrl = getFaviconUrl(website.url);
        iconContent = faviconUrl
          ? `<img src="${faviconUrl}" alt="${website.name}" onerror="this.onerror=null; this.parentNode.innerHTML='<i class=\'fas fa-globe\'></i>';">`
          : `<i class="fas fa-globe"></i>`;
      }

      gridItem.innerHTML = `
                <div class="grid-item-icon">
                    ${iconContent}
                </div>
                <div class="grid-item-name">${website.name}</div>
            `;

      gridItem.addEventListener("click", (e) => {
        if (!e.defaultPrevented) {
          window.open(website.url, "_blank");
        }
      });

      gridItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        openEditWebsiteModal(website.categoryId, website.id);
      });

      gridView.appendChild(gridItem);
    });
  } else {
    const filteredCategories = categories
      .map((category) => {
        const categoryMatch = category.name.toLowerCase().includes(lowerQuery);
        const filteredWebsites = category.websites.filter(
          (website) =>
            website.name.toLowerCase().includes(lowerQuery) || website.url.toLowerCase().includes(lowerQuery)
        );

        if (categoryMatch || filteredWebsites.length > 0) {
          return {
            ...category,
            websites: categoryMatch ? category.websites : filteredWebsites,
          };
        }
        return null;
      })
      .filter((category) => category !== null);

    categoriesContainer.innerHTML = "";

    if (filteredCategories.length === 0) {
      categoriesContainer.innerHTML = `
                <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <i class="fas fa-search" style="font-size: 48px; color: var(--text-secondary); margin-bottom: 20px;"></i>
                    <p>No categories or websites found matching "${query}"</p>
                </div>
            `;
      return;
    }

    filteredCategories.forEach((category) => renderCategory(category));
    setupDragAndDrop();
  }
}

// Event Listeners
searchInput.addEventListener("input", (e) => searchWebsites(e.target.value));
closeAddWebsiteModal.addEventListener("click", closeModals);
closeAddCategoryModal.addEventListener("click", closeModals);
closeEditWebsiteModal.addEventListener("click", closeModals);
closeEditCategoryModal.addEventListener("click", closeModals);
closeImageInsertModal.addEventListener("click", closeModals);
cancelAddWebsite.addEventListener("click", closeModals);
cancelAddCategory.addEventListener("click", closeModals);
cancelEditWebsite.addEventListener("click", closeModals);
cancelEditCategory.addEventListener("click", closeModals);
cancelImageInsert.addEventListener("click", closeModals);

addWebsiteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("websiteName").value;
  const url = document.getElementById("websiteUrl").value;
  const categoryId = document.getElementById("websiteCategory").value;
  addWebsite(name, url, categoryId);
  closeModals();
});

addCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("categoryName").value;
  addCategory(name);
  closeModals();
});

saveEditWebsite.addEventListener("click", (e) => {
  e.preventDefault();
  const websiteId = document.getElementById("editWebsiteId").value;
  const categoryId = document.getElementById("editWebsiteCategoryId").value;
  const name = document.getElementById("editWebsiteName").value;
  const url = document.getElementById("editWebsiteUrl").value;
  const newCategoryId = document.getElementById("editWebsiteCategory").value;
  editWebsite(websiteId, categoryId, name, url, newCategoryId);
  closeModals();
});

editCategoryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const categoryId = document.getElementById("editCategoryId").value;
  const name = document.getElementById("editCategoryName").value;
  editCategory(categoryId, name);
  closeModals();
});

const deleteWebsiteBtn = document.getElementById("deleteWebsiteBtn");
deleteWebsiteBtn.addEventListener("click", () => {
  const websiteId = document.getElementById("editWebsiteId").value;
  const categoryId = document.getElementById("editWebsiteCategoryId").value;
  console.log("Delete button clicked in Edit Website Modal. Website ID:", websiteId, "Category ID:", categoryId);
  deleteWebsite(categoryId, websiteId);
  closeModals();
});

// Sharing functionality event listeners
sharingToggleBtn.addEventListener("click", () => {
  sharingModal.classList.add("active");
  closeRightMenu();
});

closeSharingModal.addEventListener("click", () => {
  sharingModal.classList.remove("active");
});

copyShareURL.addEventListener("click", () => {
  copyShareableURL();
  sharingModal.classList.remove("active");
});

exportDataBtn.addEventListener("click", () => {
  exportData();
  sharingModal.classList.remove("active");
});

importDataBtn.addEventListener("click", () => {
  if (importFile.files.length > 0) {
    importData(importFile.files[0]);
    sharingModal.classList.remove("active");
  } else {
    showNotification("Please select a file to import", "error");
  }
});

resetDataBtn.addEventListener("click", () => {
  resetToDefault();
  sharingModal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (
    e.target === addWebsiteModal ||
    e.target === addCategoryModal ||
    e.target === editWebsiteModal ||
    e.target === editCategoryModal ||
    e.target === backgroundModal ||
    e.target === imageInsertModal ||
    e.target === sharingModal ||
    e.target === menuOverlay
  ) {
    closeModals();
    backgroundModal.classList.remove("active");
    sharingModal.classList.remove("active");
    closeRightMenu();
  }
});

categoriesContainer.addEventListener("click", (e) => {
  const categoryElement = e.target.closest(".category");
  const websiteElement = e.target.closest(".website");
  const categoryId = categoryElement?.dataset.id;

  if (e.target.closest(".website-actions") && (draggedWebsite || longPressActive)) {
    return;
  }

  if (e.target.closest(".move-up") && !websiteElement) {
    moveCategoryUp(categoryId);
  }

  if (e.target.closest(".move-down") && !websiteElement) {
    moveCategoryDown(categoryId);
  }

  if (e.target.closest(".delete-category")) {
    deleteCategory(categoryId);
  }

  if (e.target.closest(".edit-category")) {
    openEditCategoryModal(categoryId);
  }

  if (e.target.closest(".add-website")) {
    openAddWebsiteModal(categoryId);
  }

  if (websiteElement) {
    const websiteId = websiteElement.dataset.id;
    const websiteCategoryId = websiteElement.dataset.category;

    if (e.target.closest(".move-up")) {
      moveWebsiteUp(websiteCategoryId, websiteId);
    }

    if (e.target.closest(".move-down")) {
      moveWebsiteDown(websiteCategoryId, websiteId);
    }

    if (e.target.closest(".delete-website")) {
      deleteWebsite(websiteCategoryId, websiteId);
    }

    if (e.target.closest(".edit-website")) {
      openEditWebsiteModal(websiteCategoryId, websiteId);
    }
  }
});

// Background functionality
backgroundToggleBtn.addEventListener("click", () => {
  backgroundModal.classList.add("active");
});

closeBackgroundModal.addEventListener("click", () => {
  backgroundModal.classList.remove("active");
});

cancelBackground.addEventListener("click", () => {
  backgroundModal.classList.remove("active");
});

customizeImageBtn.addEventListener("click", () => {
  const websiteId = document.getElementById("editWebsiteId").value;
  const categoryId = document.getElementById("editWebsiteCategoryId").value;
  console.log(
    "Customize Image button clicked in Edit Website Modal. Website ID:",
    websiteId,
    "Category ID:",
    categoryId
  );
  openImageInsertModal(categoryId, websiteId);
});

addWebsiteGrid.addEventListener("click", () => {
  openAddWebsiteModal();
});

backgroundOpacity.addEventListener("input", (e) => {
  const value = Math.round(e.target.value * 100);
  opacityValue.textContent = `${value}%`;
});

applyBackground.addEventListener("click", () => {
  const url = backgroundUrl.value;
  const opacity = backgroundOpacity.value;

  if (url) {
    applyBackgroundImage(url, opacity);
  } else if (backgroundFile.files[0]) {
    const file = backgroundFile.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      applyBackgroundImage(e.target.result, opacity);
    };
    reader.readAsDataURL(file);
  }

  backgroundModal.classList.remove("active");
});

removeBackground.addEventListener("click", () => {
  removeBackgroundImage();
  backgroundModal.classList.remove("active");
});

applyCustomImage.addEventListener("click", () => {
  const websiteKey = selectWebsite.value;
  const imageUrl = customImageUrl.value;
  const imageFile = customImageFile.files[0];

  console.log("Attempting to apply custom image.");
  console.log("Selected websiteKey:", websiteKey);
  console.log("Provided URL:", imageUrl);
  console.log("Provided File:", imageFile ? imageFile.name : "None");

  if (!websiteKey) {
    showNotification("Please select a website", "error");
    return;
  }

  if (imageUrl) {
    customImages[websiteKey] = imageUrl;
    saveCustomImages();
    console.log("Custom image set from URL. Current customImages:", customImages);
    if (isGridView) {
      renderGridView();
    } else {
      renderCategories();
      setupDragAndDrop();
    }
    showNotification("Custom image applied successfully");
    closeModals();
  } else if (imageFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      customImages[websiteKey] = e.target.result;
      saveCustomImages();
      console.log("Custom image set from file. Current customImages:", customImages);
      if (isGridView) {
        renderGridView();
      } else {
        renderCategories();
        setupDragAndDrop();
      }
      showNotification("Custom image applied successfully");
      closeModals();
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      showNotification("Failed to read image file.", "error");
    };
    reader.readAsDataURL(imageFile);
  } else {
    showNotification("Please provide an image URL or upload a file", "error");
  }
});

resetWebsiteImage.addEventListener("click", () => {
  const websiteKey = selectWebsite.value;

  if (!websiteKey) {
    showNotification("Please select a website", "error");
    return;
  }

  if (customImages[websiteKey]) {
    delete customImages[websiteKey];
    saveCustomImages();
    console.log("Custom image reset. Current customImages:", customImages);

    if (isGridView) {
      renderGridView();
    } else {
      renderCategories();
      setupDragAndDrop();
    }

    showNotification("Website image reset to favicon");
    closeModals();
  } else {
    showNotification("No custom image found for this website", "error");
  }
});

document.querySelectorAll(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const preset = e.target.dataset.bg;
    const opacity = backgroundOpacity.value;

    switch (preset) {
      case "none":
        removeBackgroundImage();
        break;
      case "gradient1":
        applyBackgroundImage("linear-gradient(135deg, #667eea 0%, #764ba2 100%)", opacity, true);
        break;
      case "gradient2":
        applyBackgroundImage("linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", opacity, true);
        break;
      case "gradient3":
        applyBackgroundImage("linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", opacity, true);
        break;
    }

    backgroundModal.classList.remove("active");
  });
});

function applyBackgroundImage(imageUrl, opacity, isGradient = false) {
  if (isGradient) {
    document.documentElement.style.setProperty("--bg-image", imageUrl);
    document.documentElement.style.setProperty("--bg-opacity", opacity);

    const style = document.createElement("style");
    style.id = "grid-background-style";
    style.textContent = `
      body.grid-view-active::before {
        background: ${imageUrl} !important;
        opacity: ${opacity} !important;
      }
    `;

    const existingStyle = document.getElementById("grid-background-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
  } else {
    document.documentElement.style.setProperty("--bg-image", `url(${imageUrl})`);
    document.documentElement.style.setProperty("--bg-opacity", opacity);

    const style = document.createElement("style");
    style.id = "grid-background-style";
    style.textContent = `
      body.grid-view-active::before {
        background-image: url(${imageUrl}) !important;
        opacity: ${opacity} !important;
      }
    `;

    const existingStyle = document.getElementById("grid-background-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);
  }

  localStorage.setItem("backgroundImage", imageUrl);
  localStorage.setItem("backgroundOpacity", opacity);
  localStorage.setItem("backgroundIsGradient", isGradient);

  showNotification("Background applied successfully");
}

function removeBackgroundImage() {
  const existingStyle = document.getElementById("grid-background-style");
  if (existingStyle) {
    existingStyle.remove();
  }

  localStorage.removeItem("backgroundImage");
  localStorage.removeItem("backgroundOpacity");
  localStorage.removeItem("backgroundIsGradient");

  showNotification("Background removed");
}

function loadSavedBackground() {
  const savedImage = localStorage.getItem("backgroundImage");
  const savedOpacity = localStorage.getItem("backgroundOpacity") || "0.3";
  const isGradient = localStorage.getItem("backgroundIsGradient") === "true";

  if (savedImage) {
    applyBackgroundImage(savedImage, savedOpacity, isGradient);
    backgroundOpacity.value = savedOpacity;
    opacityValue.textContent = `${Math.round(savedOpacity * 100)}%`;
  }
}

// ==================== SHARING FUNCTIONALITY ====================

// Export data as JSON
function exportData() {
  const exportData = {
    categories: categories,
    customImages: customImages,
    backgroundImage: localStorage.getItem("backgroundImage"),
    backgroundOpacity: localStorage.getItem("backgroundOpacity"),
    backgroundIsGradient: localStorage.getItem("backgroundIsGradient"),
    theme: localStorage.getItem("theme"),
    viewMode: localStorage.getItem("viewMode"),
    exportDate: new Date().toISOString(),
    version: "1.0"
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `websync-backup-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  
  showNotification("Data exported successfully!", "success");
}

// Import data from JSON file
function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importData = JSON.parse(e.target.result);
      
      // Validate the data structure
      if (!importData.categories || !Array.isArray(importData.categories)) {
        throw new Error("Invalid data format");
      }
      
      // Ask for confirmation
      const confirmMessage = `This will replace your current data with the imported data.\n\n` +
        `Categories: ${importData.categories.length}\n` +
        `Total Websites: ${importData.categories.reduce((sum, cat) => sum + cat.websites.length, 0)}\n` +
        `Export Date: ${importData.exportDate ? new Date(importData.exportDate).toLocaleString() : 'Unknown'}\n\n` +
        `Are you sure you want to continue?`;
      
      if (confirm(confirmMessage)) {
        // Import categories
        categories = importData.categories;
        
        // Import custom images
        if (importData.customImages) {
          customImages = importData.customImages;
          saveCustomImages();
        }
        
        // Import background settings
        if (importData.backgroundImage) {
          localStorage.setItem("backgroundImage", importData.backgroundImage);
        }
        if (importData.backgroundOpacity) {
          localStorage.setItem("backgroundOpacity", importData.backgroundOpacity);
        }
        if (importData.backgroundIsGradient) {
          localStorage.setItem("backgroundIsGradient", importData.backgroundIsGradient);
        }
        
        // Import theme and view mode
        if (importData.theme) {
          localStorage.setItem("theme", importData.theme);
        }
        if (importData.viewMode) {
          localStorage.setItem("viewMode", importData.viewMode);
        }
        
        // Save and refresh
        saveData();
        location.reload(); // Reload to apply all settings
        
        showNotification("Data imported successfully!", "success");
      }
    } catch (error) {
      console.error("Import error:", error);
      showNotification("Failed to import data. Please check the file format.", "error");
    }
  };
  reader.readAsText(file);
}

// Generate shareable URL
function generateShareableURL() {
  const shareData = {
    categories: categories,
    customImages: customImages,
    backgroundImage: localStorage.getItem("backgroundImage"),
    backgroundOpacity: localStorage.getItem("backgroundOpacity"),
    backgroundIsGradient: localStorage.getItem("backgroundIsGradient"),
    theme: localStorage.getItem("theme"),
    viewMode: localStorage.getItem("viewMode"),
    shareDate: new Date().toISOString(),
    version: "1.0"
  };
  
  const compressedData = btoa(JSON.stringify(shareData));
  const shareURL = `${window.location.origin}${window.location.pathname}?share=${compressedData}`;
  
  return shareURL;
}

// Load data from URL
function loadFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const shareData = urlParams.get('share');
  
  if (shareData) {
    try {
      const decodedData = JSON.parse(atob(shareData));
      
      // Validate the data structure
      if (!decodedData.categories || !Array.isArray(decodedData.categories)) {
        throw new Error("Invalid share data format");
      }
      
      // Ask for confirmation
      const confirmMessage = `You're about to load shared data:\n\n` +
        `Categories: ${decodedData.categories.length}\n` +
        `Total Websites: ${decodedData.categories.reduce((sum, cat) => sum + cat.websites.length, 0)}\n` +
        `Share Date: ${decodedData.shareDate ? new Date(decodedData.shareDate).toLocaleString() : 'Unknown'}\n\n` +
        `This will replace your current data. Continue?`;
      
      if (confirm(confirmMessage)) {
        // Load categories
        categories = decodedData.categories;
        
        // Load custom images
        if (decodedData.customImages) {
          customImages = decodedData.customImages;
          saveCustomImages();
        }
        
        // Load background settings
        if (decodedData.backgroundImage) {
          localStorage.setItem("backgroundImage", decodedData.backgroundImage);
        }
        if (decodedData.backgroundOpacity) {
          localStorage.setItem("backgroundOpacity", decodedData.backgroundOpacity);
        }
        if (decodedData.backgroundIsGradient) {
          localStorage.setItem("backgroundIsGradient", decodedData.backgroundIsGradient);
        }
        
        // Load theme and view mode
        if (decodedData.theme) {
          localStorage.setItem("theme", decodedData.theme);
        }
        if (decodedData.viewMode) {
          localStorage.setItem("viewMode", decodedData.viewMode);
        }
        
        // Save and refresh
        saveData();
        location.reload();
        
        showNotification("Shared data loaded successfully!", "success");
      }
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error("URL load error:", error);
      showNotification("Failed to load shared data. Invalid URL format.", "error");
    }
  }
}

// Copy shareable URL to clipboard
async function copyShareableURL() {
  try {
    const shareURL = generateShareableURL();
    await navigator.clipboard.writeText(shareURL);
    showNotification("Shareable URL copied to clipboard!", "success");
  } catch (error) {
    console.error("Copy error:", error);
    showNotification("Failed to copy URL. Please try again.", "error");
  }
}

// Reset to default data
function resetToDefault() {
  if (confirm("Are you sure you want to reset to default data? This will delete all your customizations and cannot be undone.")) {
    // Clear all data
    localStorage.removeItem("webHubData");
    localStorage.removeItem("customImages");
    localStorage.removeItem("backgroundImage");
    localStorage.removeItem("backgroundOpacity");
    localStorage.removeItem("backgroundIsGradient");
    localStorage.removeItem("theme");
    localStorage.removeItem("viewMode");
    
    // Reset to default categories
    categories = [
      {
        id: "social-media",
        name: "Social Media",
        websites: [
          { id: "social-1", name: "Twitter", url: "https://twitter.com" },
          { id: "social-2", name: "Instagram", url: "https://instagram.com" },
          { id: "social-3", name: "Facebook", url: "https://facebook.com" },
          { id: "social-4", name: "LinkedIn", url: "https://linkedin.com" },
        ],
      },
      {
        id: "ai-tools",
        name: "AI Tools",
        websites: [
          { id: "ai-1", name: "ChatGPT", url: "https://chat.openai.com" },
          { id: "ai-2", name: "Claude", url: "https://claude.ai" },
          { id: "ai-3", name: "Midjourney", url: "https://midjourney.com" },
          { id: "ai-4", name: "Hugging Face", url: "https://huggingface.co" },
        ],
      },
      {
        id: "movies",
        name: "Movies",
        websites: [
          { id: "movie-1", name: "Netflix", url: "https://netflix.com" },
          { id: "movie-2", name: "Amazon Prime", url: "https://primevideo.com" },
          { id: "movie-3", name: "Disney+", url: "https://disneyplus.com" },
          { id: "movie-4", name: "HBO Max", url: "https://hbomax.com" },
        ],
      },
      {
        id: "mail",
        name: "Mail",
        websites: [
          { id: "mail-1", name: "Gmail", url: "https://mail.google.com" },
          { id: "mail-2", name: "Outlook", url: "https://outlook.com" },
          { id: "mail-3", name: "ProtonMail", url: "https://proton.me" },
          { id: "mail-4", name: "Yahoo Mail", url: "https://mail.yahoo.com" },
        ],
      },
      {
        id: "drive",
        name: "Cloud Storage",
        websites: [
          { id: "drive-1", name: "Google Drive", url: "https://drive.google.com" },
          { id: "drive-2", name: "Dropbox", url: "https://dropbox.com" },
          { id: "drive-3", name: "OneDrive", url: "https://onedrive.live.com" },
          { id: "drive-4", name: "iCloud", url: "https://icloud.com" },
        ],
      },
      {
        id: "others",
        name: "Others",
        websites: [
          { id: "other-1", name: "YouTube", url: "https://youtube.com" },
          { id: "other-2", name: "GitHub", url: "https://github.com" },
          { id: "other-3", name: "Reddit", url: "https://reddit.com" },
          { id: "other-4", name: "Wikipedia", url: "https://wikipedia.org" },
        ],
      },
    ];
    
    customImages = {};
    
    // Save and refresh
    saveData();
    location.reload();
    
    showNotification("Reset to default data successfully!", "success");
  }
}