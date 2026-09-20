function toggleInfo(id, type) {
  const row = document.getElementById(type === 'abstract' ? 'abs_' + id : 'bib_' + id);
  row.classList.toggle('noshow');
}

function clearQS() { document.getElementById('qs_field').value = ''; if (typeof searchTable === 'function') searchTable(); }

