type Answer = {
    text: string;
    correct: boolean;
}

export class Question {
    public constructor(private readonly id: number, private readonly question: string, private readonly answers: Answer[]) {}
}