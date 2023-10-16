export class userDTO {
    constructor(user) {
        this.firstName = user.firstName;
        this.email = user.email;
        this.rol = user.rol;
        this.premium = user.premium;
        this.cart = user.cart;
        this.isAdmin = user.isAdmin;
    }
}
