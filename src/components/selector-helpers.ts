import { toast } from 'sonner';

export const randomNumber = (max: number, min?: number) => Math.floor(Math.random() * max) + (min ? min : 1);

export const createArrayOfRandomBooleans = (length: number, limit: number) => {
    const array = Array.from({ length: length }).map(() => false);
    const indexesToChange = Array.from({
        length: randomNumber(limit),
    }).map(() => randomNumber(length - 1));
    indexesToChange.forEach((index) => (array[index] = true));
    return array;
};

export const setToggle = (
    switchedToggleIndex: number,
    numberOfSelectors: number,
    values: boolean[],
    setValues: (value: React.SetStateAction<boolean[]>) => void,
) => {
    const numberOfTrue = values.filter((value) => value === true).length;

    const indexThatCanBeChanged: number[] = values
        .map((value, index: number) => {
            return { value, index };
        })
        .filter((item) => numberOfTrue >= numberOfSelectors / 2 || item.value === false)
        .filter((item) => item.index !== switchedToggleIndex) // Filtre supplémentaire si nécessaire
        .map((item) => item.index);

    // Determine how many indexes are to change
    const indexesLength = randomNumber(3);

    // Change randomly values
    if (indexThatCanBeChanged.length > indexesLength) {
        while (indexThatCanBeChanged.length !== indexesLength || indexesLength > indexThatCanBeChanged.length) {
            const arrayIndexToSplice = randomNumber(indexThatCanBeChanged.length);
            indexThatCanBeChanged.splice(arrayIndexToSplice, 1);
        }
    }

    // set new values
    setValues((previousValues) => {
        const newValuesArray = [...previousValues];
        indexThatCanBeChanged.forEach((index) => (newValuesArray[index] = !newValuesArray[index]));
        newValuesArray[switchedToggleIndex] = !newValuesArray[switchedToggleIndex];
        return newValuesArray;
    });

    const checkIfHalfValuesAreResolved = values.filter((value) => value === false).length >= numberOfSelectors / 2;

    if (checkIfHalfValuesAreResolved) {
        const chancesToTroll = randomNumber(100);
        if (chancesToTroll > 75) {
            const toasterPosition = (
                ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'] as const
            )[chancesToTroll % 6];

            const chanceToMessage = randomNumber(500) === 5;

            const secretMessage = process.env.GIVEAWAY_SECRET;
            toast.success(chanceToMessage ? secretMessage : 'TROLLED', { duration: 500, position: toasterPosition });

            setValues((previousValues) => {
                const newValuesArray = previousValues.map((value, index) => {
                    if (index === switchedToggleIndex) {
                        return value;
                    } else {
                        if (value) {
                            return value;
                        } else {
                            return !value;
                        }
                    }
                });
                return newValuesArray;
            });
        }
    }
};
