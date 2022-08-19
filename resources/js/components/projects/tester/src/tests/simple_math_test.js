export default {
    id: 1,
    title: 'Простой математический тест',
    description: 'simple math',
    time: 90,
    questions: [
        {
            id: 1,
            question: '2 + 2 = ?',
            answers: [
                {
                    id: 1,
                    value: '3',
                    answer: false,
                },
                {
                    id: 2,
                    value: '4',
                    answer: true,
                },
                {
                    id: 3,
                    value: '5',
                    answer: false,
                },
                {
                    id: 4,
                    value: '6',
                    answer: false,
                },
            ],
        },
        {
            id: 2,
            question: '5 * 3 = ?',
            answers: [
                {
                    id: 1,
                    value: '10',
                    answer: false,
                },
                {
                    id: 2,
                    value: '15',
                    answer: true,
                },
                {
                    id: 3,
                    value: '9',
                    answer: false,
                },
                {
                    id: 4,
                    value: '13',
                    answer: false,
                },
            ],
        },
        {
            id: 3,
            question: '20 / 2 = ?',
            answers: [
                {
                    id: 1,
                    value: '2',
                    answer: false,
                },
                {
                    id: 2,
                    value: '10',
                    answer: true,
                },
                {
                    id: 3,
                    value: '1',
                    answer: false,
                },
                {
                    id: 4,
                    value: '0',
                    answer: false,
                },
            ],
        }
    ],
}
