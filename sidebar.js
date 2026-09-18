document.addEventListener('DOMContentLoaded', () => {
  // Cargar el menú dinámicamente desde sidebar.html
  fetch('sidebar.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar sidebar.html');
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById('sidebar-container');
      if (container) {
        container.innerHTML = data;
        iniciarEventosSidebar(); // Activa los clics cuando el menú ya fue insertado
      }
    })
    .catch(err => console.error('Error al cargar el sidebar:', err));
});

function iniciarEventosSidebar() {
  const openBtn = document.getElementById('btn-open-sidebar');
  const closeBtn = document.getElementById('btn-close-sidebar');
  const sidebar = document.getElementById('sidebar-panel');
  const overlay = document.getElementById('sidebar-overlay');

  if (openBtn && sidebar && overlay) {
    openBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    });
  }

  function closeSidebar() {
    if (sidebar && overlay) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}

// Función para cambiar de Tema aplicada al <html> (evita parpadeos)
function setTheme(themeName) {
  document.documentElement.classList.remove('theme-dark', 'theme-coffee', 'theme-blue');
  if (themeName !== 'light') {
    document.documentElement.classList.add('theme-' + themeName);
  }
  // Guardar preferencia en el navegador
  localStorage.setItem('selectedTheme', themeName);
}