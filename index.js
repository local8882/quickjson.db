const fs = require("fs")
class database{
    constructor(){
        if(!fs.existsSync(__dirname + "/jsondb.json")){
            fs.writeFileSync(__dirname + "/jsondb.json","{}")
        }
        return "Ready!"
    }
/**
 * 
 * @param {string} key Key to get value of
 * @returns Value of key or null
 */
    get(key){
        let gotit = false
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        for(let i in data){
            if(i === key){
                gotit = true
                return data[i]
            } else {
                continue;
            }
        }
        if(!gotit)return null
    }
    /** 
     * 
     * @param {string} key Key to set value to
     * @param {any} value Value to set to
     */
    set(key,value){
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        data[key] = value
        fs.writeFileSync(__dirname + "/jsondb.json",JSON.stringify(data))
    
    }
        /**
         * 
         * @param {string} key Key to delete from database
         */
    delete(key){
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        delete data[key]
        fs.writeFileSync(__dirname + "/jsondb.json",JSON.stringify(data))    
    }
    /**
     * 
     * @returns Array including keys and the key's data. To access use Array[index].key and to get value use Array[index].value
     */
    all(){
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        const datatoarray = [];
        for(let i in data){
            datatoarray.push({key:i,value:data[i]})
        }
        return datatoarray
    
    }
    /**
     * 
     * @param {string} key 
     * @param {number} amount 
     */
    add(key,amount){
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        if(!data[key]){
            data[key] = 0
        }
        data[key] = parseInt(data[key]) + amount
        if(isNaN(data[key])){
            return new Error("The value of "+key+" was not a number.")
        }
        fs.writeFileSync(__dirname + "/jsondb.json",JSON.stringify(data))
    
    }
    /**
     * 
     * @param {string} key 
     * @param {number} amount 
     * @returns 
     */
    subtract(key,amount){
        const data = JSON.parse(fs.readFileSync(__dirname + "/jsondb.json",'utf8'))
        if(!data[key]){
            data[key] = 0
        }
        data[key] = parseInt(data[key]) - amount
        if(isNaN(data[key])){
            return new Error("The value of "+key+" was not a number.")
        }
        fs.writeFileSync(__dirname + "/jsondb.json",JSON.stringify(data))
    
    }
    /**
     * 
     * @param {string} method set, get, or all. Returns response time of the case.
     * @returns time elapsed between end and start of operation in ms.
     */
    ping(method){
        if(method.toLowerCase() === 'set'){
            const start = new Date()
            this.set(`pingpong`,`test`)
            const end = new Date()
            this.delete(`pingpong`)
            return end-start    
        }
        if(method.toLowerCase() === 'get'){
            const start = new Date()
            this.get(`a`)
            const end = new Date();
            return end-start    
        }
        if(method.toLowerCase() === 'all'){
            const start = new Date()
            this.all()
            const end = new Date()
            return end-start    
        }
    }
    
}
module.exports = database