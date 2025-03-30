let stompClient = null;

function conectar() {
    let socket = new SockJS('http://localhost:8080/ws'); 
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function () {
        let tema = document.getElementById("tema").value;
        let topico = "/topic/" + tema;

        stompClient.subscribe(topico, function (mensagem) {
            let texto = mensagem.body;
            let li = document.createElement("li");
            li.textContent = texto;
            document.getElementById("mensagens").appendChild(li);
        });

        alert("Conectado ao tópico: " + tema);
    });
}

function desconectar() {
    if (stompClient !== null) {
        stompClient.disconnect();
        alert("Desconectado");
    }
}