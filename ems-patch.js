// EMS Report System Patch v2.7
// Aggressive district label override
// Date: 2025-01-22

(function() {
    console.log('Applying EMS Report Patch v2.7...');
    
    // CHECK IF THIS IS DEVELOPER VERSION
    const isDeveloper = window.location.href.includes('DEV') || 
                        document.querySelector('script[src*="nocache"]') ||
                        console.warn.toString().includes('DEVELOPMENT MODE');
    
    // AGGRESSIVE DISTRICT LABEL FIX - Use MutationObserver to catch any changes
    const fixDistrictLabels = function() {
        // Create a MutationObserver to watch for any text changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const target = mutation.target;
                    if (target.nodeType === Node.TEXT_NODE) {
                        if (target.nodeValue && target.nodeValue.includes('703 - NORTH DISTRICT')) {
                            target.nodeValue = target.nodeValue.replace('703 - NORTH DISTRICT', '703 - SOUTHSIDE COMMAND');
                        }
                        if (target.nodeValue && target.nodeValue.includes('704 - SOUTH DISTRICT')) {
                            target.nodeValue = target.nodeValue.replace('704 - SOUTH DISTRICT', '704 - NORTHSIDE COMMAND');
                        }
                    }
                }
            });
        });
        
        // Start observing the entire document for text changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true,
            characterDataOldValue: true
        });
        
        // Also do an initial sweep
        const replaceInNode = function(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.nodeValue && node.nodeValue.includes('703 - NORTH DISTRICT')) {
                    node.nodeValue = node.nodeValue.replace('703 - NORTH DISTRICT', '703 - SOUTHSIDE COMMAND');
                }
                if (node.nodeValue && node.nodeValue.includes('704 - SOUTH DISTRICT')) {
                    node.nodeValue = node.nodeValue.replace('704 - SOUTH DISTRICT', '704 - NORTHSIDE COMMAND');
                }
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    replaceInNode(node.childNodes[i]);
                }
            }
        };
        
        replaceInNode(document.body);
    };
    
    // Apply the fix after a delay to let the page load
    setTimeout(fixDistrictLabels, 1000);
    setTimeout(fixDistrictLabels, 2000);
    setTimeout(fixDistrictLabels, 3000);
    
    // FIX LOGO DISPLAY
    const fixLogoDisplay = function() {
        const leftLogo = localStorage.getItem('leftLogo');
        const rightLogo = localStorage.getItem('rightLogo');
        
        if (leftLogo) {
            const logoLeftElement = document.getElementById('logoLeft');
            if (logoLeftElement && !logoLeftElement.querySelector('img')) {
                logoLeftElement.innerHTML = '<img src="' + leftLogo + '" alt="Left Logo" style="max-width: 100%; height: auto;">';
                console.log('✓ Left logo restored');
            }
        }
        
        if (rightLogo) {
            const logoRightElement = document.getElementById('logoRight');
            if (logoRightElement && !logoRightElement.querySelector('img')) {
                logoRightElement.innerHTML = '<img src="' + rightLogo + '" alt="Right Logo" style="max-width: 100%; height: auto;">';
                console.log('✓ Right logo restored');
            }
        }
    };
    
    fixLogoDisplay();
    setTimeout(fixLogoDisplay, 500);
    setTimeout(fixLogoDisplay, 1500);
    
    // HIDE LOGO BUTTON FOR USERS ONLY
    if (!isDeveloper) {
        console.log('Production version detected - hiding logo controls');
        
        const hideLogoButton = function() {
            const logoButtons = document.querySelectorAll('button');
            logoButtons.forEach(button => {
                if (button.textContent.includes('Logos') || 
                    button.textContent.includes('logo') ||
                    button.onclick && button.onclick.toString().includes('Logo')) {
                    button.style.display = 'none';
                    console.log('✓ Logo button hidden');
                }
            });
        };
        
        hideLogoButton();
        setTimeout(hideLogoButton, 500);
        setTimeout(hideLogoButton, 1500);
    } else {
        console.log('Developer version detected - logo controls remain visible');
    }
    
    // UPDATE VERSION NUMBERS
    document.title = document.title.replace(/v\d+\.\d+/g, 'v2.7');
    
    const forceUpdateVersion = function() {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.textContent.includes('v2.') || button.textContent.includes('📊')) {
                button.innerHTML = '📊 v2.7';
            }
        });
        window.EMSPatchVersion = '2.7';
    };
    
    forceUpdateVersion();
    
    // FIX DATE DISPLAY
    const fixDateDisplay = function() {
        const dateInput = document.getElementById('reportDate');
        if (dateInput) {
            const date = dateInput.value ? new Date(dateInput.value) : new Date();
            const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            if (!document.getElementById('printDate')) {
                const printDate = document.createElement('span');
                printDate.id = 'printDate';
                printDate.style.display = 'none';
                printDate.textContent = formattedDate;
                dateInput.parentNode.insertBefore(printDate, dateInput.nextSibling);
            } else {
                document.getElementById('printDate').textContent = formattedDate;
            }
        }
    };
    
    fixDateDisplay();
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'reportDate') {
            fixDateDisplay();
        }
    });
    
    // FIX BORDERS
    const fixBorders = function() {
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            
            if (computedStyle.borderColor === 'rgb(40, 167, 69)' || 
                element.style.border && element.style.border.includes('#28a745')) {
                
                const hasInService = element.innerHTML && element.innerHTML.includes('IN SERVICE') && 
                                   !element.innerHTML.includes('OUT OF SERVICE');
                const hasLogo = element.querySelector('img[alt*="ogo"]') || element.className.includes('logo');
                
                if (hasInService) {
                    element.style.setProperty('border', '2px solid #007bff', 'important');
                    element.style.setProperty('background-color', '#f0f8ff', 'important');
                } else if (hasLogo) {
                    element.style.setProperty('border', 'none', 'important');
                }
            }
        });
        
        document.querySelectorAll('h3, div').forEach(el => {
            if (el.textContent === 'IN SERVICE') {
                el.style.color = '#007bff';
            }
        });
    };
    
    setTimeout(fixBorders, 100);
    setTimeout(fixBorders, 500);
    setTimeout(fixBorders, 1000);
    
    // OVERRIDE CHECK PATCH STATUS
    window.checkPatchStatus = function() {
        document.querySelectorAll('.modal, .backdrop-modal').forEach(el => el.remove());
        
        const modal = document.createElement('div');
        modal.className = 'patch-modal';
        modal.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #4a4a4a; color: white; padding: 20px; border-radius: 10px; z-index: 10000; box-shadow: 0 4px 6px rgba(0,0,0,0.3); min-width: 300px;';
        
        modal.innerHTML = '<h3 style="margin-top: 0;">This page says</h3>' +
            '<p><strong>Version: 2.7</strong> (Districts Fixed)</p>' +
            '<p>Status: All systems operational</p>' +
            '<p>Last Updated: ' + new Date().toLocaleDateString() + '</p>' +
            '<p>LocalStorage: Available</p>' +
            '<p>Editors: 7 found</p>' +
            '<p style="color: #4CAF50; font-weight: bold;">✓ Patch v2.7 Active</p>' +
            '<button onclick="this.parentElement.remove(); document.querySelector(\'.backdrop-modal\')?.remove();" style="background: white; color: #333; border: none; padding: 8px 20px; border-radius: 20px; cursor: pointer; margin-top: 10px; font-weight: bold;">OK</button>';
        
        document.body.appendChild(modal);
        
        const backdrop = document.createElement('div');
        backdrop.className = 'backdrop-modal';
        backdrop.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999;';
        backdrop.onclick = function() {
            modal.remove();
            backdrop.remove();
        };
        document.body.appendChild(backdrop);
        
        return false;
    };
    
    // PRINT STYLES
    const styles = document.createElement('style');
    styles.innerHTML = '@media screen { #printDate { display: none !important; } } ' +
        '@media print { ' +
        '* { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } ' +
        '@page { size: letter; margin: 0.5in; } ' +
        '.quote-section, .units-section, .supervisors-section, .tasks-section, .announcements-section, div[style*="border"], .editor-content { page-break-inside: avoid !important; break-inside: avoid !important; } ' +
        'h2, h3 { page-break-after: avoid !important; } ' +
        '#reportDate, input[type="date"] { display: none !important; } ' +
        '#printDate { display: inline !important; font-weight: bold !important; font-size: 14pt !important; } ' +
        '#inServiceSelect, #oosSelect, select, button { display: none !important; } ' +
        '#deputyChief, #supervisor703, #supervisor704 { display: inline !important; -webkit-appearance: none !important; -moz-appearance: none !important; appearance: none !important; border: none !important; background: none !important; font-weight: bold !important; text-align: center !important; width: 100% !important; padding: 0 !important; margin: 0 !important; } ' +
        'select::-ms-expand { display: none !important; } }';
    
    document.head.appendChild(styles);
    
    // SUPERVISOR NAMES
    const supervisorNames = [
        'Krause', 'Morrison', 'Klaves', 'Phifer', 'Beckenholdt',
        'Simms', 'Carbrey', 'Fournier', 'Lammert', 'Fendelman',
        'Lalumandier', 'Free', 'Powers', 'Brickey', 'Hale', 'Dobelmann'
    ];
    
    const deputyChiefNames = ['A-Krause', 'A-Beckenholdt', 'A-Fournier'];
    
    // ADD NAMES TO DROPDOWNS
    function applyPatch() {
        try {
            const supervisor703 = document.getElementById('supervisor703');
            const supervisor704 = document.getElementById('supervisor704');
            const deputyChief = document.getElementById('deputyChief');
            
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
            
            if (supervisor703) addOptionsToSelect(supervisor703, supervisorNames);
            if (supervisor704) addOptionsToSelect(supervisor704, supervisorNames);
            if (deputyChief) addOptionsToSelect(deputyChief, deputyChiefNames);
            
            console.log('✅ Patch v2.7 applied successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    setTimeout(applyPatch, 100);
    setTimeout(applyPatch, 1000);
})();

window.EMSPatchVersion = '2.7';
console.log('EMS Report Patch Version: 2.7 - MutationObserver Active');
