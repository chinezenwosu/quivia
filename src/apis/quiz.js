export const getQuiz = (successCallback) => {
  fetch('https://opentdb.com/api.php?amount=10').then(response => {
    return response.json()
  }).then(jsonResponse => {
    successCallback && successCallback(jsonResponse.results)
  })
}