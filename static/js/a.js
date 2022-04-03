const a = async () => {
    let r = await fetch('/lp');
    if (r.status !== 200) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await a();
    } else {
        let m = await r.json();
        console.log(m);
        addMessage(m.mess)
        await a();
    }
}
const b = () => {
    let elem = document.querySelector('#mess').value;
    let data = {mess: elem};
    console.log(elem);
    fetch('/mess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

const addMessage = (message) => {
    const messagesDom = document.querySelector('#messages');
    const textNode = document.createTextNode(message);
    const newElem = document.createElement('p');
    newElem.appendChild(textNode);
    messagesDom.appendChild(newElem);
}
document.querySelector('#btn')
    .addEventListener('click', b);

a();