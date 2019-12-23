const funcSliders = () => {

  var glide = new Glide('#popular-slider', {
    type: 'carousel',
    focusAt: 'center',
    perView: 4,
  })

  glide.mount()
}
export default funcSliders;

