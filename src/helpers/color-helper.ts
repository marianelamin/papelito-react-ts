/**
 * @todo: potentially bring these list of colors to the db, and make them available
 *  as soon as people join the room each user will select a color, the db will save
 *  that selection and that way same player will show same color across all web browsers
 *
 */
const availableColors = [
  'red',
  'orange',
  'yellow',
  'lightgreen',
  'green',
  'lightblue',
  'blue',
  'purple',
  'violet',
  'brown',
  'gray'
]

export const getColor = (index: number) => {
  const length = availableColors.length
  return availableColors[index % length]
}
