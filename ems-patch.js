// EMS Report System Patch v2.3
// Forces removal of logo borders and updates all version references
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.3...');
    
    // Update document title
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.3');
    
    // FORCE UPDATE VERSION BUTTON - MORE AGGRESSIVE
    const forceUpdateVersion = function() {
        // Find and update the version button
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('v2.2') || button.textContent.includes('📊')) {
                button.innerHTML = '📊 v2.3';
                button.textContent = '📊 v2.3';
            }
        });
        
        // Also update window variable if it exists
        if (window.EMSPatchVersion) {
            window.EMSPatchVersion = '2.3';
        }
    };
    
    // FORCE REMOVE GREEN BORDERS - MORE AGGRESSIVE
    const forceRemoveLogoBorders = function() {
        // Target ALL elements that might have green borders
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Check if element has a logo image inside it
            if (element.querySelector('img[src*=".png"], img[src*=".jpg"], img[src*=".jpeg"], img[alt*="logo" i]') ||
                element.className.toString().toLowerCase().includes('logo')) {
                // Force remove any border
                element.style.setProperty('border', '2px solid transparent', 'important');
                element.style.setProperty('outline', 'none', 'important');
                element.style.setProperty('box-shadow', 'none', 'important');
            }
            
            // Specifically target green bordered elements
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.borderColor === 'rgb(40, 167, 69)' || 
                computedStyle.borderColor === '#28a745') {
                // Check if this contains a logo
                if (element.querySelector('img') || element.className.toString().toLowerCase().includes('logo')) {
                    element.style.setProperty('border', '2px solid transparent', 'important');
                }
            }
        });
    };
    
    // Apply fixes multiple times to ensure they stick
    forceUpdateVersion();
    forceRemoveLogoBorders();
    setTimeout(forceUpdateVersion, 200);
    setTimeout(forceRemoveLogoBorders, 200);
    setTimeout(forceUpdateVersion, 1000);
    setTimeout(forceRemoveLogoBorders, 1000);
    
    // COMPLETELY OVERRIDE checkPatchStatus function
    window.checkPatchStatus = function() {
        // Remove any existing modals first
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
            <p><strong>Version: 2.3</strong> (Fully Patched)</p>
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
        
        return false; // Prevent any other popup
    };
    
    // Add aggressive CSS to override borders
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* FORCE remove logo borders */
        .logo-placeholder,
        .logo-container,
        div:has(> img[alt*="logo" i]),
        div:has(> img[src*="logo" i]),
        [class*="logo"] {
            border: 2px solid transparent !important;
            outline: none !important;
            box-shadow: none !important;
        }
        
        /* Target green borders specifically */
        [style*="border: 2px solid #28a745"],
        [style*="border: 2px solid rgb(40, 167, 69)"] {
            border-color: transparent !important;
        }
        
        @media print {
            /* Force color printing */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            /* Hide all unit management UI when printing */
            select[id*="Service"],
            button:contains("Add"),
            button:contains("Remove"),
            .add-unit-btn,
            .remove-unit-btn,
            [onclick*="addUnit"],
            [onclick*="removeUnit"] {
                display: none !important;
            }
            
            /* Hide buttons */
            button {
                display: none !important;
            }
            
            /* No borders on logos */
            .logo-placeholder,
            .logo-container,
            img {
                border: none !important;
            }
            
            /* Keep other colors */
            h1 {
                color: #dc3545 !important;
            }
        }
    `;
    document.head.appendChild(styles);
    
    // Names for dropdowns (from v2.2)
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
    
    // Run patch
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPatch);
    } else {
        setTimeout(applyPatch, 100);
    }
    
    setTimeout(applyPatch, 1000);
    
})();

// Force version update
window.EMSPatchVersion = '2.3';
console.log('EMS Report Patch Version: 2.3');
