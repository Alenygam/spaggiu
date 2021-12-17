function getBySubjectID(arr, subjectID) {
    return arr.filter((obj) => obj["subjectId"] === subjectID);
}

function getByPeriodID(arr, periodID) {
    return arr.filter((obj) => obj["periodPos"] === periodID);
}

function sortGradesByDate(arr) {
    for (let index in arr) {
        const dateArray = arr[index].evtDate.split('-');
        arr[index].unixTimestamp = (new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2] - 1)).getTime();
    }
    return arr.sort((a, b) => b.unixTimestamp - a.unixTimestamp);
}

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

    async absences({begin, end}) {
        var url = `${this.baseURL}/students/${this.uid}/absences/details`
        if (begin) {
            url += `/${begin}`
            if (end) url += `/${end}`;
        }
        try {
            const res = await fetch(url, {
                headers: {
                    'Z-Auth-Token': this.token
                }
            });
            const json = await res.json();
            if (!res.ok) return {error: true, ...json};
            return json["events"];
        } catch (err) {
            console.error(err);
            return {error: true, message: err.message};
        }

    }

    async grades({subjectID, periodID}) {
        try {
            const res = await fetch(`${this.baseURL}/students/${this.uid}/grades`, {
                headers: {
                    'Z-Auth-Token': this.token
                }
            });
            const json = await res.json();
            if (!res.ok) return {error: true, ...json};
            let result = json["grades"];
            if (subjectID) {
                result = getBySubjectID(result, subjectID);
            }
            if (periodID) {
                result = getByPeriodID(result, subjectID);
            }

            result = sortGradesByDate(result);

            return result;
        } catch (err) {
            console.error(err);
            return {error: true, message: err.message};
        }
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
            });
            const json = await res.json();
            if (!res.ok) return {error: true, ...json};

            const uidFromAPI = json.ident.substring(1);
            this.uid = uidFromAPI;
            this.token = json.token;
            this.expire = json.expire;
            localStorage.setItem("uid", uidFromAPI);
            localStorage.setItem("token", json.token);
            localStorage.setItem("expire", json.expire);
            return json;
        } catch (err) {
            console.error(err);
            return {error: true, message: err.message};
        }
    }
}

export default Api;