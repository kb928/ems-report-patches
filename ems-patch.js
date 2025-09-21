// EMS Report System Patch v2.2
// Adds new personnel names to 703 and 704 dropdowns
// Author: [Your Name]
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.2...');
    
    // Update version display
    const versionElement = document.getElementById('version-number');
    if (versionElement) {
        versionElement.textContent = 'v2.2';
        versionElement.style.color = '#4CAF50'; // Keep it green
        console.log('✓ Version display updated to v2.2');
    } else {
        // Try to find version text by class or other selectors
        const versionTexts = document.querySelectorAll('.version, [class*="version"], span:contains("v2")');
        versionTexts.forEach(el => {
            if (el.textContent.includes('v2.0') || el.textContent.includes('v2.1')) {
                el.textContent = el.textContent.replace(/v2\.\d+/g, 'v2.2');
                console.log('✓ Updated version text to v2.2');
            }
        });
    }
    
    // Also try to update any element that contains version in the top header
    const headerVersion = document.querySelector('.report-version, .version-display, #versionDisplay');
    if (headerVersion) {
        headerVersion.textContent = 'v2.2';
        console.log('✓ Header version updated to v2.2');
    }
    
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
    
    // Wait for DOM to be ready
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
                
                console.log(`✓ Added ${addedCount} names to ${unitNumber} dropdown`);
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
