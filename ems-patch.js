// EMS Report System Patch v2.2
// Adds new personnel names to 703 and 704 dropdowns
// Author: [Your Name]
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.2...');
    
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
            } else {
                console.error('❌ Element with ID "supervisor703" not found');
            }
            
            // Apply to 704 dropdown
            if (supervisor704) {
                if (addOptionsToSelect(supervisor704, newNames, '704')) {
                    patchedCount++;
                }
            } else {
                console.error('❌ Element with ID "supervisor704" not found');
            }
            
            // Also try alternative selectors if the main ones don't work
            if (patchedCount === 0) {
                console.log('Trying alternative selectors...');
                
                // Try finding by class or other attributes
                const allSelects = document.querySelectorAll('select');
                allSelects.forEach(select => {
                    // Check if this might be a 703 or 704 dropdown
                    if (select.id.includes('703') || 
                        select.className.includes('703') || 
                        select.name?.includes('703')) {
                        addOptionsToSelect(select, newNames, '703 (alternative)');
                        patchedCount++;
                    }
                    if (select.id.includes('704') || 
                        select.className.includes('704') || 
                        select.name?.includes('704')) {
                        addOptionsToSelect(select, newNames, '704 (alternative)');
                        patchedCount++;
                    }
                });
            }
            
            if (patchedCount > 0) {
                console.log(`✅ EMS Report Patch v2.2 applied successfully to ${patchedCount} dropdowns`);
            } else {
                console.error('❌ No dropdowns were patched. Check element IDs in HTML.');
                console.log('Available select elements:', document.querySelectorAll('select').length);
                document.querySelectorAll('select').forEach(s => {
                    console.log('  - Select found:', s.id || s.className || 'no id/class');
                });
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
        setTimeout(applyPatch, 100); // Small delay to ensure elements are rendered
    }
    
    // Also try to apply patch after a delay in case of dynamic content
    setTimeout(applyPatch, 1000);
    
})();

// Version check
window.EMSPatchVersion = '2.2';
console.log('EMS Report Patch Version:', window.EMSPatchVersion);
