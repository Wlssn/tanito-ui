/**
 * 
 * @param {{method: String, path: String, isAsync: Boolean }} config 
 * @returns JSON String
 */
function getLocaleJson({ method, path, isAsync }) {
    var request = new XMLHttpRequest()
    request.open(method, path, isAsync)
    request.send(null)
    return JSON.parse(request.responseText)
}