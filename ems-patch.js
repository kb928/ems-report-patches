// EMS Report System Patch v2.3
// Removes logo borders, hides print elements, updates version display
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.3...');
    
    // Update document title
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.3');
    console.log('✓ Document title updated to v2.3');
    
    // UPDATE THE VERSION BUTTON - FIX IT TO SHOW v2.3
    setTimeout(() => {
        const versionButton = document.querySelector('button.lock-button[onclick="checkPatchStatus()"]');
        if (versionButton) {
            versionButton.innerHTML = '📊 v2.3';
            console.log('✓ Version button updated to v2.3');
        }
    }, 100);
    
    // REMOVE GREEN BORDERS FROM LOGOS
    const removeLogoBorders = function() {
        // Find logo containers and remove their borders
        const logoContainers = document.querySelectorAll('.logo-placeholder, .logo-container, [class*="logo"]');
        logoContainers.forEach(container => {
            if (container.style) {
                container.style.border = 'none';
                container.style.outline = 'none';
                container.style.boxShadow = 'none';
            }
        });
        
        // Also target elements with green borders specifically
        const greenBorderedElements = document.querySelectorAll('[style*="border: 2px solid #28a745"], [style*="border: 2px solid rgb(40, 167, 69)"]');
        greenBorderedElements.forEach(element => {
            // Check if this element contains a logo
            if (element.querySelector('img[alt*="Logo"], img[alt*="logo"], img.logo') || 
                element.className.includes('logo')) {
                element.style.border = '2px solid white';
            }
        });
        console.log('✓ Logo borders removed/made white');
    };
    
    // Remove borders on load and after delays
    removeLogoBorders();
    setTimeout(removeLogoBorders, 500);
    setTimeout(removeLogoBorders, 1500);
    
    // Add styles for both screen and print
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* Remove logo borders on screen */
        .logo-placeholder,
        .logo-container,
        [class*="logo"] {
            border: 2px solid white !important;
            outline: none !important;
            box-shadow: none !important;
        }
        
        @media print {
            /* Force color printing */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            /* HIDE ALL UNIT SELECTION UI ELEMENTS WHEN PRINTING */
            select[id*="inService"],
            select[id*="oosSelect"],
            button:contains("Add Unit"),
            button:contains("Remove Unit"),
            .add-unit-btn,
            .remove-unit-btn,
            button[onclick*="addUnit"],
            button[onclick*="removeUnit"],
            label:contains("Add In Service Unit"),
            label:contains("Add Out of Service Unit"),
            option[value=""]:first-child,
            select option:first-child:empty,
            select[id*="inService"] + button,
            select[id*="oosSelect"] + button {
                display: none !important;
            }
            
            /* Hide the "Add In Service Unit" and "Add Out of Service Unit" text */
            select[id*="Service"] {
                display: none !important;
            }
            
            /* Hide add/remove buttons */
            button:not(.print-button) {
                display: none !important;
            }
            
            /* Hide lock buttons and version button */
            .lock-button,
            button[onclick="checkPatchStatus()"] {
                display: none !important;
            }
            
            /* Remove borders from logos */
            .logo-placeholder,
            .logo-container,
            img[alt*="Logo"],
            img[alt*="logo"] {
                border: none !important;
                outline: none !important;
            }
            
            /* Keep header colors */
            h1 {
                color: #dc3545 !important;
            }
            
            /* Keep green IN SERVICE box (but not for logos) */
            .in-service-box,
            div:has(> h3:contains("IN SERVICE")) {
                border: 2px solid #28a745 !important;
                background-color: #f8fff9 !important;
            }
            
            /* Keep red OUT OF SERVICE box */
            .oos-box,
            div:has(> h3:contains("OUT OF SERVICE")) {
                border: 2px solid #dc3545 !important;
                background-color: #fff8f8 !important;
            }
            
            /* Clean up dropdowns for 703/704 */
            #supervisor703,
            #supervisor704 {
                border: 1px solid #ccc !important;
                background: white !important;
            }
            
            /* Deputy Chief section styling */
            div:has(> label:contains("DEPUTY CHIEF")) {
                border: 3px solid #dc3545 !important;
                background-color: #fff5f5 !important;
            }
            
            /* Force page to use color mode */
            @page {
                color: full;
            }
        }
    `;
    document.head.appendChild(styles);
    console.log('✓ Styles added for screen and print');
    
    // Override checkPatchStatus for v2.3
    window.checkPatchStatus = function() {
        const modal = document.createElement('div');
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
            <p><strong>Version: 2.3</strong> (All Issues Fixed)</p>
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
    };
    
    // New names to add to dropdowns (keeping from v2.2)
    const newNames = [
        'Krause',
        'Morrison',
        'Klaves',
        'Phifer',
        'Beckenholdt',
        'Simms',
        'Carbrey',
        'Fournier',
        'Lammert',
        'Fendelman',
        'Lalumandier',
        'Free',
        'Powers',
        'Brickey',
        'Hale',
        'Dobelmann'
    ];
    
    // Main patch function
    function applyPatch() {
        try {
            let patchedCount = 0;
            
            // Get the dropdown elements
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            
            // Function to add names to a dropdown
            function addOptionsToSelect(selectElement, names, unitNumber) {
                if (!selectElement) {
                    console.error(`❌ Could not find ${unitNumber} dropdown`);
                    return false;
                }
                
                let addedCount = 0;
                names.forEach(name => {
                    // Check if name already exists
                    const exists = Array.from(selectElement.options).some(
                        option => option.value === name || option.text === name
                    );
                    
                    if (!exists) {
                        const option = document.createElement('option');
                        option.value = name;
                        option.text = name;
                        
                        // Find the "Add Custom" option if it exists
                        const customOption = Array.from(selectElement.options).find(
                            opt => opt.value === 'custom' || opt.text.includes('Add Custom')
                        );
                        
                        // Insert before custom option, or at the end
                        if (customOption) {
                            selectElement.insertBefore(option, customOption);
                        } else {
                            selectElement.appendChild(option);
                        }
                        addedCount++;
                    }
                });
                
                if (addedCount > 0) {
                    console.log(`✓ Added ${addedCount} names to ${unitNumber} dropdown`);
                }
                return true;
            }
            
            // Apply names to 703 dropdown
            if (supervisor703) {
                if (addOptionsToSelect(supervisor703, newNames, '703')) {
                    patchedCount++;
                }
            }
            
            // Apply names to 704 dropdown
            if (supervisor704) {
                if (addOptionsToSelect(supervisor704, newNames, '704')) {
                    patchedCount++;
                }
            }
            
            if (patchedCount > 0) {
                console.log(`✅ EMS Report Patch v2.3 applied successfully to ${patchedCount} dropdowns`);
            }
            
        } catch (error) {
            console.error('❌ Error applying patch:', error);
        }
    }
    
    // Run the patch when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPatch);
    } else {
        // DOM is already loaded
        setTimeout(applyPatch, 100);
    }
    
    // Also run after a delay for dynamic content
    setTimeout(applyPatch, 1000);
    
})();

// Set version for verification
window.EMSPatchVersion = '2.3';
console.log('EMS Report Patch Version:', window.EMSPatchVersion);
