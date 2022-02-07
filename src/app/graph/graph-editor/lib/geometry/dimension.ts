export class Dimension {
    
    constructor(public width: number, public height: number) {}

    scale(amount: number) {
        return new Dimension(this.width * amount, this.height * amount);
    }
}