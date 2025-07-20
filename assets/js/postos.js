    // Atualizar o contador de notificações quando uma notificação for clicada
        document.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const notificationCount = document.querySelector('.notification-btn span');
                if (notificationCount) {
                    let count = parseInt(notificationCount.textContent);
                    if (count > 0) {
                        count--;
                        notificationCount.textContent = count.toString();
                        if (count === 0) {
                            notificationCount.classList.add('hidden');
                        }
                    }
                }
            });
        });
  
  
  document.addEventListener('DOMContentLoaded', function () {
            // Controle do dropdown de notificações
            const notificationBtn = document.querySelector('.notification-btn');
            const notificationsDropdown = document.querySelector('.notifications-dropdown');

            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (!notificationBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                    notificationsDropdown.classList.remove('show');
                }
            });

            // Controle do modal de detalhes
            const stationModal = document.getElementById('station-modal');
            const closeStationModal = document.getElementById('close-station-modal');
            const viewButtons = document.querySelectorAll('.view-btn');

            viewButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    stationModal.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                });
            });

            closeStationModal.addEventListener('click', () => {
                stationModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            });

            stationModal.addEventListener('click', (e) => {
                if (e.target === stationModal) {
                    stationModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';
                }
            });

            // Controle dos botões de ativar/desativar
            const deactivateButtons = document.querySelectorAll('.deactivate-btn');
            const activateButtons = document.querySelectorAll('.activate-btn');

            deactivateButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (confirm('Tem certeza que deseja desativar este posto?')) {
                        // Lógica para desativar o posto
                        btn.innerHTML = '<i class="fas fa-toggle-off"></i>';
                        btn.classList.remove('deactivate-btn');
                        btn.classList.add('activate-btn');

                        // Atualizar o status na tabela
                        const row = btn.closest('tr');
                        const statusCell = row.querySelector('td:nth-child(4)');
                        statusCell.innerHTML = '<span class="status-inactive px-2 py-1 text-xs font-medium rounded-full">Inativo</span>';
                    }
                });
            });

            activateButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (confirm('Tem certeza que deseja ativar este posto?')) {
                        // Lógica para ativar o posto
                        btn.innerHTML = '<i class="fas fa-toggle-on"></i>';
                        btn.classList.remove('activate-btn');
                        btn.classList.add('deactivate-btn');

                        // Atualizar o status na tabela
                        const row = btn.closest('tr');
                        const statusCell = row.querySelector('td:nth-child(4)');
                        statusCell.innerHTML = '<span class="status-active px-2 py-1 text-xs font-medium rounded-full">Ativo</span>';
                    }
                });
            });

            // Filtros
            const filterButtons = document.querySelectorAll('.filter-btn');

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterButtons.forEach(b => b.classList.remove('active', 'bg-green-600', 'text-white'));
                    btn.classList.add('active', 'bg-green-600', 'text-white');
                    // Lógica para filtrar os postos (implementar conforme necessidade)
                });
            });
        });
    