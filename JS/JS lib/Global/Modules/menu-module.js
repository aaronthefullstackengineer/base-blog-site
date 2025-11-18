export function loadMenuModule() {
    return fetch('/Assets/Modules/menu.html')
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.text();
        })
        .then(data => {
            document.getElementById('navbar-module').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading menu module:', error);
        });
}
