(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const dialog = document.querySelector('#plan-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogPrice = document.querySelector('#dialog-price');
  const dialogFeatures = document.querySelector('#dialog-features');
  const closeDialog = document.querySelector('.dialog-close');

  const plans = {
    essencial: {
      title: 'Essencial', price: 'R$ 39,00 / mês', features: ['1 consulta por ano', '2 limpezas por ano', '1 kit de higiene oral na adesão', '10% de desconto em procedimentos básicos.']
    },
    mais: {
      title: 'Mais', price: 'R$ 59,00 / mês', features: ['2 consultas por ano', '2 limpezas por ano', '2 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '20% de desconto em procedimentos básicos e 10% nos demais.']
    },
    premium: {
      title: 'Premium', price: 'R$ 79,00 / mês', features: ['2 consultas por ano', '2 limpezas por ano', '2 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '25% de desconto em procedimentos básicos e 15% nos demais.']
    },
    'premium-plus': {
      title: 'Premium Plus', price: 'R$ 99,00 / mês', features: ['3 consultas por ano', '3 limpezas por ano', '3 raios-x simples por ano', '1 urgência por ano', 'Kit de higiene oral na adesão', '30% de desconto em procedimentos básicos e 20% nos demais.']
    },
    familia: {
      title: 'Clube do Sorriso Família', price: 'Condições especiais para famílias', features: ['+1 limpeza por pessoa, sem urgência', '15% de desconto em procedimentos básicos', '5% de desconto em implantes, próteses, estética e ortodontia.']
    }
  };

  function openPlan(key) {
    const plan = plans[key];
    if (!plan) return;
    dialogTitle.textContent = plan.title;
    dialogPrice.textContent = plan.price;
    dialogFeatures.innerHTML = '';
    plan.features.forEach((feature) => {
      const item = document.createElement('li');
      item.textContent = feature;
      dialogFeatures.appendChild(item);
    });
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  document.querySelectorAll('.plan-more').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.closest('[data-plan]')?.dataset.plan || button.dataset.plan;
      openPlan(key);
    });
  });

  closeDialog?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
      mainNav?.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (!link) return;
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => observer.observe(section));
})();


// mensagem da LGPD //
function acceptLgpd() {
  localStorage.setItem('lgpd_consent', 'accepted');
  document.getElementById('lgpd-toast').style.display = 'none';
}

function closeLgpd() {
  localStorage.setItem('lgpd_consent', 'essential');
  document.getElementById('lgpd-toast').style.display = 'none';
}

// Verifica se o usuário já aceitou
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('lgpd_consent')) {
    const toast = document.getElementById('lgpd-toast');
    if (toast) toast.style.display = 'none';
  }
});


// grid listagem conta
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    red: '#C80012',
                    redDark: '#A0000E',
                    redLight: '#FFF0F1',
                    grayBg: '#FAFAFA',
                    textDark: '#333333'
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}


// Sample Patient Data
        let patients = [
            { id: 'PAC-001', name: 'Ana Beatriz Souza', cpf: '123.456.789-00', phone: '(11) 98765-4321', lastConsult: '12/09/2026', nextConsult: '24/10/2026', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
            { id: 'PAC-002', name: 'Carlos Eduardo Lima', cpf: '234.567.890-11', phone: '(11) 97654-3210', lastConsult: '05/08/2026', nextConsult: '18/10/2026', status: 'Pendente', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
            { id: 'PAC-003', name: 'Fernanda Oliveira', cpf: '345.678.901-22', phone: '(11) 96543-2109', lastConsult: '20/09/2026', nextConsult: '15/11/2026', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
            { id: 'PAC-004', name: 'Gabriel Santos', cpf: '456.789.012-33', phone: '(11) 95432-1098', lastConsult: '10/05/2026', nextConsult: '--', status: 'Concluído', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
            { id: 'PAC-005', name: 'Juliana Paes Costa', cpf: '567.890.123-44', phone: '(11) 94321-0987', lastConsult: '28/09/2026', nextConsult: '30/10/2026', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100' },
            { id: 'PAC-006', name: 'Roberto Almeida', cpf: '678.901.234-55', phone: '(11) 93210-9876', lastConsult: '14/07/2026', nextConsult: '22/10/2026', status: 'Pendente', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
            { id: 'PAC-007', name: 'Patricia Mendes', cpf: '789.012.345-66', phone: '(11) 92109-8765', lastConsult: '01/10/2026', nextConsult: '05/12/2026', status: 'Ativo', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' }
        ];

        let currentPage = 1;
        const itemsPerPage = 5;
        let filteredPatients = [...patients];

        // On Page Load
        window.onload = function() {
            renderTable();
        };

        // Render Table Rows and Pagination
        function renderTable() {
            const tbody = document.getElementById('tableBody');
            const noResults = document.getElementById('noResults');
            tbody.innerHTML = '';

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const pageData = filteredPatients.slice(startIndex, endIndex);

            if (filteredPatients.length === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }

            pageData.forEach(item => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-red-50/20 transition-colors border-b border-gray-100';

                // Status Badge Color
                let statusBadge = '';
                if (item.status === 'Ativo') {
                    statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center w-max gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Ativo</span>';
                } else if (item.status === 'Pendente') {
                    statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center w-max gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Pendente</span>';
                } else {
                    statusBadge = '<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 flex items-center w-max gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>Concluído</span>';
                }

                tr.innerHTML = `
                    <td class="py-3.5 px-4 font-medium text-xs text-gray-500">${item.id}</td>
                    <td class="py-3.5 px-4">
                        <div class="flex items-center space-x-3">
                            <img src="${item.avatar}" alt="${item.name}" class="w-8 h-8 rounded-full object-cover border border-gray-200" onerror="this.src='https://placehold.co/100x100/C80012/ffffff?text=${item.name.charAt(0)}'">
                            <span class="font-medium text-gray-800">${item.name}</span>
                        </div>
                    </td>
                    <td class="py-3.5 px-4 text-gray-600">${item.cpf}</td>
                    <td class="py-3.5 px-4 text-gray-600">${item.phone}</td>
                    <td class="py-3.5 px-4 text-gray-600">${item.lastConsult}</td>
                    <td class="py-3.5 px-4 font-medium text-brand-red">${item.nextConsult}</td>
                    <td class="py-3.5 px-4">${statusBadge}</td>
                    <td class="py-3.5 px-4 text-center">
                        <div class="flex items-center justify-center space-x-2">
                            <button onclick="viewPatient('${item.id}')" title="Visualizar" class="p-1.5 text-gray-400 hover:text-brand-red hover:bg-red-50 rounded-lg transition-all">
                                <i class="fa-regular fa-eye"></i>
                            </button>
                            <button onclick="editPatient('${item.id}')" title="Editar" class="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                <i class="fa-regular fa-pen-to-square"></i>
                            </button>
                            <button onclick="deletePatient('${item.id}')" title="Excluir" class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            updatePaginationInfo();
        }

        // Filter Functionality
        function filterData() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const statusValue = document.getElementById('statusFilter').value;

            filteredPatients = patients.filter(patient => {
                const matchesSearch = patient.name.toLowerCase().includes(searchValue) ||
                                      patient.cpf.includes(searchValue) ||
                                      patient.phone.includes(searchValue);
                
                const matchesStatus = statusValue === 'ALL' || patient.status === statusValue;

                return matchesSearch && matchesStatus;
            });

            currentPage = 1;
            renderTable();
        }

        // Pagination Info Render
        function updatePaginationInfo() {
            const total = filteredPatients.length;
            const start = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
            const end = Math.min(currentPage * itemsPerPage, total);

            document.getElementById('showingCount').innerText = `${start}-${end} de ${total}`;

            const totalPages = Math.ceil(total / itemsPerPage) || 1;
            document.getElementById('btnPrev').disabled = currentPage === 1;
            document.getElementById('btnNext').disabled = currentPage === totalPages;

            const pageNumbersContainer = document.getElementById('pageNumbers');
            pageNumbersContainer.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `px-3 py-1 rounded-lg text-xs font-semibold ${i === currentPage ? 'bg-brand-red text-white' : 'text-gray-600 hover:bg-gray-100'}`;
                btn.innerText = i;
                btn.onclick = () => {
                    currentPage = i;
                    renderTable();
                };
                pageNumbersContainer.appendChild(btn);
            }
        }

        function changePage(delta) {
            currentPage += delta;
            renderTable();
        }

        // Modal Controls
        function openModal() {
            document.getElementById('patientForm').reset();
            document.getElementById('patientId').value = '';
            document.getElementById('modalTitle').innerText = 'Cadastrar Novo Paciente';
            document.getElementById('patientModal').classList.remove('hidden');
            document.getElementById('patientModal').classList.add('flex');
        }

        function closeModal() {
            document.getElementById('patientModal').classList.add('hidden');
            document.getElementById('patientModal').classList.remove('flex');
        }

        function savePatient(e) {
            e.preventDefault();
            const id = document.getElementById('patientId').value;
            const name = document.getElementById('patientName').value;
            const cpf = document.getElementById('patientCpf').value;
            const phone = document.getElementById('patientPhone').value;
            const lastConsult = document.getElementById('patientLastConsult').value || '--';
            const nextConsult = document.getElementById('patientNextConsult').value || '--';
            const status = document.getElementById('patientStatus').value;

            if (id) {
                // Update
                const index = patients.findIndex(p => p.id === id);
                if (index !== -1) {
                    patients[index] = { ...patients[index], name, cpf, phone, lastConsult, nextConsult, status };
                    showToast('Paciente atualizado com sucesso!');
                }
            } else {
                // Create
                const newId = `PAC-00${patients.length + 1}`;
                patients.unshift({
                    id: newId,
                    name,
                    cpf,
                    phone,
                    lastConsult,
                    nextConsult,
                    status,
                    avatar: `https://placehold.co/100x100/C80012/ffffff?text=${name.charAt(0)}`
                });
                showToast('Novo paciente cadastrado com sucesso!');
            }

            closeModal();
            filterData();
        }

        function editPatient(id) {
            const patient = patients.find(p => p.id === id);
            if (!patient) return;

            document.getElementById('patientId').value = patient.id;
            document.getElementById('patientName').value = patient.name;
            document.getElementById('patientCpf').value = patient.cpf;
            document.getElementById('patientPhone').value = patient.phone;
            document.getElementById('patientStatus').value = patient.status;

            document.getElementById('modalTitle').innerText = `Editar Paciente (${patient.id})`;
            document.getElementById('patientModal').classList.remove('hidden');
            document.getElementById('patientModal').classList.add('flex');
        }

        function viewPatient(id) {
            const patient = patients.find(p => p.id === id);
            if (patient) {
                showToast(`Visualizando ficha de: ${patient.name}`);
            }
        }

        function deletePatient(id) {
            patients = patients.filter(p => p.id !== id);
            showToast('Paciente removido com sucesso!');
            filterData();
        }

        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toastMessage').innerText = msg;
            toast.classList.remove('hidden');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }

        function switchTab(tabName) {
            const tabs = ['conta', 'pacientes', 'atendimentos', 'procedimentos', 'relatorios'];
            tabs.forEach(tab => {
                const el = document.getElementById(`nav-${tab}`);
                if (tab === tabName) {
                    el.className = 'px-3 py-2 text-brand-red border-b-2 border-brand-red font-semibold transition-all';
                } else {
                    el.className = 'px-3 py-2 text-gray-600 hover:text-brand-red transition-all';
                }
            });
            showToast(`Navegando para a página: ${tabName.toUpperCase()}`);
        }

        function handleLogout() {
            showToast('Saindo do sistema...');
        }