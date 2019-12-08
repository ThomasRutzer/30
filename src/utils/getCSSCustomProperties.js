const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
  let response = getComputedStyle(element).getPropertyValue(propKey)

  // Tidy up the string if there's something to work with
  if (response.length) {
    response = response.replace(/\'|"/g, '').trim()
  }

  // Convert the response into a whatever type we wanted
  switch (castAs) {
    case 'number':
    case 'int':
      return parseInt(response, 10)
    case 'float':
      return parseFloat(response, 10)
    case 'boolean':
    case 'bool':
      return response === 'true' || response === '1'
  }

  // Return the string response by default
  return response
}

export default getCSSCustomProp