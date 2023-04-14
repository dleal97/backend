import mysql from 'mysql2/promise';
import { QuestionRepository } from '../../domain/question/question-repository';
import { Question } from '../../domain/question/question';

export class SqlQuestionRepository implements QuestionRepository {
    public constructor() {}

    public async findAll(): Promise<Question[]> {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        });

        const [results] = await connection.execute<mysql.RowDataPacket[]>(
            "SELECT ramdomquestion.id, ramdomquestion.question, a.text, REPLACE(REPLACE(a.fraction, '-33.3333', 'false') , '100', 'true') AS value  FROM Answer a INNER JOIN (SELECT m.id, m.question  FROM Multichoice m ORDER BY RAND() LIMIT 15) AS ramdomquestion ON a.idQuestion = ramdomquestion.id"
        );

        const finalquestions: Record<
            string,
            { text: string; answers: { text: string; value: boolean }[] }
        > = {};

        results.forEach((question) => {
            if (finalquestions[question['id']]) {
                finalquestions[question['id']]['answers'].push({
                    text: question.text,
                    value: question.value,
                });
            } else {
                finalquestions[question['id']] = {
                    text: this.urldecode(question.question),
                    answers: [{ text: question.text, value: question.value }],
                };
            }
        });

        return Object.entries(finalquestions).map(
            ([key, value]) =>
                new Question(
                    parseInt(key),
                    value['text'],
                    value['answers'].map((answer) => ({
                        text: this.urldecode(answer['text']),
                        correct: answer['value'],
                    }))
                )
        );
    }

    private urldecode(encodedString: string): string {
        return this.cleanHtmlString(
            decodeURIComponent(encodedString.replace(/\+/g, ' '))
        );
    }

    private cleanHtmlString(htmlString: string): string {
        // Eliminar etiquetas HTML
        const strippedHtml = htmlString.replace(/(<([^>]+)>)/gi, '');

        // Eliminar caracteres de escape HTML
        const unescapedString = strippedHtml.replace(
            /&([^;]+);/gi,
            (match, entity) => {
                const entityMap = {
                    amp: '&',
                    lt: '<',
                    gt: '>',
                    quot: '"',
                    '#039': "'",
                    nbsp: ' ',
                } as any;

                if (entity in entityMap) {
                    return entityMap[entity];
                }

                return match;
            }
        );

        // Eliminar caracteres de escape de secuencia de escape
        const finalString = unescapedString.replace(/\\/gi, '');

        return finalString;
    }
}
