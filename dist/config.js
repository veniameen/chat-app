import Validator from './modules/Validator.js';
export var SETTINGS = {
    baseURL: 'https://ya-praktikum.tech/api/v2',
    avatarDummy: '/images/default-user.png',
    wssURL: 'wss://ya-praktikum.tech/ws',
};
export var storeMap = {
    errorPageProps: 'store.errorPage',
    chatPageProps: 'store.chatPage',
    chatsList: 'store.chatsList',
    profilePageProps: 'store.profile',
    activeChatID: 'store.activeChatID',
    currentUserID: 'store.userID',
    activeChatFeed: 'store.chatPage.feed',
    activeChatToken: 'store.activeChatToken',
};
export var httpErrorCodes = {
    500: 'Мы уже фиксим',
    404: 'Не туда попали',
    400: 'Некорректный запрос',
    default: 'Что-то пошло не так',
};
export var profileValidationRules = {
    email: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.EMAIL,
    ],
    login: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.LOGIN,
        Validator.CHECKS.ALPHANUMERIC,
        Validator.CHECKS.LENGTH(3, 20),
    ],
    first_name: [
        Validator.CHECKS.FIRSTLETTER,
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.ALPHABETIC,
        Validator.CHECKS.LENGTH(3, 28),
    ],
    second_name: [
        Validator.CHECKS.FIRSTLETTER,
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.ALPHABETIC,
        Validator.CHECKS.LENGTH(3, 28),
    ],
    phone: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.PHONE,
    ],
    password: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.PASSWORD_STRENGTH,
        Validator.CHECKS.LENGTH(8, 40),
    ],
    verify_password: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.PASSWORD_STRENGTH,
    ],
};
export var loginValidationRules = {
    login: [
        Validator.CHECKS.ALPHANUMERIC,
        Validator.CHECKS.LENGTH(3, 20),
    ],
    password: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.LENGTH(8, 40),
    ],
};
export var passwordValidationRules = {
    oldPassword: [
        Validator.CHECKS.REQUIRED,
    ],
    newPassword: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.PASSWORD_STRENGTH,
        Validator.CHECKS.LENGTH(8, 40),
    ],
};
export var chatNameValidationRules = {
    title: [
        Validator.CHECKS.REQUIRED,
        Validator.CHECKS.ALPHANUMERIC,
        Validator.CHECKS.LENGTH(0, 25),
    ],
};
export var chatIDValidationRules = {
    chatId: [
        Validator.CHECKS.REQUIRED,
    ],
};
