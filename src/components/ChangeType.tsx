import React, { useState } from "react";

import { Button } from "react-bootstrap";

import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        "short_answer_question"
    );

    function changeQuestionType(): void {
        questionType === "short_answer_question"
            ? setQuestionType("multiple_choice_question")
            : setQuestionType("short_answer_question");
    }

    return (
        <div>
            Change Type
            <Button onClick={changeQuestionType}>Change Type</Button>
            {questionType === "short_answer_question" && (
                <div>Short Answer</div>
            )}
            {questionType === "multiple_choice_question" && (
                <div>Multiple Choice</div>
            )}
        </div>
    );
}
