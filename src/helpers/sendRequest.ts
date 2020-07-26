const baseUrl = process.env.REACT_APP_BACKEND_API

export const sendRequest = async (url: string, method = "get", body: null | string | FormData = null, headers = {},) => {
    let data
    try {
        const response = await fetch(`${baseUrl}${url}`, { method, body, headers })
        data = response
    } catch (err) {
        console.log(err.message)
    }
    return data
}