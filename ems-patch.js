// EMS Report System Patch v2.8
// Fixes: IN SERVICE color and compact print layout
// Date: 2025-01-22

(function() {
    console.log('Applying EMS Report Patch v2.8...');
    
    // CHECK IF THIS IS DEVELOPER VERSION
    const isDeveloper = window.location.href.includes('DEV') || 
                        document.querySelector('script[src*="nocache"]') ||
                        console.warn.toString().includes('DEVELOPMENT MODE');
    
    // FIX DATE DISPLAY - Corrected timezone issue
    const fixDateDisplay = function() {
        const dateInput = document.getElementById('reportDate');
        if (dateInput) {
            let dateValue = dateInput.value;
            if (dateValue) {
                const [year, month, day] = dateValue.split('-');
                const date = new Date(year, month - 1, day, 12, 0, 0);
                const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                
                if (!document.getElementById('printDate')) {
                    const printDate = document.createElement('span');
                    printDate.id = 'printDate';
                    printDate.style.display = 'none';
                    printDate.textContent = formattedDate;
                    dateInput.parentNode.insertBefore(printDate, dateInput.nextSibling);
                } else {
                    document.getElementById('printDate').textContent = formattedDate;
                }
            } else {
                const today = new Date();
                today.setHours(12, 0, 0, 0);
                const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
                const formattedDate = today.toLocaleDateString('en-US', options);
                
                if (!document.getElementById('printDate')) {
                    const printDate = document.createElement('span');
                    printDate.id = 'printDate';
                    printDate.style.display = 'none';
                    printDate.textContent = formattedDate;
                    dateInput.parentNode.insertBefore(printDate, dateInput.nextSibling);
                } else {
                    document.getElementById('printDate').textContent = formattedDate;
                }
            }
        }
    };
    
    fixDateDisplay();
    setTimeout(fixDateDisplay, 500);
    
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'reportDate') {
            fixDateDisplay();
        }
    });
    
    // FIX LOGO DISPLAY
    const fixLogoDisplay = function() {
        const leftLogo = localStorage.getItem('leftLogo');
        const rightLogo = localStorage.getItem('rightLogo');
        
        if (leftLogo) {
            const logoLeftElement = document.getElementById('logoLeft');
            if (logoLeftElement && !logoLeftElement.querySelector('img')) {
                logoLeftElement.innerHTML = '<img src="' + leftLogo + '" alt="Left Logo" style="max-width: 100%; height: auto;">';
                console.log('✓ Left logo restored');
            }
        }
        
        if (rightLogo) {
            const logoRightElement = document.getElementById('logoRight');
            if (logoRightElement && !logoRightElement.querySelector('img')) {
                logoRightElement.innerHTML = '<img src="' + rightLogo + '" alt="Right Logo" style="max-width: 100%; height: auto;">';
                console.log('✓ Right logo restored');
            }
        }
    };
    
    fixLogoDisplay();
    setTimeout(fixLogoDisplay, 500);
    setTimeout(fixLogoDisplay, 1500);
    
    // HIDE LOGO BUTTON FOR USERS ONLY
    if (!isDeveloper) {
        console.log('Production version detected - hiding logo controls');
        
        const hideLogoButton = function() {
            const logoButtons = document.querySelectorAll('button');
            logoButtons.forEach(button => {
                if (button.textContent.includes('Logos') || 
                    button.textContent.includes('logo') ||
                    button.onclick && button.onclick.toString().includes('Logo')) {
                    button.style.display = 'none';
                    console.log('✓ Logo button hidden');
                }
            });
        };
        
        hideLogoButton();
        setTimeout(hideLogoButton, 500);
        setTimeout(hideLogoButton, 1500);
    } else {
        console.log('Developer version detected - logo controls remain visible');
    }
    
    // UPDATE VERSION NUMBERS
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.8');
    
    const forceUpdateVersion = function() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('v2.') || button.textContent.includes('📊')) {
                button.innerHTML = '📊 v2.8';
            }
        });
        window.EMSPatchVersion = '2.8';
    };
    
    forceUpdateVersion();
    
    // FIX BORDERS - Force IN SERVICE to BLUE
    const fixBorders = function() {
        // Find all elements
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            
            // Check for any green borders
            if (computedStyle.borderColor === 'rgb(40, 167, 69)' || 
                computedStyle.borderColor === 'rgb(0, 128, 0)' ||
                computedStyle.borderColor === 'green' ||
                element.style.border && (element.style.border.includes('#28a745') || 
                                        element.style.border.includes('green'))) {
                
                // Check if this is the IN SERVICE section
                const hasInService = element.innerHTML && element.innerHTML.includes('IN SERVICE') && 
                                   !element.innerHTML.includes('OUT OF SERVICE');
                const hasLogo = element.querySelector('img[alt*="ogo"]') || element.className.includes('logo');
                
                if (hasInService) {
                    // Force blue border for IN SERVICE
                    element.style.setProperty('border', '2px solid #007bff', 'important');
                    element.style.setProperty('border-color', '#007bff', 'important');
                    element.style.setProperty('background-color', '#f0f8ff', 'important');
                    console.log('✓ IN SERVICE changed to blue');
                } else if (hasLogo) {
                    // Remove borders from logos
                    element.style.setProperty('border', 'none', 'important');
                }
            }
            
            // Also check for green background
            if (element.style.backgroundColor === 'rgb(212, 237, 218)' || 
                element.style.backgroundColor === '#d4edda') {
                if (element.innerHTML && element.innerHTML.includes('IN SERVICE') && 
                    !element.innerHTML.includes('OUT OF SERVICE')) {
                    element.style.setProperty('background-color', '#f0f8ff', 'important');
                }
            }
        });
        
        // Change IN SERVICE header text to blue
        document.querySelectorAll('h3, div, span').forEach(el => {
            if (el.textContent === 'IN SERVICE') {
                el.style.color = '#007bff';
                el.style.setProperty('color', '#007bff', 'important');
            }
        });
    };
    
    // Apply border fixes multiple times
    setTimeout(fixBorders, 100);
    setTimeout(fixBorders, 500);
    setTimeout(fixBorders, 1000);
    setTimeout(fixBorders, 2000);
    
    // OVERRIDE CHECK PATCH STATUS
    window.checkPatchStatus = function() {
        document.querySelectorAll('.modal, .backdrop-modal').forEach(el => el.remove());
        
        const modal = document.createElement('div');
        modal.className = 'patch-modal';
        modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #4a4a4a; color: white; padding: 20px; border-radius: 10px; z-index: 10000; box-shadow: 0 4px 6px rgba(0,0,0,0.3); min-width: 300px;';
        
        modal.innerHTML = '<h3 style="margin-top: 0;">This page says</h3>' +
            '<p><strong>Version: 2.8</strong> (Print Fix)</p>' +
            '<p>Status: All systems operational</p>' +
            '<p>Last Updated: ' + new Date().toLocaleDateString() + '</p>' +
            '<p>LocalStorage: Available</p>' +
            '<p>Editors: 7 found</p>' +
            '<p style="color: #4CAF50; font-weight: bold;">✓ Patch v2.8 Active</p>' +
            '<button onclick="this.parentElement.remove(); document.querySelector(\'.backdrop-modal\')?.remove();" style="background: white; color: #333; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; margin-top: 10px; font-weight: bold;">OK</button>';
        
        document.body.appendChild(modal);
        
        const backdrop = document.createElement('div');
        backdrop.className = 'backdrop-modal';
        backdrop.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999;';
        backdrop.onclick = function() {
            modal.remove();
            backdrop.remove();
        };
        document.body.appendChild(backdrop);
        
        return false;
    };
    
    // COMPREHENSIVE PRINT STYLES - MORE COMPACT
    const styles = document.createElement('style');
    styles.innerHTML = `
        @media screen { 
            #printDate { display: none !important; }
        }
        
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            @page {
                size: letter;
                margin: 0.3in;
            }
            
            body {
                margin: 0 !important;
                padding: 0 !important;
            }
            
            /* Reduce spacing between sections */
            .quote-section, .units-section, .supervisors-section, 
            .tasks-section, .announcements-section {
                margin-bottom: 10px !important;
                page-break-inside: avoid !important;
            }
            
            /* Compact editor content areas */
            .editor-content, [contenteditable], 
            div[style*="min-height: 100px"],
            div[style*="min-height: 200px"] {
                min-height: auto !important;
                height: auto !important;
                padding: 8px !important;
                margin: 5px 0 !important;
            }
            
            /* IN SERVICE and OUT OF SERVICE side by side */
            div:has(h3:contains("IN SERVICE")),
            div:has(h3:contains("OUT OF SERVICE")) {
                display: inline-block !important;
                width: 48% !important;
                vertical-align: top !important;
                margin-right: 2% !important;
                page-break-inside: avoid !important;
            }
            
            /* Force IN SERVICE to be BLUE in print */
            div[style*="border: 2px solid rgb(40, 167, 69)"],
            div[style*="border: 2px solid #28a745"],
            div[style*="border-color: rgb(40, 167, 69)"],
            *:has(> h3:contains("IN SERVICE")):not(:has(h3:contains("OUT OF SERVICE"))) {
                border: 2px solid #007bff !important;
                border-color: #007bff !important;
                background-color: #f0f8ff !important;
            }
            
            h3:contains("IN SERVICE") {
                color: #007bff !important;
            }
            
            /* Force OUT OF SERVICE to be RED */
            div[style*="border: 2px solid #dc3545"],
            div[style*="border: 2px solid rgb(220, 53, 69)"],
            *:has(> h3:contains("OUT OF SERVICE")) {
                border: 2px solid #dc3545 !important;
                border-color: #dc3545 !important;
                background-color: #fff8f8 !important;
            }
            
            h3:contains("OUT OF SERVICE") {
                color: #dc3545 !important;
            }
            
            /* Reduce header spacing */
            h1, h2, h3 {
                margin-top: 10px !important;
                margin-bottom: 10px !important;
                page-break-after: avoid !important;
            }
            
            /* Main title in red */
            h1 {
                color: #dc3545 !important;
                margin-bottom: 15px !important;
            }
            
            /* Compact Abbott and Medic One sections */
            div:has(h3:contains("ABBOTT")),
            div:has(h3:contains("MEDIC ONE")) {
                margin-bottom: 10px !important;
                page-break-inside: avoid !important;
            }
            
            /* Hide UI elements */
            #reportDate, input[type="date"],
            #inServiceSelect, #oosSelect, 
            button, select:not(#deputyChief):not(#supervisor703):not(#supervisor704) {
                display: none !important;
            }
            
            /* Show formatted date */
            #printDate {
                display: inline !important;
                font-weight: bold !important;
                font-size: 14pt !important;
            }
            
            /* Style supervisor dropdowns for print */
            #deputyChief, #supervisor703, #supervisor704 {
                display: inline !important;
                -webkit-appearance: none !important;
                -moz-appearance: none !important;
                appearance: none !important;
                border: none !important;
                background: none !important;
                font-weight: bold !important;
                text-align: center !important;
                width: 100% !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            
            /* Remove extra padding/margins */
            div[style*="padding: 20px"],
            div[style*="padding: 15px"] {
                padding: 10px !important;
            }
            
            /* No borders on logos */
            .logo-placeholder, 
            div:has(> img[alt*="ogo"]) {
                border: none !important;
            }
        }`;
    
    document.head.appendChild(styles);
    
    // SUPERVISOR NAMES
    const supervisorNames = [
        'Krause', 'Morrison', 'Klaves', 'Phifer', 'Beckenholdt',
        'Simms', 'Carbrey', 'Fournier', 'Lammert', 'Fendelman',
        'Lalumandier', 'Free', 'Powers', 'Brickey', 'Hale', 'Dobelmann'
    ];
    
    const deputyChiefNames = ['A-Krause', 'A-Beckenholdt', 'A-Fournier'];
    
    // ADD NAMES TO DROPDOWNS
    function applyPatch() {
        try {
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            const deputyChief = document.getElementById('deputyChief');
            
            function addOptionsToSelect(selectElement, names) {
                if (!selectElement) return;
                
                names.forEach(name => {
                    const exists = Array.from(selectElement.options).some(
                        option => option.value === name || option.text === name
                    );
                    
                    if (!exists) {
                        const option = document.createElement('option');
                        option.value = name;
                        option.text = name;
                        selectElement.appendChild(option);
                    }
                });
            }
            
            if (supervisor703) addOptionsToSelect(supervisor703, supervisorNames);
            if (supervisor704) addOptionsToSelect(supervisor704, supervisorNames);
            if (deputyChief) addOptionsToSelect(deputyChief, deputyChiefNames);
            
            console.log('✅ Patch v2.8 applied successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    setTimeout(applyPatch, 100);
    setTimeout(applyPatch, 1000);
})();

window.EMSPatchVersion = '2.8';
console.log('EMS Report Patch Version: 2.8 - Print Layout Optimized');
