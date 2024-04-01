document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector('.toggle-btn');
    const listItems = document.querySelectorAll('.list-item');
    const centerContent = document.querySelector('.center-content');
    let submenuVisible = false; // Track submenu visibility
    let currentSubMenu = null; // Track current submenu

    toggleBtn.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        
        // Toggle submenu visibility based on sidebar state
        if (sidebar.classList.contains('active')) {
            if (submenuVisible) {
                displaySubMenu(currentSubMenu);
            }
        } else {
            clearSubMenu();
        }
    });

    listItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all list items
            listItems.forEach(li => li.classList.remove('active'));
            // Add active class to the clicked list item
            item.classList.add('active');
            // Display the corresponding list in the center
            displayList(index + 1); // Index starts from 0, so adding 1
            
            // Check if the clicked item is "Dashboard" or "User" and set submenu visibility accordingly
            submenuVisible = (index === 0 || index === 1 || index == 2 || index == 3 || index == 4 || index == 5 || index == 6 || index == 7) && document.querySelector('.sidebar').classList.contains('active');
            if (submenuVisible) {
                currentSubMenu = index; // Store the current submenu index
                displaySubMenu(index); // Pass index to determine submenu content
            } else {
                clearSubMenu();
            }
        });
    });

    function displayList(index) {
        // Clear previous content
        centerContent.innerHTML = '';
        
        // Create a list
        const ul = document.createElement('ul');
        
        // Populate the list with items
        for (let i = 1; i <= 3; i++) {
            const li = document.createElement('li');
            li.textContent = `Item ${i}`;
            ul.appendChild(li);
        }

        // Append the list to the center content
        centerContent.appendChild(ul);
    }

    function displaySubMenu(index) {
        // Clear previous submenu
        clearSubMenu();
    
        // Define submenu items based on the index
        let submenuItems = [];
        let subPageUrls = []; // Array to store static URLs for submenu items
        switch(index) {
            case 0: // Wiki
                submenuItems = ['Analytical AI Internal Wiki'];
                subPageUrls = ['index.html']; // Hardcoded URLs for Portainer submenu items
                break;
            case 1: // System Monitoring
                submenuItems = ['ConnectWise Control', 'CheckMk: System Monitoring'];
                subPageUrls = ['https://testingaai.screenconnect.com', 'index.html']; // Hardcoded URLs for System Monitoring Monitoring submenu items
                break;
            case 2: // Portainer
                submenuItems = ['Portainer: 710Big', 'Portainer: Earthquake', 'Portainer: Tsunami', 'Portainer: Cyclone'];
                subPageUrls = ['http://192.168.0.1:9000', 'index.html', 'index.html', 'index.html']; // Hardcoded URLs for Portainer submenu items
                break;
            case 3: // GitLab
                submenuItems = ['GitLab: Analytical AI'];
                subPageUrls = ['index.html']; // Hardcoded URLs for GitLab submenu items
                break;
            case 4: // Networking
                submenuItems = ['Omada Hardware Controller'];
                subPageUrls = ['index.html']; // Hardcoded URLs for Networking submenu items
                break;
            case 5: // Ollama LLM
                submenuItems = ['Internal LLM: Ollama'];
                subPageUrls = ['index.html']; // Hardcoded URLs for Ollama LLM submenu items
                break;
            case 6: // Annotators
                submenuItems = ['AAI Annotator: Production Build', 'AAI Annotator: Internal Build', '3D Annotator', '3D Volume Viewer'];
                subPageUrls = ['index.html', 'index.html', 'index.html', 'index.html']; // Hardcoded URLs for Annotators submenu items
                break;
            case 7: // Employee Help
                submenuItems = ['Vacation Tracker', 'Kello Time'];
                subPageUrls = ['index.html', 'index.html']; // Hardcoded URLs for Employee Help submenu items
                break;
        }
    
        // Create submenu
        const submenu = document.createElement('div');
        submenu.classList.add('sub-menu');
        
        // Populate the submenu with items
        submenuItems.forEach((item, i) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('sub-menu-item');
            button.addEventListener('click', () => {
                // Redirect to the hardcoded URL for the submenu item
                window.location.href = subPageUrls[i];
            });
            submenu.appendChild(button);
        });
    
        // Append the submenu to the center content
        centerContent.appendChild(submenu);
    }
    

    function clearSubMenu() {
        // Clear previous submenu
        const subMenu = document.querySelector('.sub-menu');
        if (subMenu) {
            subMenu.remove();
        }
    }
});
