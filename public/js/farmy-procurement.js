(function () {
  const STORAGE_KEY = 'farmy_procurement_requests';

  const t = (key, fallback) => (window.FARMY_I18N ? window.FARMY_I18N.t(key, fallback) : (fallback || key));

  function getRequests() {
    try {
      const saved = Storage.get(STORAGE_KEY, []);
      return Array.isArray(saved) ? saved : [];
    } catch (e) {
      return [];
    }
  }

  function saveRequests(list) {
    Storage.set(STORAGE_KEY, Array.isArray(list) ? list : []);
  }

  function nextRequestId() {
    const requests = getRequests();
    const maxId = requests.reduce((acc, item) => {
      const raw = String(item.requestId || '').match(/(\d+)$/);
      const val = raw ? Number(raw[1]) : 0;
      return Math.max(acc, val);
    }, 0);
    return `REQ-${String(maxId + 1).padStart(4, '0')}`;
  }

  function getPriorityWeight(priority) {
    return { Low: 1, Medium: 2, High: 3, Urgent: 4 }[priority] || 1;
  }

  function getStatusClass(status) {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Processing': return 'status-processing';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      case 'Completed': return 'status-completed';
      default: return 'status-pending';
    }
  }

  function setStatusMessage(text, kind = '') {
    const msg = document.getElementById('procurementStatusMessage');
    if (!msg) return;
    msg.textContent = text;
    msg.className = kind === 'error' ? 'empty-state' : kind === 'success' ? 'empty-state' : 'loading-state';
  }

  function getFilteredRequests() {
    const search = document.getElementById('procurementSearch')?.value || '';
    const statusFilter = document.getElementById('procurementStatusFilter')?.value || '';
    const sortValue = document.getElementById('procurementSort')?.value || 'date-desc';
    let list = getRequests();

    if (search) {
      const term = search.toLowerCase();
      list = list.filter((item) => {
        const haystack = [item.item, item.requestedBy, item.department, item.status, item.priority, item.requestId].join(' ').toLowerCase();
        return haystack.includes(term);
      });
    }

    if (statusFilter) {
      list = list.filter((item) => item.status === statusFilter);
    }

    list = [...list].sort((a, b) => {
      if (sortValue === 'priority') {
        return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
      }
      const timeA = new Date(a.date || 0).getTime();
      const timeB = new Date(b.date || 0).getTime();
      return sortValue === 'date-asc' ? timeA - timeB : timeB - timeA;
    });

    return list;
  }

  function renderRequests() {
    const list = document.getElementById('procurementList');
    const countText = document.getElementById('procurementCountText');
    const filtered = getFilteredRequests();
    if (countText) {
      countText.textContent = `${filtered.length} ${t('procurement.total', 'requests')}`;
    }

    if (!list) return;
    if (!filtered.length) {
      list.innerHTML = `
        <div class="empty-state">
          <h3>${t('procurement.empty', 'No procurement requests found')}</h3>
          <p>${t('procurement.emptyText', 'Create a request to start tracking approvals and delivery.')}</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map((item) => `
      <div class="procurement-card">
        <div class="proc-card-header">
          <div>
            <strong>${item.requestId}</strong>
            <div class="proc-meta">
              <span>${item.item}</span>
              <span>${item.quantity}</span>
            </div>
          </div>
          <div class="proc-meta">
            <span class="status-badge ${getStatusClass(item.status)}">${item.status}</span>
            <span class="priority-badge">${item.priority}</span>
          </div>
        </div>
        <div class="proc-meta">
          <span>${item.requestedBy}</span>
          <span>${item.department}</span>
          <span>${new Date(item.date).toLocaleDateString()}</span>
        </div>
        <p class="hint">${item.notes || '—'}</p>
        <div class="form-actions">
          <button class="btn-secondary" type="button" data-action="edit" data-id="${item.requestId}">${t('procurement.edit', 'Edit')}</button>
          <button class="btn-primary" type="button" data-action="delete" data-id="${item.requestId}">${t('procurement.delete', 'Delete')}</button>
        </div>
      </div>
    `).join('');
  }

  function fillDefaultValues() {
    const defaultDate = new Date().toISOString().slice(0, 10);
    const dateInput = document.getElementById('requestDate');
    const requestIdInput = document.getElementById('requestId');
    if (dateInput && !dateInput.value) dateInput.value = defaultDate;
    if (requestIdInput) requestIdInput.value = nextRequestId();
  }

  function resetForm() {
    const form = document.getElementById('procurementForm');
    if (form) form.reset();
    const requestIdInput = document.getElementById('requestId');
    if (requestIdInput) requestIdInput.value = nextRequestId();

    const statusSelect = document.getElementById('status');
    if (statusSelect) statusSelect.value = 'Pending';

    const submitBtn = document.getElementById('procurementSubmitBtn');
    if (submitBtn) submitBtn.textContent = t('procurement.submit', 'Submit Request');

    const formTitle = document.getElementById('procurementFormTitle');
    if (formTitle) formTitle.textContent = t('procurement.create', 'Create Request');

    delete window.__procurementEditingId;
    setStatusMessage('', '');
  }

  function buildPayloadFromForm() {
    return {
      requestId: document.getElementById('requestId')?.value || nextRequestId(),
      item: document.getElementById('itemName')?.value?.trim() || '',
      quantity: Number(document.getElementById('quantity')?.value || 0),
      requestedBy: document.getElementById('requestedBy')?.value?.trim() || '',
      department: document.getElementById('department')?.value?.trim() || '',
      priority: document.getElementById('priority')?.value || 'Medium',
      date: document.getElementById('requestDate')?.value || new Date().toISOString().slice(0, 10),
      status: document.getElementById('status')?.value || 'Pending',
      notes: document.getElementById('notes')?.value?.trim() || ''
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = buildPayloadFromForm();
    if (!payload.item || !payload.requestedBy || !payload.department || !payload.quantity || !payload.date) {
      setStatusMessage(t('procurement.error', 'Could not save this request. Please try again.'), 'error');
      return;
    }

    const requests = getRequests();
    const editingId = window.__procurementEditingId;
    const newList = editingId
      ? requests.map((item) => item.requestId === editingId ? { ...item, ...payload } : item)
      : [payload, ...requests];

    saveRequests(newList);
    renderRequests();
    resetForm();
    setStatusMessage(t('procurement.success', 'Request created successfully.'), 'success');
  }

  function handleEdit(id) {
    const requests = getRequests();
    const match = requests.find((item) => item.requestId === id);
    if (!match) return;

    window.__procurementEditingId = id;
    document.getElementById('requestId').value = match.requestId;
    document.getElementById('itemName').value = match.item;
    document.getElementById('quantity').value = match.quantity;
    document.getElementById('requestedBy').value = match.requestedBy;
    document.getElementById('department').value = match.department;
    document.getElementById('priority').value = match.priority;
    document.getElementById('requestDate').value = match.date;
    document.getElementById('status').value = match.status;
    document.getElementById('notes').value = match.notes || '';

    const formTitle = document.getElementById('procurementFormTitle');
    if (formTitle) formTitle.textContent = t('procurement.update', 'Update Request');

    const submitBtn = document.getElementById('procurementSubmitBtn');
    if (submitBtn) submitBtn.textContent = t('procurement.save', 'Save');
  }

  function handleDelete(id) {
    const requests = getRequests().filter((item) => item.requestId !== id);
    saveRequests(requests);
    renderRequests();
    if (window.__procurementEditingId === id) resetForm();
  }

  function bindEvents() {
    document.getElementById('procurementForm')?.addEventListener('submit', handleSubmit);
    document.getElementById('procurementResetBtn')?.addEventListener('click', resetForm);
    document.getElementById('procurementSearch')?.addEventListener('input', renderRequests);
    document.getElementById('procurementStatusFilter')?.addEventListener('change', renderRequests);
    document.getElementById('procurementSort')?.addEventListener('change', renderRequests);

    document.getElementById('procurementList')?.addEventListener('click', (event) => {
      const btn = event.target.closest('button[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if (action === 'edit') handleEdit(id);
      if (action === 'delete') handleDelete(id);
    });
  }

  function renderProcurementQueue() {
    const noState = document.getElementById('procurementStatusMessage');
    if (noState) noState.textContent = t('procurement.loading', 'Loading procurement queue…');
    renderRequests();
    fillDefaultValues();
    bindEvents();
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      renderBottomNav('procurement');
      renderProcurementQueue();
      checkBackend();
    });

    document.addEventListener('farmy:language-change', () => {
      renderRequests();
      const formTitle = document.getElementById('procurementFormTitle');
      if (window.__procurementEditingId) {
        if (formTitle) formTitle.textContent = t('procurement.update', 'Update Request');
      } else if (formTitle) {
        formTitle.textContent = t('procurement.create', 'Create Request');
      }
    });
  }

  if (typeof globalThis !== 'undefined') {
    Object.assign(globalThis, {
      renderProcurementQueue,
      getRequests,
      resetForm,
      nextRequestId
    });
  }
})();
