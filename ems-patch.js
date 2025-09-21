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
        
        // Add version indicator to page
        const versionBtn = document.querySelector('.lock-button[onclick="checkPatchStatus()"]');
        if (versionBtn) {
            versionBtn.textContent = '📊 v2.1 (Patched)';
        }
        
        console.log('[EMS Patch] ✅ All patches applied successfully');
    }
    
    // Wait for DOM if needed
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyPatch);
    } else {
        setTimeout(applyPatch, 100); // Small delay to ensure everything is loaded
    }
})();
