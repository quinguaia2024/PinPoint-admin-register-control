document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // Credenciais válidas (apenas para demonstração)
    const validCredentials = {
        email: "admin@pinpoint.com",
        password: "1234"
    };

    // Mostrar notificação toast
    function showToast(message, isError = true) {
        const toastElement = toast.querySelector('div');
        toastElement.className = isError
            ? 'bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center toast'
            : 'bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center toast';

        toastMessage.textContent = message;
        toast.classList.remove('hidden');

        // Esconder toast após 3 segundos
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Verificar credenciais e redirecionar
    function authenticate(email, password) {
        if (email === validCredentials.email && password === validCredentials.password) {
            // Credenciais corretas - redirecionar para dashboard
            localStorage.setItem('isAuthenticated', 'true');
            window.location.href = 'pages/Dashboard/dashboard.html';
        } else {
            // Credenciais incorretas - mostrar erro
            showToast('Email ou senha incorretos');
        }
    }

    // Evento de submit do formulário
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        authenticate(email, password);
    });
});

