export default {
    /* New Task */
    new_task: {
        id: null,
        favorite: null,
        message: null,
        create_date: null,
        to_date: {
            day: null,
            month: null,
            year: null,
        },
        to_time: {
            hour:  null,
            minute: null,
        },
        user_category: {
            id: null,
            name: null,
        },

        flow_task: false,
        complete: false,
        time_off: false,
    },

    alert_remove: null,

    /* navigation */

    searchStr: null,
    category: null,
    categories: [
        {
            id: 1,
            name: 'Все',
            icon_fontAwesome: "fas fa-infinity",
        },
        {
            id: 2,
            name: 'Сегодня',
            icon_fontAwesome: "fas fa-sun",
        },
        {
            id: 3,
            name: 'Важные',
            icon_fontAwesome: "fas fa-star",
        },
        {
            id: 4,
            name: 'Завершённые',
            icon_fontAwesome: "fas fa-check-circle",
        },
        {
            id: 5,
            name: 'Просроченные',
            icon_fontAwesome: "fa-solid fa-circle-xmark",
        },
    ],

    user_categories: [],
    new_category: {
        id: null,
        name: null,
    },

    /* task list */
    today: null,
    render_tasks: [],

    /* Auth */
    user: null,
    user_err: null,
    valid_login: true,
    valid_pin: true,
    validate_auth: true,
}
