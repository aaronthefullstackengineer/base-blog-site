export function loadHeader() {
    return fetch('/Assets/Modules/header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-module').innerHTML = data;
        });
}
