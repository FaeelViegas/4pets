function warningToast(text) {
    let type = 'warning';
    let icon = 'fa-solid fa-triangle-exclamation';
    let title = 'Atenção';
    createToast(type, icon, title, text);
}

function errorToast(text) {
    let type = 'error';
    let icon = 'fa-solid fa-circle-exclamation';
    let title = 'Erro';
    createToast(type, icon, title, text);
}
function successToast(text) {
    let type = 'success';
    let icon = 'fa-solid fa-circle-check';
    let title = 'Sucesso';
    createToast(type, icon, title, text);
}
function infoToast(text) {
    let type = 'info';
    let icon = 'fa-solid fa-circle-info';
    let title = 'Info';
    createToast(type, icon, title, text);
}
let text;
let notifications = document.querySelector('.notifications');
function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
        <div class="toastt ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
            <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
        </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(
        () => newToast.remove(), 5000
    )
}