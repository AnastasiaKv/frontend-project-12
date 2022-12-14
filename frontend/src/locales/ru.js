export default {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    brand: 'Hexlet Chat',
    logout: 'Выйти',
    required: 'Обязательное поле',
    authPages: {
      login: 'Войти',
      signup: 'Зарегистрироваться',
      registration: 'Регистрация',
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirm: 'Подтвердите пароль',
      usernameLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      passwordsMatch: 'Пароли должны совпадать',
      authFaild: 'Неверные имя пользователя или пароль',
      noAccount: 'Нет аккаунта? ',
      existedUser: 'Такой пользователь уже существует',
    },
    chatPage: {
      send: 'Отправить',
      channels: 'Каналы',
      newMessage: 'Новое сообщение',
      enterMessage: 'Введите сообщение...',
      rename: 'Переименовать',
      remove: 'Удалить',
      control: 'Управление каналом',
      messagesCounter: {
        messagesCount_zero: '{{count}} сообщений',
        messagesCount_one: '{{count}} сообщение',
        messagesCount_few: '{{count}} сообщения',
        messagesCount_many: '{{count}} сообщений',
      },
    },
    modals: {
      remove: 'Удалить',
      cancel: 'Отменить',
      submit: 'Отправить',
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      channelName: 'Имя канала',
      nameLength: 'От 3 до 20 символов',
      uniqueName: 'Должно быть уникальным',
      areYouSure: 'Уверены?',
    },
    notifications: {
      channelRemoved: 'Канал удалён',
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
    },
    errors: {
      network: 'Ошибка соединения',
      unknown: 'Неизвестная ошибка',
      unauthorized: 'Ошибка авторизации',
    },
    notFoundPage: {
      title: 'Страница не найдена',
      message: 'Но вы можете перейти ',
      homeLink: 'на главную страницу',
    },
  },
};
