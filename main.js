$(document).ready(() => {
  const words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer']
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const random = Math.floor(Math.random() * words.length)
  const selected = words[random]

  for (let i = 0; i < selected.length; i++) {
    $('#guess-box ul').append('<li class="letter">_</li>')
  }

  alphabet.forEach((item) => {
    $('#alphabet-box ul').append(`<li class="alphabet">${item}</li>`);
  })
})
