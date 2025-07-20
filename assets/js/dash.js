  document.addEventListener('DOMContentLoaded', function () {
            const notificationBtn = document.querySelector('.notification-btn');
            const notificationsDropdown = document.querySelector('.notifications-dropdown');
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            const sidebarClose = document.querySelector('.sidebar-close');

            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('show');
            });

            document.addEventListener('click', (e) => {
                if (!notificationBtn.contains(e.target) && !notificationsDropdown.contains(e.target)) {
                    notificationsDropdown.classList.remove('show');
                }
            });

            window.addEventListener('scroll', () => {
                notificationsDropdown.classList.remove('show');
            });

            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.add('active');
            });

            sidebarClose.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });

            const requestsData = [
                {
                    id: 1,
                    name: "Posto Ipiranga",
                    date: "15/05/2023",
                    status: "pending",
                    representative: "João da Silva",
                    location: "Av. Paulista, 1000 - São Paulo/SP",
                    type: "Gasolina e Diesel",
                    email: "joao@postoipiranga.com.br",
                    phone: "(11) 99999-9999",
                    documents: [
                        { name: "CNPJ.pdf", type: "pdf", size: "2.4 MB" },
                        { name: "Foto da Fachada.jpg", type: "image", size: "1.8 MB" },
                        { name: "Alvará de Funcionamento.pdf", type: "pdf", size: "3.1 MB" }
                    ]
                },
                {
                    id: 2,
                    name: "Posto Shell",
                    date: "10/05/2023",
                    status: "approved",
                    representative: "Maria Oliveira",
                    location: "Rua Augusta, 500 - São Paulo/SP",
                    type: "Gasolina, Diesel e Elétrico",
                    email: "maria@postoshell.com.br",
                    phone: "(11) 98888-8888",
                    documents: [
                        { name: "CNPJ.pdf", type: "pdf", size: "2.1 MB" },
                        { name: "Licença Ambiental.pdf", type: "pdf", size: "4.2 MB" }
                    ]
                },
                {
                    id: 3,
                    name: "Posto BR",
                    date: "20/05/2023",
                    status: "pending",
                    representative: "Carlos Souza",
                    location: "Av. Brasil, 2000 - São Paulo/SP",
                    type: "Todos os combustíveis",
                    email: "carlos@postobr.com.br",
                    phone: "(11) 97777-7777",
                    documents: [
                        { name: "Contrato Social.pdf", type: "pdf", size: "5.3 MB" },
                        { name: "Foto do Local.jpg", type: "image", size: "2.5 MB" }
                    ]
                },
                {
                    id: 4,
                    name: "Posto Petrobras",
                    date: "05/05/2023",
                    status: "rejected",
                    representative: "Ana Santos",
                    location: "Rua da Consolação, 300 - São Paulo/SP",
                    type: "Gasolina Aditivada",
                    email: "ana@postopetrobras.com.br",
                    phone: "(11) 96666-6666",
                    documents: [
                        { name: "Documentação Completa.pdf", type: "pdf", size: "8.7 MB" }
                    ],
                    rejectionReason: "Documentação incompleta"
                }
            ];

            const modal = document.getElementById('details-modal');
            const closeBtn = document.getElementById('close-modal');
            const requestsContainer = document.getElementById('requests-container');
            const documentsContainer = document.getElementById('documents-container');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');

            let currentFilter = 'all';
            let currentRequestId = null;

            function loadRequests(filter = 'all') {
                requestsContainer.innerHTML = '';

                const filteredRequests = filter === 'all'
                    ? requestsData
                    : requestsData.filter(req => req.status === filter);

                if (filteredRequests.length === 0) {
                    requestsContainer.innerHTML = `
                        <div class="col-span-full text-center py-10">
                            <i class="fas fa-inbox text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">Nenhuma solicitação encontrada</p>
                        </div>
                    `;
                    return;
                }

                filteredRequests.forEach((request, index) => {
                    const statusClass = {
                        pending: 'status-pending',
                        approved: 'status-approved',
                        rejected: 'status-rejected'
                    }[request.status];

                    const statusText = {
                        pending: 'Pendente',
                        approved: 'Aprovado',
                        rejected: 'Rejeitado'
                    }[request.status];

                    const card = document.createElement('div');
                    card.className = `bg-white rounded-xl shadow-md overflow-hidden card-hover fade-in`;
                    card.style.animationDelay = `${index * 0.1}s`;

                    card.innerHTML = `
                        <div class="p-5 border-b border-gray-200">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-bold text-lg text-gray-800">${request.name}</h3>
                                    <p class="text-gray-600 text-sm">Solicitado em: ${request.date}</p>
                                </div>
                                <span class="${statusClass} text-xs font-medium px-2.5 py-0.5 rounded-full">${statusText}</span>
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Representante</h4>
                                <p class="text-gray-800">${request.representative}</p>
                            </div>
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Localização</h4>
                                <p class="text-gray-800">${request.location}</p>
                            </div>
                            <div class="mb-4">
                                <h4 class="text-sm font-medium text-gray-500 mb-1">Tipo de Posto</h4>
                                <p class="text-gray-800">${request.type}</p>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
                            <button class="view-details-btn px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500" data-id="${request.id}">
                                <i class="fas fa-eye mr-2"></i>Ver Detalhes
                            </button>
                        </div>
                    `;

                    requestsContainer.appendChild(card);
                });

                document.querySelectorAll('.view-details-btn').forEach(btn => {
                    btn.addEventListener('click', () => openDetailsModal(btn.dataset.id));
                });
            }

            function openDetailsModal(requestId) {
                const request = requestsData.find(req => req.id === parseInt(requestId));
                if (!request) return;

                currentRequestId = requestId;

                documentsContainer.innerHTML = '';
                request.documents.forEach(doc => {
                    const iconClass = doc.type === 'pdf' ? 'fa-file-pdf text-red-500' :
                        doc.type === 'image' ? 'fa-file-image text-green-500' :
                            'fa-file-alt text-blue-500';

                    const docElement = document.createElement('div');
                    docElement.className = 'flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition';
                    docElement.innerHTML = `
                        <i class="fas ${iconClass} mr-3 text-xl"></i>
                        <div class="flex-1">
                            <p class="font-medium text-gray-800">${doc.name}</p>
                            <p class="text-xs text-gray-500">${doc.size}</p>
                        </div>
                        <button class="download-btn ml-2 p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="view-btn ml-1 p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-gray-100">
                            <i class="fas fa-expand"></i>
                        </button>
                    `;
                    documentsContainer.appendChild(docElement);
                });

                if (request.status === 'rejected' && request.rejectionReason) {
                    const rejectionElement = document.createElement('div');
                    rejectionElement.className = 'mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r';
                    rejectionElement.innerHTML = `
                        <div class="flex">
                            <i class="fas fa-exclamation-circle text-red-500 mr-2 mt-1"></i>
                            <div>
                                <h4 class="font-medium text-red-800">Motivo da Rejeição</h4>
                                <p class="text-sm text-red-600">${request.rejectionReason}</p>
                            </div>
                        </div>
                    `;
                    documentsContainer.appendChild(rejectionElement);
                }

                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }

            function showToast(message, isSuccess = true) {
                const toastElement = toast.querySelector('div');
                toastElement.className = isSuccess
                    ? 'bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-300'
                    : 'bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center transform transition-all duration-300';

                toastMessage.textContent = message;
                toast.classList.remove('hidden');

                setTimeout(() => {
                    toastElement.classList.remove('translate-y-10', 'opacity-0');
                    toastElement.classList.add('translate-y-0', 'opacity-100');
                }, 10);

                setTimeout(() => {
                    toastElement.classList.remove('translate-y-0', 'opacity-100');
                    toastElement.classList.add('translate-y-10', 'opacity-0');

                    setTimeout(() => {
                        toast.classList.add('hidden');
                    }, 300);
                }, 3000);
            }

            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('active')) return;

                    filterButtons.forEach(b => b.classList.remove('active', 'bg-green-600', 'text-white'));

                    if (btn.dataset.filter) {
                        currentFilter = btn.dataset.filter;
                        btn.classList.add('active', 'bg-green-600', 'text-white');
                    } else {
                        currentFilter = 'all';
                        btn.classList.add('active', 'bg-green-600', 'text-white');
                    }

                    loadRequests(currentFilter);
                });
            });

            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            const approvalForm = document.getElementById('approval-form');
            approvalForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const latitude = document.getElementById('latitude').value;
                const longitude = document.getElementById('longitude').value;
                const officialName = document.getElementById('official-name').value;

                if (!latitude || !longitude || !officialName) {
                    showToast('Preencha todos os campos obrigatórios', false);
                    return;
                }

                const requestIndex = requestsData.findIndex(req => req.id === parseInt(currentRequestId));
                if (requestIndex !== -1) {
                    requestsData[requestIndex].status = 'approved';
                    showToast('Posto aprovado com sucesso!');
                    loadRequests(currentFilter);
                    closeModal();
                }
            });

            const rejectBtn = document.getElementById('reject-btn');
            rejectBtn.addEventListener('click', () => {
                const reason = prompt('Digite o motivo da rejeição:');
                if (reason) {
                    const requestIndex = requestsData.findIndex(req => req.id === parseInt(currentRequestId));
                    if (requestIndex !== -1) {
                        requestsData[requestIndex].status = 'rejected';
                        requestsData[requestIndex].rejectionReason = reason;
                        showToast('Posto rejeitado com sucesso');
                        loadRequests(currentFilter);
                        closeModal();
                    }
                }
            });

            document.querySelectorAll('.tooltip').forEach(el => {
                el.addEventListener('mouseover', () => {
                    const tooltip = document.createElement('div');
                    tooltip.className = 'absolute z-50 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap';
                    tooltip.textContent = el.dataset.tooltip;
                    tooltip.style.top = `${el.offsetTop - 30}px`;
                    tooltip.style.left = `${el.offsetLeft}px`;
                    el.appendChild(tooltip);

                    el.addEventListener('mouseout', () => {
                        tooltip.remove();
                    }, { once: true });
                });
            });

            loadRequests();

            setTimeout(() => {
                showToast('Bem-vindo ao painel de administração!');
            }, 1000);
        });