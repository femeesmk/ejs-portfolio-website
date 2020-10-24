// IIFE
(function () {
  function start() {
    console.log('App Started');

    $('#confModel').on('show.bs.modal', function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var id = button.data('id'); // Extract info from data-* attributes
      var href = "/contact-list/delete/" + id;
      console.log(href);
      var modal = $(this);
      modal.find('.modal-footer .delete_confirm').attr("href", href);
    });
  }
  window.addEventListener('load', start);
})();
