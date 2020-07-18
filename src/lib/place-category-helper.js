export default type => {
  switch (type) {
    case 'artesanal':
      return {
        icon: 'mdi-hand-heart',
        color: '#D81159'
      }
    case 'comida':
      return {
        icon: 'mdi-food',
        color: '#D81159'
      }
    case 'cama':
      return {
        icon: 'mdi-sleep',
        color: '#FFBC42'
      }
    case 'rio':
      return {
        icon: 'mdi-waves',
        color: '#218380'
      }
    case 'bar':
      return {
        icon: 'mdi-beer',
        color: '#8F2D56'
      }
    case 'wifi':
      return {
        icon: 'mdi-wifi',
        color: '#8F2D56'
      }
    default:
      break
  }
}
