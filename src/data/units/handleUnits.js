
export const addUnitExplanation = (units) => {
    if (units) {
        const unitsCopy = [...units];
        unitsCopy.map(unit => {
            switch (unit.id) {
                case "9b6724b8-54fb-48f8-912f-2ed2bfec24bd":
                    unit.explanation = "Värme";
                    break;
                case "02aa4a27-6483-406e-97d1-bc8ece5b8a21":
                    unit.explanation = "Ljudnivå";
                    break;
                case "60b07505-9871-44ee-b538-bdbec615eb29":
                    unit.explanation = "Värme";
                    break;
                case "fb190a37-5acc-4bc3-b66b-d57be8998ad8":
                    unit.explanation = "Varv per minut";
                    break;
                case "d1e41451-783f-432f-b200-da6d335745ee":
                    unit.explanation = "Luftfuktighet"
                    break;
            }
        })
        return unitsCopy;
    }
}