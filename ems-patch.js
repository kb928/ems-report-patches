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
        'Brickey',  // Corrected from Brisley
        'Hale',
        'Dobelmann'
    ];
    
    // Wait for DOM to be ready
    function applyPatch() {
        try {
            // Find 703 and 704 select elements
            const selects703 = document.querySelectorAll('select[id*="703"], select[class*="703"]');
            const selects704 = document.querySelectorAll('select[id*="704"], select[class*="704"]');
            
            // Function to add options to a select element
            function addOptionsToSelect(selectElement, names) {
                names.forEach(name => {
                    // Check if option already exists
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
                
                // Sort options alphabetically (keeping first empty option if it exists)
                const options = Array.from(selectElement.options);
                const firstOption = options[0]?.value === '' ? options.shift() : null;
                
                options.sort((a, b) => a.text.localeCompare(b.text));
                
                selectElement.innerHTML = '';
                if (firstOption) selectElement.appendChild(firstOption);
                options.forEach(option => selectElement.appendChild(option));
            }
            
            // Apply to 703 dropdowns
            selects703.forEach(select => {
                addOptionsToSelect(select, newNames);
                console.log('✓ Updated 703 dropdown:', select.id || select.className);
            });
            
            // Apply to 704 dropdowns
            selects704.forEach(select => {
                addOptionsToSelect(select, newNames);
                console.log('✓ Updated 704 dropdown:', select.id || select.className);
            });
            
            // If specific IDs are known, target them directly
            const unit703 = document.getElementById('unit703');
            const unit704 = document.getElementById('unit704');
            
            if (unit703) {
                addOptionsToSelect(unit703, newNames);
                console.log('✓ Updated unit 703 dropdown directly');
            }
            
            if (unit704) {
                addOptionsToSelect(unit704, newNames);
                console.log('✓ Updated unit 704 dropdown directly');
            }
            
            console.log('✅ EMS Report Patch v2.2 applied successfully');
            
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

// Version check and auto-update notification
window.EMSPatchVersion = '2.2';
console.log('EMS Report Patch Version:', window.EMSPatchVersion);
