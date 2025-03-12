import React, { useState } from "react";

import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [visble, setVisibility] = useState<boolean>(false);

    function showAnswer(): void {
        visble ? setVisibility(false) : setVisibility(true);
    }

    return (
        <div>
            Reveal Answer
            <Button onClick={showAnswer}>Reveal Answer</Button>
            {visble && <div>42</div>}
        </div>
    );
}
