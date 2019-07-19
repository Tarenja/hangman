$(document).ready(() => {
  const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']
  const random = Math.floor(Math.random() * words.length)
  const selected = words[random]

  for (let i = 0; i < selected.length; i++) {
    $('#guess-box').append('<p class="letter">_</p>')
  }
})
