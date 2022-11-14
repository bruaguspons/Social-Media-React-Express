export const geteLogin = async (user) => {

    const res = await fetch('http://localhost:8000/user/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    if (res.status === 401) {
        return {}
    } else {
        const data = await res.json()
        console.log(data)
        return data
    }

}