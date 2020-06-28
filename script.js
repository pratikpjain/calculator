
var dil = document.getElementsByClassName("key");
for (let i = 0; i < 20; i++) {
    dil[i].addEventListener('click', function () {
        write(dil[i].innerHTML);
    });
}
document.querySelector('.clear').addEventListener('click', function () {
    document.querySelector('audio').play();
    document.querySelector('.screen').value = '';
});
document.querySelector('.back').addEventListener('click', backfun);
function backfun() {
    document.querySelector('audio').play();
    let x = document.querySelector('.screen').value;
    if (x === 'Syntax Error' || x === 'Math Error')
        document.querySelector('.screen').value = '';
    else {
        var len = x.length;
        document.querySelector('.screen').value = x.slice(0, len - 1)
    }
}
function write(ch) {
    if (ch === '/')
        ch = '÷';
    if (ch === '*')
        ch = 'x';
    if ((ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57 || ch === '+' || ch === '*' || ch === '-' || ch === '/' || ch === '%' || ch === '.' || ch === '^' || ch === '÷' || ch === 'x')) {
        document.querySelector('audio').play();
        let x = document.querySelector('.screen').value;
        if (x === 'Math Error' || x === 'Syntax Error')
            document.querySelector('.screen').value = '';
        document.querySelector('.screen').value += ch;
    }
    else if (ch === '=' || ch === 'Enter') {
        equalfun();
    }
}
document.addEventListener('keypress', function () { write(event.key) });
document.addEventListener('keydown', function (event) {
    let ch = event.key;
    if (ch === 'Backspace') {
        backfun();
    }
});
function equalfun() {
    document.querySelector('audio').play();
    let x = document.querySelector('.screen').value;
    if (x === 'Math Error' || x === 'Syntax Error')
        document.querySelector('.screen').value = '';
    x = document.querySelector('.screen').value;
    if (x.includes('%')) {
        while (x.includes('%') === true) {
            let temp = x.indexOf('%');
            if (x.charCodeAt(temp + 1) >= 48 && x.charCodeAt(temp + 1) <= 57)
                x = '-';
            else
                x = x.replace('%', '/100');
        }
    }
    if (x.includes('^')) {
        if (x.includes('^^'))
            x = '-'
        while (x.includes('^') === true)
            x = x.replace('^', '**')
    }
    if (x.includes('÷')) {
        if (x.includes('÷÷'))
            x = '-'
        while (x.includes('÷') === true)
            x = x.replace('÷', '/')
    }
    if (x.includes('x')) {
        if (x.includes('xx'))
            x = '-'
        while (x.includes('x') === true)
            x = x.replace('x', '*')
    }
    if (x != '' && x != 'Math Error' && x != 'Syntax Error') {
        try {
            if (eval(x) === Infinity) {
                document.querySelector('.screen').value = 'Math Error';
            }
            else {
                document.querySelector('.screen').value = eval(x);
            }
        }
        catch (err) {
            document.querySelector('.screen').value = 'Syntax Error';
        }
    }
}