export default function pokemonTypeColorProvider(type: string) {
  let bgColor

  switch (type) {
    case 'normal':
      bgColor = '#AEAEAE'
      break
    case 'fire':
      bgColor = '#FFA767'
      break;
    case 'water':
      bgColor = '#64C5F7'
      break
    case 'electric':
      bgColor = '#E7D400'
      break
    case 'grass':
      bgColor = '#9BC30F'
      break
    case 'ice':
      bgColor = '#60E9F5'
      break
    case 'fighting':
      bgColor = '#EE6969'
      break
    case 'poison':
      bgColor = '#AB7ACA'
      break
    case 'ground':
      bgColor = '#C8A841'
      break
    case 'flying':
      bgColor = '#64A8F1'
      break
    case 'psychic':
      bgColor = '#EB7FF4'
      break
    case 'bug':
      bgColor = '#51CB5A'
      break
    case 'rock':
      bgColor = '#FAC727'
      break
    case 'ghost':
      bgColor = '#756EB4'
      break
    case 'dragon':
      bgColor = '#FF8859'
      break
    case 'dark':
      bgColor = '#6881D4'
      break
    case 'steel':
      bgColor = '#818AA4'
      break
    case 'fairy':
      bgColor = '#FC7799'
      break
    default:
      bgColor = '#000000'
      break
  }

  return bgColor
}
