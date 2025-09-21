// EMS Report System Patch v2.2
// Adds new personnel names to 703 and 704 dropdowns
// Author: [Your Name]
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.2...');
    
    // Update document title
    document.title = document.title.replace(/v2\.\d+/g, 'v2.2');
    console.log('✓ Document title updated to v2.2');
    
    // Update any visible version displays in the page
    // Look for elements that might contain version text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        // Only check elements that directly contain text
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
            const text = element.textContent;
            if (text && (text.includes('v2.0') || text.includes('v2.1') || text.includes('Version 2.0') || text.includes('Version 2.1'))) {
                element.textContent = text.replace(/v2\.\d+/gi, 'v2.2').replace(/Version 2\.\d+/gi, 'Version 2.2');
                // If it was green, keep it green
                if (window.getComputedStyle(element).color === 'rgb(76, 175, 80)' || 
                    element.style.color === '#4CAF50' || 
                    element.style.color === 'green') {
                    element.style.color = '#4CAF50';
                }
                console.log('✓ Updated version display:', element.tagName, text);
            }
        }
    });
    
    // New names to add
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
    
    // Function to apply the patch
    function applyPatch() {
        try {
            let patchedCount = 0;
            
            // Target the CORRECT element IDs - supervisor703 and supervisor704
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            
            // Function to add options to a select element
            function addOptionsToSelect(selectElement, names, unitNumber) {
                if (!selectElement) {
                    console.error(`❌ Could not find ${unitNumber} dropdown`);
                    return false;
                }
                
                let addedCount = 0;
                names.forEach(name => {
                    // Check if option already exists
                    const exists = Array.from(selectElement.options).some(
                        option => option.value === name || option.text === name
                    );
                    
                    if (!exists) {
                        const option = document.createElement('option');
                        option.value = name;
                        option.text = name;
                        
                        // Insert before the "Add Custom Name" option if it exists
                        const customOption = Array.from(selectElement.options).find(
                            opt => opt.value === 'custom' || opt.text.includes('Add Custom')
                        );
                        
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
            
            // Apply to 703 dropdown
            if (supervisor703) {
                if (addOptionsToSelect(supervisor703, newNames, '703')) {
                    patchedCount++;
                }
            }
            
            // Apply to 704 dropdown
            if (supervisor704) {
                if (addOptionsToSelect(supervisor704, newNames, '704')) {
                    patchedCount++;
                }
            }
            
            if (patchedCount > 0) {
                console.log(`✅ EMS Report Patch v2.2 applied successfully to ${patchedCount} dropdowns`);
                
                // Update the initialization message if it exists
                if (window.console && window.console.log) {
                    setTimeout(() => {
                        console.log('%c EMS Report System v2.2 Patched ', 'background: #4CAF50; color: white; font-weight: bold; padding: 2px 5px; border-radius: 3px;');
                    }, 100);
                }
            }
            
        } catch (error) {
            console.error('❌ Error applying patch:', error);
        }
    }
    
    // Apply patch when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPatch);
    } else {
        // DOM already loaded
        setTimeout(applyPatch, 100);
    }
    
    // Also try to apply patch after a delay in case of dynamic content
    setTimeout(applyPatch, 1000);
    
})();

// Version check
window.EMSPatchVersion = '2.2';
console.log('EMS Report Patch Version:', window.EMSPatchVersion);
