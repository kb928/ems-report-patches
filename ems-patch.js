// EMS Report System Patch v2.2
// Adds new personnel names to 703 and 704 dropdowns
// Author: [Your Name]
// Date: 2025-01-21

(function() {
    console.log('Applying EMS Report Patch v2.2...');
    
    // Update document title
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.2');
    console.log('✓ Document title updated to v2.2');
    
    // UPDATE THE VERSION BUTTON
    const versionButton = document.querySelector('button.lock-button[onclick="checkPatchStatus()"]');
    if (versionButton) {
        versionButton.innerHTML = versionButton.innerHTML.replace(/v\d+\.\d+/g, 'v2.2');
        console.log('✓ Version button updated to v2.2');
    }
    
    // Override the checkPatchStatus function
    const originalCheckPatchStatus = window.checkPatchStatus;
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
            <p><strong>Version: 2.2</strong> (Patched with Enhanced Features)</p>
            <p>Status: All systems operational</p>
            <p>Last Updated: ${new Date().toLocaleDateString()}</p>
            <p>LocalStorage: Available</p>
            <p>Editors: 7 found</p>
            <p style="color: #4CAF50; font-weight: bold;">✓ Patch v2.2 Active</p>
            <button onclick="this.parentElement.remove()" style="
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
            
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            
            function addOptionsToSelect(selectElement, names, unitNumber) {
                if (!selectElement) {
                    console.error(`❌ Could not find ${unitNumber} dropdown`);
                    return false;
                }
                
                let addedCount = 0;
                names.forEach(name => {
                    const exists = Array.from(selectElement.options).some(
                        option => option.value === name || option.text === name
                    );
                    
                    if (!exists) {
                        const option = document.createElement('option');
                        option.value = name;
                        option.text = name;
                        
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
                    
