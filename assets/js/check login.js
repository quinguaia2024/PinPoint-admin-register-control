/**
 * Verificação de Autenticação
 * Este script deve ser incluído em todas as páginas que requerem login
 * Coloque no início do <body> ou no <head> de cada página protegida
 */

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // Se não estiver autenticado, redirecionar para a página de login
    if (!isAuthenticated) {
        // Armazenar a página que o usuário tentou acessar
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        
        // Redirecionar para a página de login
        window.location.href = '../../index.html';
    }
    
    // Adicionar funcionalidade de logout
    const logoutElements = document.querySelectorAll('[data-logout]');
    logoutElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    });
});

/**
 * Função para realizar logout
 * Remove a autenticação e redireciona para a página de login
 */
function logout() {
    // Remover o status de autenticação
    localStorage.removeItem('isAuthenticated');
    
    // Redirecionar para a página de login
    window.location.href = '../../index.html';
}

// Opcional: Verificar inatividade do usuário (timeout após 30 minutos)
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, 30 * 60 * 1000); // 30 minutos
}

// Eventos que indicam atividade do usuário
window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keypress', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer);
window.addEventListener('click', resetInactivityTimer);

// Iniciar o timer quando a página carrega
resetInactivityTimer();