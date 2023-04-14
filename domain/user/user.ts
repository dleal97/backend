export class User {
    public constructor(
        public readonly username: string,
        public readonly password: string,
        public score: number
    ) {}

    public updateScore(newScore: number): void{
        if (newScore > this.score) {
            this.score = newScore;
        }
    }
}
