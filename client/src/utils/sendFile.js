const sendFile = async (file, extradata) => {
    const dataSend = new FormData()
    dataSend.append('file', file)
    dataSend.append('data', JSON.stringify(extradata))
    const res = await fetch('http://localhost:8000/user', {
        method: 'POST',
        body: dataSend
    })
    if (res.status === 201) {
        const data = await res.json()
        return data
    }
    return false
}
export default sendFile