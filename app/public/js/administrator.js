const sideMenu = document.querySelector('aside');
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const darkMode = document.querySelector('.dark-mode');
const logo = document.getElementById('logo'); // Selecionando a logo

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode-variables');
    darkMode.querySelector('span:nth-child(1)').classList.toggle('active');
    darkMode.querySelector('span:nth-child(2)').classList.toggle('active');

    // Alterar a logo com base no modo escuro
    if (document.body.classList.contains('dark-mode-variables')) {
        logo.src = 'images/logo-branco-adm.svg'; // Logo branca para modo escuro
    } else {
        logo.src = 'images/logo-adm.svg'; // Logo original para modo claro
    }

    // Verificação no console
    console.log('Current logo src:', logo.src);
});

// Example Orders data (make sure to define this data)
const Orders = [
  { productName: 'Liderança e Sucesso', productNumber: '001', price: '$100', status: 'Revisado' },
  { productName: 'Empoderamento Feminino', productNumber: '002', price: '$150', status: 'Não Revisado' },
  { productName: 'Conquista e Crescimento', productNumber: '003', price: '$200', status: 'Em Revisão' }
];

Orders.forEach(order => {
  const tr = document.createElement('tr');
  const trContent = `
      <td>${order.productName}</td>
      <td>${order.productNumber}</td>
      <td>${order.price}</td>
      <td class="${order.status === 'Não Revisado' ? 'danger' : order.status === 'Em Revisão' ? 'warning' : 'success'}">${order.status}</td>
      <td class="primary">Detalhes</td>
  `;
  tr.innerHTML = trContent;
  document.querySelector('table tbody').appendChild(tr);
});
