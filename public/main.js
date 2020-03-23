const socket = io('http://localhost:8080');

const content = $('#content');
const nbspStr = '<span class="letter">&nbsp;</span>';

// [{"range":[{"line":0,"character":0},{"line":0,"character":0}],"rangeOffset":0,"rangeLength":0,"text":"\n"}]
socket.on('textChange', function(changes) {
  console.log(changes);
  changes.forEach(function(change) {
    const {range, text} = change;
    const startLine = content.children().eq(range[0].line);

    // multiline deletion
    if (range[0].line !== range[1].line) {
      const endLine = content.children().eq(range[1].line);
      startLine.children().slice(range[0].character).remove();
      endLine.children().slice(0, range[1].character).remove();
      // removes all lines inbetween startLine and endLine
      content.children().slice(range[0].line + 1, range[1].line).remove();

      // appends the contents of endLine to startLine and removes endLine
      endLine.contents().appendTo(startLine);
      endLine.remove(); 
    } else {
      console.log(startLine.children());
      startLine.children().slice(range[0].character, range[1].character).remove();
    }

    const lines = text.split('\n');
    lines.forEach(function(line, i, arr) {
      let letterContainer = $('<div class="line"></div>')
      line.split('').forEach(function(char) {
        letterContainer.append($(`<span class="letter">${char}</span>`));
      });
      arr[i] = letterContainer;
    })

    const excess = startLine.children().slice(range[0].character).detach();
    lines[0].contents().appendTo(startLine);
    for (let i = 0; i < lines.length - 1; ++i) {
      lines[i].append($(nbspStr));
      content.children().eq(range[0].line + i).after(lines[i+1]);
    }
    excess.appendTo(content.children().eq(range[0].line + lines.length - 1));
  });
});