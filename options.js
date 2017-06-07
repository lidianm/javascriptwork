// Saves options to chrome.storage
function save_options() {
  var subdomains = document.getElementById('subdomains').checked;
  console.log(subdomains);
  chrome.storage.sync.set({
    ignore_subdomains: subdomains
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    ignore_subdomains: true
  }, function(items) {
    document.getElementById('subdomains').checked = items.ignore_subdomains;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);