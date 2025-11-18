export function loaderfooter() {
    return fetch('/Assets/Modules/footer.html')
                .then(res => res.text())
                .then(data => {
                    document.getElementById('footer-module').innerHTML = data;
                })
}