import React, { useState } from "react";
<<<<<<< HEAD

import { Button } from "react-bootstrap";


export type Holiday = "Valentine's" |"Cinco de Mayo" |"Halloween" | "Thanksgiving" | "Christmas" 

//"🎃" | "🦃" ♥️ 🎄🪅


const holidayEmojis: Record<Holiday, string> = {

    Christmas: "🎄",

    Halloween: "🎃",

    "Cinco de Mayo": "🪅",

    Thanksgiving: "🦃",

    "Valentine's": "❤️"

};


const alphaHoliday: Record<Holiday, Holiday> = {

    "Cinco de Mayo": "Christmas",

    Christmas: "Halloween",

    Halloween: "Thanksgiving",

    Thanksgiving: "Valentine's",

    "Valentine's": "Cinco de Mayo"

};


const dateHoliday: Record<Holiday, Holiday> = {

    "Valentine's": "Cinco de Mayo",

    "Cinco de Mayo" : "Thanksgiving",

    Thanksgiving: "Halloween",

    Halloween: "Christmas",

    Christmas: "Valentine's"

};


export function CycleHoliday(): React.JSX.Element {

    const [holiday, setHoliday] = useState<Holiday>("Valentine's")



    return <div>Cycle Holiday

        

        <p>Holiday: {holidayEmojis[holiday]}</p>

        <Button onClick={() => {setHoliday(alphaHoliday[holiday])}}>

                Advance by Alphabet

            </Button>

            <Button onClick={() => {setHoliday(dateHoliday[holiday])}}>

                Advance by Year

            </Button>

    </div>;

=======
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    return <div>Cycle Holiday</div>;
>>>>>>> origin/task-components
}
