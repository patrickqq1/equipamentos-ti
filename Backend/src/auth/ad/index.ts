import ActiveDirectory from "activedirectory2";

const config = {
    url: 'ldap://10.110.170.30',
    baseDN: 'dc=pinheiro,dc=local',
    username: 'integracao@pinheiro.local',
    password: 'abc@123'
}

const ad = new ActiveDirectory(config)

export const auth = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
        ad.authenticate(`${username}@pinheiro.local`, password, (err, auth) => {
            if(err){
                resolve(false)
            }
            if(auth){
                resolve(true)
            }else {
                reject(new Error("Ocorreu algum erro!"))
            }
        })
    })
}