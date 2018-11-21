onload = () => {
    const name = document.querySelector('#username');
    const password = document.querySelector('#password');
    const button = document.querySelector('#button');
    const error = document.querySelector('#error');

    button.onclick = async () => {
        const data = {name: name.value, password: password.value};
        const result = await fetch("/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const answer = await result.json();
        if(answer.ok){
            window.location.href = '/session';
        } else {
            error.innerHTML = 'Brugernavn eller kodeord er forkert';
        }
    }
};