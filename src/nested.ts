import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((question: Question) => question.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let copiedQuestions: Question[] = questions.map((question) => ({
        ...question,
        options: [...question.options]
    }));

    return copiedQuestions.filter(
        (question: Question) =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length !== 0
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    let found = questions.find((question: Question) => question.id === id);
    if (!found) {
        return null;
    }
    return found;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let index: number = questions.findIndex(
        (questions: Question) => questions.id === id
    );
    let removedQuestion: Question[] = [...questions];
    removedQuestion.splice(index, 1);
    return removedQuestion;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question): string => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const pointsArr: number[] = questions.map(
        (question: Question): number => question.points
    );
    return pointsArr.reduce(
        (currTotal: number, points: number) => currTotal + points
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const pointsArr: number[] = questions.map((question: Question) =>
        question.published ? question.points : 0
    );
    return pointsArr.reduce(
        (currTotal: number, points: number) => currTotal + points
    );
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const header: string = "id,name,options,points,published\n";
    let questionFieldValue: string[] = questions.map(
        (question: Question): string =>
            String(question.id) +
            "," +
            String(question.name) +
            "," +
            String(question.options.length) +
            "," +
            String(question.points) +
            "," +
            String(question.published)
    );
    return header + questionFieldValue.join("\n");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false
    }));
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question) => ({ ...question, published: true }));
}
/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (!questions.length) {
        return true;
    }
    return questions.every(
        (question: Question) => question.type === questions[0].type
    );
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const index: number = questions.findIndex(
        (question: Question) => question.id === targetId
    );
    let copiedQuestions: Question[] = questions.map((question) => ({
        ...question,
        options: [...question.options]
    }));
    copiedQuestions[index].name = newName;
    return copiedQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const index: number = questions.findIndex(
        (question: Question) => question.id === targetId
    );
    let copiedQuestions: Question[] = questions.map((question) => ({
        ...question,
        options: [...question.options]
    }));
    copiedQuestions[index].type = newQuestionType;
    if (copiedQuestions[index].type !== "multiple_choice_question") {
        copiedQuestions[index].options = [];
    }
    return copiedQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    const questionIndex: number = questions.findIndex(
        (question: Question) => question.id === targetId
    );
    let copiedQuestions: Question[] = questions.map((question) => ({
        ...question,
        options: [...question.options]
    }));

    targetOptionIndex === -1
        ? (copiedQuestions[questionIndex].options = [
              ...copiedQuestions[questionIndex].options,
              newOption
          ])
        : (copiedQuestions[questionIndex].options[targetOptionIndex] =
              newOption);
    return copiedQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const index: number = questions.findIndex(
        (question: Question) => question.id === targetId
    );
    let copiedQuestions: Question[] = questions.map((question) => ({
        ...question,
        options: [...question.options]
    }));
    const duplicatedQuestion = duplicateQuestion(newId, copiedQuestions[index]);
    copiedQuestions.splice(index + 1, 0, duplicatedQuestion);
    return copiedQuestions;
}
