export function readStatus(userObject) {
    let away = [], offline = [], online = [];
    userObject.forEach((user) => {
        if (user.status === "online" && user.lastActivity > 10) {
            away.push(user.username);
        }
        else if (user.status === "online") {
            online.push(user.username);
        }
        else if (user.status === "offline") {
            offline.push(user.username);
        }
    });
    return {
        ...(away.length === 0 ? {} : { away }),
        ...(online.length === 0 ? {} : { online }),
        ...(offline.length === 0 ? {} : { offline })
    };
}
