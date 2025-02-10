import './modal.css'

export function functionalWindow() {

    return `
    <div class="modal">
        <div class="modal-header">
            <h2>12МК-3-5</h2>
            <span class="close-btn" onclick="closeWindow('menu-container')">&times;</span>
        </div>
        <div class="modal-body">
            <p>Кран шаровой с пневмоприводом фланцевый</p>
            <button class="button">Поменять материал</button>
            
            <div class="section">
                <div class="section-header" onclick="toggleSection('properties')">Основные свойства ▼</div>
                <div class="section-content" id="properties">
                    <div class="property"><span>Диаметр:</span><span>80 мм</span></div>
                    <div class="property"><span>Давление:</span><span>10,0 МПа</span></div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-header" onclick="toggleSection('coordinates')">Координаты ▼</div>
                <div class="section-content" id="coordinates">
                    <div class="property"><span>x:</span><span>1</span></div>
                    <div class="property"><span>y:</span><span>2</span></div>
                    <div class="property"><span>z:</span><span>3</span></div>
                </div>
            </div>
        </div>
    </div>
`
}