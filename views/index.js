
$(document).ready(function(){
  function RandomNumberViewModel(count, min, max) {
    var self = this;
    self.count = ko.observable(count);
    self.min = ko.observable(min);
    self.max = ko.observable(max);
    self.header = ko.observable();
    self.error = ko.observable();
    self.numbers = ko.observableArray();

    self.generate = function() {

      function postForm(input) {
        $.post('/randomGen', input)
        .done(function (data) {
          self.numbers(data);
          self.header('Your Random Number(s):');
        })
        .fail(function (xhr, textStatus, errorThrown) {
          self.error(xhr.responseText);
        });
      }

      var input = 
      {
        count : self.count(),
        min : self.min(),
        max : self.max()
      };
      self.header('');
      self.error('');
      self.numbers([]);
      postForm(input);
    }
  }
  
  ko.applyBindings(new RandomNumberViewModel('10000','1','10000'));
});