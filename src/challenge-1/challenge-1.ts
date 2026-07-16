export type User = {
  username: string,
  status: string,
  lastActivity: number
}

export type Status = {
  away?: string[],
  online?: string[],
  offline?: string[]
}

export function readStatus (userObject: User[]): Status {
  let away: string[] = [],
      offline: string[] = [],
      online: string[] = [];

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
