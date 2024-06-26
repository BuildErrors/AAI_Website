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
                subPageUrls = ['http://10.0.0.10/mediawiki/index.php/Main_Page']; // Hardcoded URLs for Portainer submenu items
                break;
            case 1: // System Monitoring
                submenuItems = ['ConnectWise Control', 'CheckMk: System Monitoring'];
                subPageUrls = ['https://analyticalai.screenconnect.com', 'http://10.0.0.10:8080']; // Hardcoded URLs for System Monitoring Monitoring submenu items
                break;
            case 2: // Portainer
                submenuItems = ['Portainer: 710Big', 'Portainer: Earthquake', 'Portainer: Tsunami', 'Portainer: Cyclone'];
                subPageUrls = ['http://10.0.0.10:9000', 'http://10.0.0.110:9000', 'http://10.0.0.115:9000', 'http://10.0.0.120:9000']; // Hardcoded URLs for Portainer submenu items
                break;
            case 3: // GitLab
                submenuItems = ['GitLab: Analytical AI'];
                subPageUrls = ['http://10.0.0.10:8081']; // Hardcoded URLs for GitLab submenu items
                break;
            case 4: // Networking
                submenuItems = ['Omada Hardware Controller'];
                subPageUrls = ['http://10.0.0.133']; // Hardcoded URLs for Networking submenu items
                break;
            case 5: // Ollama LLM
                submenuItems = ['Internal LLM: Ollama'];
                subPageUrls = ['http://10.0.0.55:3000']; // Hardcoded URLs for Ollama LLM submenu items
                break;
            case 6: // Annotators
                submenuItems = ['AAI Annotator: Production Build', 'AAI Annotator: Internal Build', '3D Annotator', '3D Volume Viewer'];
                subPageUrls = ['http://10.0.0.10/annotator/aai.html', 'http://10.0.0.10/annotator_internal/aai.html', 'http://10.0.0.15/Home/Annotator', 'http://10.0.0.10/VolumeViewer.html']; // Hardcoded URLs for Annotators submenu items
                break;
            case 7: // Employee Help
                submenuItems = ['Vacation Tracker', 'Kello Time', 'iSolved: Human Resources'];
                subPageUrls = ['https://netorgft3781066.sharepoint.com/:x:/r/sites/analyticalai.com/_layouts/15/doc2.aspx?sourcedoc=%7B6F3245FC-6A89-4590-BFF2-138FBFCF8017%7D&file=_TimeoffTracker.xlsx&action=default&mobileredirect=true', 'https://app.kellotime.com/login', 'https://pbspeoservices.myisolved.com/UserLogin.aspx?ReturnUrl=%2f']; // Hardcoded URLs for Employee Help submenu items
                break;
        }
    
        // Create submenu
        const submenu = document.createElement('div');
        submenu.classList.add('sub-menu');
    
        // Find the clicked menu button
        const clickedMenuItem = document.querySelectorAll('.list-item')[index];
        const rect = clickedMenuItem.getBoundingClientRect();
    
        // Get the width of the side panel
        const sidebar = document.querySelector('.sidebar');
        const sidebarWidth = sidebar.offsetWidth;
    
        // Position submenu relative to clicked menu button
        const submenuTop = rect.top - 21; // Adjust submenu top position as needed
        const submenuLeft = rect.right - sidebarWidth + 10; // Adjust submenu left position as needed
        submenu.style.position = 'absolute';
        submenu.style.width = 'calc(100% - 20px)';
        submenu.style.right = submenuLeft + 'px';
        submenu.style.top = submenuTop + 'px';
    
        // Populate the submenu with items
        submenuItems.forEach((item, i) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('sub-menu-item');
            button.style.fontSize = '18px'; // Adjust font size as needed
            button.style.padding = '10px 20px'; // Adjust padding as needed
            button.style.marginRight = '20px'; // Increase right margin to move items further to the right
            button.style.color = 'white'; // Changes the submenu item text to white
            button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; // Semi-transparent black background
            button.style.backdropFilter = 'blur(5px)'; // Apply blur effect to the background

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
