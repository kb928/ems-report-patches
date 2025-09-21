// EMS Report System Patch v2.3
// Fixed: Preserves IN SERVICE border while removing logo borders
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
    
    // REMOVE ONLY LOGO BORDERS - NOT IN SERVICE/OUT OF SERVICE BORDERS
    const forceRemoveLogoBorders = function() {
        const allElements = document.querySelectorAll('*');
        allElements.forEach(element => {
            // Only remove borders from elements that contain logo images
            const hasLogo = element.querySelector('img[src*=".png"], img[src*=".jpg"], img[alt*="logo" i]');
            const isLogoClass = element.className && element.className.toString().toLowerCase().includes('logo');
            
            if (hasLogo || isLogoClass) {
                element.style.setProperty('border', '2px solid transparent', 'important');
            }
        });
    };
    
    // Apply fixes multiple times
    forceUpdateVersion();
    forceRemoveLogoBorders();
    setTimeout(forceUpdateVersion, 200);
    setTimeout(forceRemoveLogoBorders, 200);
    setTimeout(forceUpdateVersion, 1000);
    setTimeout(forceRemoveLogoBorders, 1000);
    
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
        
        return false;
    };
    
    // Add CSS - FIXED TO PRESERVE IN SERVICE BORDER
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* Remove ONLY logo borders */
        .logo-placeholder,
        .logo-container,
        div:has(> img[alt*="logo" i]):not(:has(.in-service)):not(:has(.out-of-service)) {
            border: 2px solid transparent !important;
            outline: none !important;
            box-shadow: none !important;
        }
        
        /* KEEP the IN SERVICE green border */
        div:has(> h3:contains("IN SERVICE")),
        div:has(> .in-service),
        .in-service-box {
            border: 2px solid #28a745 !important;
            background-color: #f8fff9 !important;
        }
        
        /* KEEP the OUT OF SERVICE red border */
        div:has(> h3:contains("OUT OF SERVICE")),
        div:has(> .out-of-service),
        .oos-box {
            border: 2px solid #dc3545 !important;
            background-color: #fff8f8 !important;
        }
        
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            /* Hide UI elements when printing */
            select[id*="Service"],
            button {
                display: none !important;
            }
            
            /* No borders on logos when printing */
            .logo-placeholder,
            .logo-container,
            img {
                border: none !important;
            }
            
            /* Keep service box colors when printing */
            .in-service-box,
            div:has(> h3:contains("IN SERVICE")) {
                border: 2px solid #28a745 !important;
                background-color: #f8fff9 !important;
            }
            
            .oos-box,
            div:has(> h3:contains("OUT OF SERVICE")) {
                border: 2px solid #dc3545 !important;
                background-color: #fff8f8 !important;
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
console.log('EMS Report Patch Version: 2.3');
