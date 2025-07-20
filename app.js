document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality with overlay
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebarOverlay = document.createElement('div');
    sidebarOverlay.className = 'sidebar-overlay';
    document.body.appendChild(sidebarOverlay);
    
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }
    
    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }
    
    sidebarOverlay.addEventListener('click', function() {
        toggleSidebar();
    });
    
    // Close sidebar when clicking on nav links (mobile)
    const navLinks = document.querySelectorAll('#sidebar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                toggleSidebar();
            }
        });
    });
    
    // Set current date in date inputs
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Date range selector
    const dateRange = document.getElementById('dateRange');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            const isCustom = this.value === 'custom';
            document.getElementById('startDateCol').classList.toggle('d-none', !isCustom);
            document.getElementById('endDateCol').classList.toggle('d-none', !isCustom);
        });
        
        // Trigger change event on load if custom is selected
        if (dateRange.value === 'custom') {
            dateRange.dispatchEvent(new Event('change'));
        }
    }
    
    // Form validation example
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Popover initialization
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth >= 992) {
            sidebar.classList.remove('active');
            content.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run once on load
});