

class TokenHelper{

    constructor(){
        this.key='token'
    }

    get = (key)=>{
      return localStorage.getItem(this.key || key);
    }

    create = (key , val)=>{
        return localStorage.setItem(key , val);
    }

    delete = (key)=>{
        return localStorage.removeItem(this.key || key);
    }

}


module.exports.TokenHelper = new TokenHelper();