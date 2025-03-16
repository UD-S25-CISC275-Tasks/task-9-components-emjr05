import React, { useState } from "react";

import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);

    const [inProgress, setProgress] = useState<boolean>(false);

    return (
        <div>
            Start Attempt
            <Button
                onClick={() => {
                    setAttempts(attempts - 1);
                    setProgress(true);
                }}
                disabled={inProgress || attempts === 0}
            >
                Start Quiz
            </Button>
            <Button
                onClick={() => {
                    setProgress(false);
                }}
                disabled={!inProgress}
            >
                Stop Quiz
            </Button>
            <Button
                onClick={() => {
                    setAttempts(attempts + 1);
                }}
                disabled={inProgress}
            >
                Mulligan
            </Button>
            Attempts Left: {attempts}
        </div>
    );
}
