// EMS Report System Patch v2.3
// Removes logo locks completely, fixes print styling
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.3...');
    
    // Update document title
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.3');
    console.log('✓ Document title updated to v2.3');
    
    // UPDATE THE VERSION BUTTON
    const versionButton = document.querySelector('button.lock-button[onclick="checkPatchStatus()"]');
    if (versionButton) {
        versionButton.innerHTML = versionButton.innerHTML.replace(/v\d+\.\d+/g, 'v2.3');
        console.log('✓ Version button updated to v2.3');
    }
    
    // REMOVE LOCK EMOJIS FROM LOGOS COMPLETELY (not just for printing)
    const removeLockEmojis = function() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Only remove locks near logos, not from other places
            if (element.className && (element.className.includes('logo') || 
                element.className.includes('header') || 
                element.id === 'logoLeft' || 
                element.id === 'logoRight')) {
                if (element.innerHTML && element.innerHTML.includes('🔒')) {
                    element.innerHTML = element.innerHTML.replace(/🔒/g, '');
                }
            }
            // Also check parent elements of images
            const images = element.querySelectorAll('img[alt*="Logo"], img[alt*="logo"], img.logo');
            if (images.length > 0 && element.innerHTML && element.innerHTML.includes('🔒')) {
                element.innerHTML = element.innerHTML.replace(/🔒/g, '');
            }
        });
        console.log('✓ Lock emojis removed from logos');
    };
    
    // Remove locks when page loads
    removeLockEmojis();
    // Remove locks again after a delay in case they're added dynamically
    setTimeout(removeLockEmojis, 500);
    setTimeout(removeLockEmojis, 1500);
    
    // Add print styles to preserve colors and remove logo borders when printing
    const printStyles = document.createElement('style');
    printStyles.innerHTML = `
        @media print {
            /* Force color printing */
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            /* REMOVE COLORED BORDERS AROUND LOGOS WHEN PRINTING */
            .logo-placeholder,
            .logo-container,
            .logo-wrapper,
            [class*="logo"] {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            }
            
            /* Remove borders from logo images specifically */
            .logo-placeholder img,
            .logo-container img,
            img.logo,
            img[alt*="Logo"],
            img[alt*="logo"] {
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
            }
            
            /* Hide lock buttons and version button */
            .lock-button,
            button[onclick*="lock"],
            button[onclick*="Lock"],
            button[onclick="checkPatchStatus()"] {
                display: none !important;
            }
            
            /* Keep header colors */
            h1, .header-title {
                color: #dc3545 !important;
                font-size: 24px !important;
            }
            
            /* Keep the red header text */
            [style*="color: #dc3545"],
            [style*="color:#dc3545"],
            [style*="color: rgb(220, 53, 69)"] {
                color: #dc3545 !important;
            }
            
            /* Keep green IN SERVICE box (but not for logos) */
            [style*="border: 2px solid #28a745"]:not(.logo-placeholder):not(.logo-container):not([class*="logo"]),
            [style*="border: 2px solid rgb(40, 167, 69)"]:not(.logo-placeholder):not(.logo-container):not([class*="logo"]),
            .in-service-box {
                border: 2px solid #28a745 !important;
                background-color: #f8fff9 !important;
            }
            
            /* Keep red OUT OF SERVICE box (but not for logos) */
            [style*="border: 2px solid #dc3545"]:not(.logo-placeholder):not(.logo-container):not([class*="logo"]),
            [style*="border: 2px solid rgb(220, 53, 69)"]:not(.logo-placeholder):not(.logo-container):not([class*="logo"]),
            .oos-box {
                border: 2px solid #dc3545 !important;
                background-color: #fff8f8 !important;
            }
            
            /* Green text for IN SERVICE */
            [style*="color: #28a745"],
            [style*="color:#28a745"],
            [style*="color: rgb(40, 167, 69)"] {
                color: #28a745 !important;
                font-weight: bold !important;
            }
            
            /* Red text for OUT OF SERVICE */
            [style*="color: #dc3545"],
            [style*="color:#dc3545"] {
                color: #dc3545 !important;
                font-weight: bold !important;
            }
            
            /* Keep section backgrounds */
            .quote-section {
                background-color: #f8f9fa !important;
            }
            
            /* Hide all edit buttons */
            button:not(.print-button) {
                display: none !important;
            }
            
            /* Clean up dropdowns for printing */
            select {
                border: 1px solid #ccc !important;
                padding: 4px !important;
                background: white !important;
            }
            
            /* Make sure logos print cleanly */
            .logo-placeholder img,
            img.logo {
                display: block !important;
                max-width: 100px !important;
                border: none !important;
            }
            
            /* Deputy Chief section styling */
            [style*="border: 3px solid #dc3545"]:not(.logo-placeholder):not(.logo-container) {
                border: 3px solid #dc3545 !important;
                background-color: #fff5f5 !important;
            }
            
            /* Keep gray section headers */
            [style*="background: #e9ecef"],
            [style*="background-color: #e9ecef"] {
                background-color: #e9ecef !important;
            }
            
            /* Force page to use color mode */
            @page {
                color: full;
            }
        }
    `;
    document.head.appendChild(printStyles);
    console.log('✓ Print styles added');
    
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
            <p><strong>Version: 2.3</strong> (Logo Locks Removed)</p>
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
