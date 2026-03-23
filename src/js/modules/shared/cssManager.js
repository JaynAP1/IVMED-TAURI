/**
 * CSS Manager — Centralized page style switching
 *
 * Manages activation/deactivation of page-specific CSS files
 * and applies scoping classes to the content container.
 */

const PAGE_STYLES = ["login", "home"];

/**
 * Switches the active page stylesheet.
 * Disables all page-specific CSS and enables only the requested one.
 * Also sets the scoping class on the #content container.
 *
 * @param {string} activePage - The page name to activate (e.g., 'login', 'home')
 */
export function switchPageStyle(activePage) {
    // Disable all page stylesheets, enable only the active one
    PAGE_STYLES.forEach((page) => {
        const link = document.getElementById(page);
        if (link) {
            link.disabled = page !== activePage;
        }
    });

    // Update scoping class on the content container
    const content = document.getElementById("content");
    if (content) {
        content.className = `page-${activePage}`;
    }
}
