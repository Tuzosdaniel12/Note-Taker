class RandomID{
    constructor(){
        this.id = "";
    }

    setId(id){
        this.id = this.id + id;
    }

    getId(){
        return this.id
    }

    createIdLength(){
        const randomLength = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        return randomLength;
    }
    
    createUniqueID(){
        const lengthOfId = this.createIdLength()

        while(this.getId().length < lengthOfId){
            this.setId( String.fromCharCode(this.returnRandomNumber()))
        }

        return this.getId();

    }

    returnRandomNumber(){
         const num = Math.floor(Math.random() * 100) % 2;
         
         
         if(num === 0 ){
            console.log(num)
             return Math.floor(Math.random() * (57 - 48 + 1)) + 48;
             
         }
            console.log(num)
            return Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    }
}

module.exports = RandomID;