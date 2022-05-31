import { customAlphabet } from 'nanoid'

export class IdGenerator {
    generate(){
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 23)
        return "ck"+nanoid()  
    }

}

export class InviteCodeGenerator {
    generate(){
        const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 7)
        return nanoid()  
    }

}