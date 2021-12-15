class Api {
    token
    uid
    expire
    baseURL = process.env.REACT_APP_API_URL || "https://rest-spaggiu.alenygam.com/";
    constructor() {
        this.setFromLocalStorage();
    }

    setFromLocalStorage() {
        this.expire = localStorage.getItem("expire");
        const expiringDate = new Date(this.expire);
        if (expiringDate < new Date()) return;
        this.uid = localStorage.getItem("uid");
        this.token = localStorage.getItem("token");
    }
    
    async login(uid, password) {
        try {
            const res = await fetch(`${this.baseURL}/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    ident: null,
                    pass: password,
                    uid: uid,
                }),
                headers: {'Content-Type': 'application/json'}
            })
            const json = await res.json();
            if (!res.ok) return json;

            const uidFromAPI = json.ident.substring(1);
            this.uid = uidFromAPI;
            this.token = json.token;
            this.expire = json.expire;
            localStorage.setItem("uid", uidFromAPI);
            localStorage.setItem("token", json.token);
            localStorage.setItem("expire", json.expire);
        } catch (err) {
            console.log(err);
            return;
        }
    }
}

export default Api;