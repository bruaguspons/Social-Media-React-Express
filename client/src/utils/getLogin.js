export const geteLogin = async (user) => {

    const res = await fetch('http://localhost:8000/user/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    if (res.status === 401) {
        return 401
    } else {
        const data = await res.json()
        return data
    }

}