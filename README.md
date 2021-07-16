# quickjson.db
This is a json database holder which creates a json file in the same directory as where this module is stored.

This is similiar to quick.db, very simple, fast, and perfect for beginners.
```js
const Database = require("@localsimp/quick-json.db") // requiring it
const db = new Database(); //initialize new database client. Creating jsondb file if it does not exist.
db.set("key","value") //sets value to key. 
db.get("key") // returns value of key or null
db.delete("key")// removes key from database
db.all() /*returns array with json in each index. if db.all() is assigned to the constant "data" then
data[index].key returns the key and data[index].value returns the value
*/
db.add("key",number) /*sets the key to 0 if it doesnt exist else adds the number given to 
existing number value*/
db.subtract("key",number) // same as above but subtracts
db.ping(method) // the method can be "set", "get" or "all". Returns response time
```
