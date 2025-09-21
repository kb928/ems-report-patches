// EMS Report System Patch v2.1
// Auto-updates on every page load
// Last updated: 2025-01-20

console.log('[EMS Patch] Loading version 2.1...');

(function() {
    function applyPatch() {
        console.log('[EMS Patch] Applying fixes...');
        
        // Fix 1: In-Service unit dropdown
        const inServiceSelect = document.getElementById("inServiceSelect");
        if (inServiceSelect) {
            inServiceSelect.removeAttribute("onchange");
            inServiceSelect.addEventListener("change", function() {
                if (this.value) {
                    addInServiceUnit(this.value);
                    this.value = "";
                }
            });
            console.log('[EMS Patch] ✓ In-Service dropdown fixed');
        }
        
        // Fix 2: OOS unit dropdown
        const oosSelect = document.getElementById("oosSelect");
        if (oosSelect) {
            oosSelect.removeAttribute("onchange");
            oosSelect.addEventListener("change", function() {
                if (this.value) {
                    addOOSUnit(this.value);
                    this.value = "";
                }
            });
            console.log('[EMS Patch] ✓ OOS dropdown fixed');
        }
        
        // Fix 3: Update version indicator - CORRECTED SELECTOR
        const versionButtons = document.querySelectorAll('.lock-button');
        versionButtons.forEach(btn => {
            if (btn.textContent.includes('v2.0') || btn.textContent.includes('📊')) {
                btn.textContent = '📊 v2.1 ✓';
                btn.style.background = '#28a745';
                console.log('[EMS Patch] ✓ Version updated to 2.1');
            }
        });
        
        // Fix 4: Auto-enable embedded logos
        const leftImage = document.getElementById('leftImage');
        const rightImage = document.getElementById('rightImage');
        if (leftImage && rightImage) {
            leftImage.classList.add('has-embedded-logo');
            rightImage.classList.add('has-embedded-logo');
            localStorage.setItem('use_embedded_logos', 'true');
            console.log('[EMS Patch] ✓ Logos enabled');
        }
        
        console.log('[EMS Patch] ✅ All patches applied');
    }
    
    // Wait for DOM if needed
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyPatch);
    } else {
        setTimeout(applyPatch, 100);
    }
})();
