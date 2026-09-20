// publications-search.js
document.addEventListener('DOMContentLoaded', function () {
  const qsField = document.getElementById('qs_field');
  const statEl = document.getElementById('stat');
  const settingsEl = document.getElementById('settings');

  if (!qsField || !statEl) return;

  window.toggleSettings = function () {
    if (!settingsEl) return;
    settingsEl.classList.toggle('hidden');
  };

  window.clearQS = function () {
    qsField.value = '';
    searchTable();
  };

  function normalizeText(s, ignoreAccents) {
    if (!s) return '';
    let t = s.toLowerCase();
    if (ignoreAccents) {
      t = t.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    return t;
  }

  function searchTable() {
    const queryRaw = qsField.value || '';
    const includeAbstract = document.getElementById('opt_searchAbs')?.checked || false;
    const includeReview = document.getElementById('opt_searchRev')?.checked || false;
    const useRegExp = document.getElementById('opt_useRegExp')?.checked || false;
    const ignoreAccents = document.getElementById('opt_noAccents')?.checked || false;

    const rows = document.querySelectorAll('#qs_table .entry');
    let count = 0;
    const q = normalizeText(queryRaw, ignoreAccents);

    rows.forEach(row => {
      const id = row.id || '';
      let haystack = normalizeText(row.innerText, ignoreAccents);

      if (includeAbstract) {
        const absRow = document.getElementById('abs_' + id);
        if (absRow) haystack += ' ' + normalizeText(absRow.innerText, ignoreAccents);
      }

      if (includeReview) {
        const revRow = document.getElementById('rev_' + id);
        if (revRow) haystack += ' ' + normalizeText(revRow.innerText, ignoreAccents);
      }

      let match = false;
      if (q === '') {
        match = true;
      } else if (useRegExp) {
        try {
          const re = new RegExp(q, 'i');
          match = re.test(haystack);
        } catch (e) {
          match = haystack.includes(q);
        }
      } else {
        match = haystack.includes(q);
      }

      row.style.display = match ? '' : 'none';
      count += match ? 1 : 0;
    });

    statEl.innerText = String(count);
  }

  qsField.addEventListener('input', searchTable);
  document.querySelectorAll('.search_setting').forEach(cb => cb.addEventListener('change', searchTable));
  searchTable();
});

