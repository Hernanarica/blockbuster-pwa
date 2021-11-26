// Escucho si el usuario se desconecta, y ejecuto algo
window.addEventListener("offline", (event) => {
	console.log('offline');
	window.location.href = 'offline.html';
});

// Escucho si el usuario tiene conexion
window.addEventListener("online", (event) => {
	console.log('online');
	location.href = 'index.html';
});

// Escucho si el navegador esta online o no, util en los casos que entro sin conexion.
if (!navigator.onLine) {
	console.log("estoy sin conexion!!");
}