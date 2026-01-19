export const modals = {
    loadModals() {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        
        modalContainer.innerHTML = `
            <!-- Example Modal -->
            <div id="exampleModal" class="modal">
                <div class="modal-content">
                    <span class="close-button" id="closeExampleModal">&times;</span>
                    <h2>Example Modal</h2>
                    <p>This is an example modal content.</p>
                </div>
            </div>
        `;
        document.body.appendChild(modalContainer);
    }
};