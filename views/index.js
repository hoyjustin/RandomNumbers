
$(document).ready(function(){
  function RandomNumberViewModel(count, min, max) {
    var self = this;
    self.count = ko.observable(count);
    self.min = ko.observable(min);
    self.max = ko.observable(max);
    self.header = ko.observable();
    self.error = ko.observable();
    self.numbers = ko.observableArray();

  /**
   * Submits the form to the server and prints the response data
   */
    self.submit = function() {
      function postForm(input) {
        $.post('/randomGen', input)
        .done(function (data) {
          Scatterplot(data, input.min, input.max);
          self.header('Your Random Number(s):');
          self.numbers(data);
        })
        .fail(function (xhr, textStatus, errorThrown) {
          self.error(xhr.responseText);
        });
      }
      //clear existing elements on screen
      self.header('');
      self.error('');
      self.numbers([]);
      //send data
      var input = {
        count : self.count(),
        min : self.min(),
        max : self.max()
      };
      postForm(input);
    }

  }
  // Default box input
  ko.applyBindings(new RandomNumberViewModel('10000','1','10000'));
});