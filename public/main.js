const socket = io('http://localhost:8080');

function renderData(data) {
  $('#content').empty();
  let lines = data.split('\n');
  lines.forEach((line) => {
    const lineEl = $(`<div class="line"></div>`);
    line.split('').forEach((char) => {
      lineEl.append($(`<span class="letter">${char}</span>`))
    })
    lineEl.append($(`<span class="letter">&nbsp;</span>`))
    $('#content').append(lineEl);
  })
}

socket.on('change', function(data) {
  console.log(data);
  $('#text').val(data);
  renderData(data);
});

socket.on('selections', function(selections) {
  console.log(selections);
  $('.selected').removeClass('selected');
  $('.cursor').removeClass('cursor');
  selections.forEach((selection) => {
    const {active, start, end} = selection;
    const lines = $(`#content .line`);
    lines.slice(start.line, end.line + 1)
         .children().slice(start.character, end.character).addClass('selected');
    lines.eq(active.line).children().eq(active.character).addClass('cursor');
  });
});

$('#text').on('input', (e) => {
  socket.emit('change', $('#text').val());
});
