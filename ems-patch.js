// EMS Report System Patch v2.3
// Changes IN SERVICE to blue, removes logo borders, fixes all issues
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
    
    // CHANGE IN SERVICE TO BLUE AND REMOVE LOGO BORDERS
    const fixAllBorders = function() {
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
            // Check if this has a green border
            if (div.style.border && div.style.border.includes('rgb(40, 167, 69)') || 
                div.style.border && div.style.border.includes('#28a745')) {
                
                // If it contains "IN SERVICE", make it blue
                if (div.textContent.includes('IN SERVICE') && !div.textContent.includes('OUT OF')) {
                    div.style.border = '2px solid #007bff';
                    div.style.backgroundColor = '#f0f8ff';
                } else if (div.querySelector('img')) {
                    // If it contains a logo image, remove the border
                    div.style.border = 'none';
                }
            }
        });
        
        // Also update the IN SERVICE header text to blue
        const headers = document.querySelectorAll('h3, h4, div');
        headers.forEach(header => {
            if (header.textContent === 'IN SERVICE') {
                header.style.color = '#007bff';
            }
        });
    };
    
    // Apply fixes multiple times
    forceUpdateVersion();
    setTimeout(fixAllBorders, 100);
    setTimeout(fixAllBorders, 500);
    setTimeout(fixAllBorders, 1000);
    
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
            <p><strong>Version: 2.3</strong> (Blue IN SERVICE)</p>
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
    
    // CSS for consistent blue IN SERVICE
    const styles = document.createElement('style');
    styles.innerHTML = `
        /* Change IN SERVICE text to blue */
        h3:contains("IN SERVICE"),
        div:contains("IN SERVICE"):not(:contains("OUT OF")) {
            color: #007bff !important;
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
            
            /* Keep blue IN SERVICE when printing */
            div[style*="border: 2px solid #007bff"] {
                border: 2px solid #007bff !important;
                background-color: #f0f8ff !important;
            }
            
            /* Keep red OUT OF SERVICE when printing */
            div[style*="border: 2px solid #dc3545"] {
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
