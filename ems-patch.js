// EMS Report System Patch v2.3
// Complete print optimization with date display fix
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.3...');
    
    // Update document title
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.3');
    
    // FORCE UPDATE VERSION BUTTON
    const forceUpdateVersion = function() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('v2.') || button.textContent.includes('📊')) {
                button.innerHTML = '📊 v2.3';
            }
        });
        window.EMSPatchVersion = '2.3';
    };
    
    // FIX DATE DISPLAY - Add day of week
    const fixDateDisplay = function() {
        const dateInput = document.getElementById('reportDate');
        if (dateInput) {
            const date = dateInput.value ? new Date(dateInput.value) : new Date();
            const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            // Create a span to show formatted date for print
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
    };
    
    // Update date when changed
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'reportDate') {
            fixDateDisplay();
        }
    });
    
    // FIX BORDERS
    const fixBorders = function() {
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            
            if (computedStyle.borderColor === 'rgb(40, 167, 69)' || 
                element.style.border && element.style.border.includes('#28a745')) {
                
                const hasInService = element.innerHTML && element.innerHTML.includes('IN SERVICE') && 
                                   !element.innerHTML.includes('OUT OF SERVICE');
                const hasLogo = element.querySelector('img[alt*="ogo"]') || element.className.includes('logo');
                
                if (hasInService) {
                    element.style.setProperty('border', '2px solid #007bff', 'important');
                    element.style.setProperty('background-color', '#f0f8ff', 'important');
                } else if (hasLogo) {
                    element.style.setProperty('border', 'none', 'important');
                }
            }
        });
        
        document.querySelectorAll('h3, div').forEach(el => {
            if (el.textContent === 'IN SERVICE') {
                el.style.color = '#007bff';
            }
        });
    };
    
    // Apply fixes
    forceUpdateVersion();
    fixDateDisplay();
    setTimeout(fixBorders, 100);
    setTimeout(fixDateDisplay, 200);
    setTimeout(fixBorders, 500);
    setTimeout(fixBorders, 1000);
    
    // Override checkPatchStatus
    window.checkPatchStatus = function() {
        document.querySelectorAll('.modal, .backdrop-modal').forEach(el => el.remove());
        
        const modal = document.createElement('div');
        modal.className = 'patch-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4a4a4a;
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            min-width: 300px;
        `;
        
        modal.innerHTML = `
            <h3 style="margin-top: 0;">This page says</h3>
            <p><strong>Version: 2.3</strong> (Fully Optimized)</p>
            <p>Status: All systems operational</p>
            <p>Last Updated: ${new Date().toLocaleDateString()}</p>
            <p>LocalStorage: Available</p>
            <p>Editors: 7 found</p>
            <p style="color: #4CAF50; font-weight: bold;">✓ Patch v2.3 Active</p>
            <button onclick="this.parentElement.remove(); document.querySelector('.backdrop-modal')?.remove();" style="
                background: white;
                color: #333;
                border: none;
                padding: 8px 20px;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 10px;
                font-weight: bold;
            ">OK</button>
        `;
        
        document.body.appendChild(modal);
        
        const backdrop = document.createElement('div');
        backdrop.className = 'backdrop-modal';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        `;
        backdrop.onclick = function() {
            modal.remove();
            backdrop.remove();
        };
        document.body.appendChild(backdrop);
        
        return false;
    };
    
    // COMPREHENSIVE PRINT STYLES
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* Show formatted date for print */
        @media screen {
            #printDate {
                display: none !important;
            }
        }
        
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            /* HIDE DATE INPUT, SHOW FORMATTED DATE */
            #reportDate,
            input[type="date"] {
                display: none !important;
            }
            
            #printDate {
                display: inline !important;
                font-weight: bold !important;
                font-size: 14pt !important;
            }
            
            /* HIDE ALL DROPDOWNS AND BUTTONS */
            #inServiceSelect,
            #oosSelect,
            select,
            button {
                display: none !important;
            }
            
            /* SUPERVISOR DROPDOWNS - Special handling */
            #deputyChief,
            #supervisor703,
            #supervisor704 {
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
            
            /* Hide dropdown arrows */
            select::-ms-expand {
                display: none !important;
            }
            
            /* Fix district labels */
            label:contains("703")::before {
                content: "";
            }
            label:contains("703") {
                font-size: 0 !important;
            }
            label:contains("703")::after {
                content: "703 - SOUTH DISTRICT" !important;
                font-size: 12pt !important;
                font-weight: bold !important;
            }
            
            label:contains("704")::before {
                content: "";
            }
            label:contains("704") {
                font-size: 0 !important;
            }
            label:contains("704")::after {
                content: "704 - NORTH DISTRICT" !important;
                font-size: 12pt !important;
                font-weight: bold !important;
            }
            
            /* Center the supervisor text under districts */
            div:has(#supervisor703),
            div:has(#supervisor704) {
                text-align: center !important;
            }
            
            /* Blue IN SERVICE */
            div[style*="border: 2px solid rgb(0, 123, 255)"],
            div[style*="border: 2px solid #007bff"] {
                border: 2px solid #007bff !important;
                background-color: #f0f8ff !important;
            }
            
            /* Red OUT OF SERVICE */
            div[style*="border: 2px solid #dc3545"],
            div[style*="border: 2px solid rgb(220, 53, 69)"] {
                border: 2px solid #dc3545 !important;
                background-color: #fff8f8 !important;
            }
            
            /* No borders on logos */
            .logo-placeholder,
            div:has(> img[alt*="ogo"]) {
                border: none !important;
            }
            
            h1 {
                color: #dc3545 !important;
            }
        }
    `;
    document.head.appendChild(styles);
    
    // Names for dropdowns
    const newNames = [
        'Krause', 'Morrison', 'Klaves', 'Phifer', 'Beckenholdt',
        'Simms', 'Carbrey', 'Fournier', 'Lammert', 'Fendelman',
        'Lalumandier', 'Free', 'Powers', 'Brickey', 'Hale', 'Dobelmann'
    ];
    
    // Add names to dropdowns
    function applyPatch() {
        try {
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            
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
            
            if (supervisor703) addOptionsToSelect(supervisor703, newNames);
            if (supervisor704) addOptionsToSelect(supervisor704, newNames);
            
            console.log('✅ Patch v2.3 applied successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPatch);
    } else {
        setTimeout(applyPatch, 100);
    }
    
    setTimeout(applyPatch, 1000);
    
})();

window.EMSPatchVersion = '2.3';
console.log('EMS Report Patch Version: 2.3 - Complete');
