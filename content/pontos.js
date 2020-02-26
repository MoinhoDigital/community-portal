const returnType = type => {
  switch (type) {
    case 'food':
      return {
        icon: 'mdi-food',
        color: '#D81159'
      }
    case 'sleep':
      return {
        icon: 'mdi-sleep',
        color: '#FFBC42'
      }
    case 'water':
      return {
        icon: 'mdi-waves',
        color: '#218380'
      }
    case 'bar':
      return {
        icon: 'mdi-beer',
        color: '#8F2D56'
      }
    default:
      break
  }
}
export default [
  {
    title: 'Hostel Moinho',
    coords: [-47.464985, -14.066328],
    ...returnType('sleep')
  },
  {
    title: 'Guatambu',
    coords: [-47.463397, -14.063669],
    ...returnType('food')
  },
  {
    title: 'Portaria Solarium',
    coords: [-47.469955, -14.056951],
    ...returnType('water')
  },
  {
    title: 'Bar do Edi',
    coords: [-47.461965, -14.06369],
    ...returnType('bar')
  }
]
