import * as yup from 'yup';

export const channelNameSchema = (t, uniqNames) => yup.object({
  name: yup.string().trim()
    .min(3, t('modals.nameLength'))
    .max(20, t('modals.nameLength'))
    .notOneOf(uniqNames, t('modals.uniqueName'))
    .required(t('required')),
});

export const loginSchema = (t) => yup.object({
  username: yup.string().trim().required(t('required')),
  password: yup.string().trim().required(t('required')),
});

export const messageSchema = () => yup.object({
  newMessage: yup.string().trim().required(),
});

export const registrationSchema = (t) => yup.object({
  username: yup.string()
    .min(3, t('authPages.usernameLength'))
    .max(20, t('authPages.usernameLength'))
    .required(t('required')),
  password: yup.string()
    .min(6, t('authPages.passwordLength'))
    .required(t('required')),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], t('authPages.passwordsMatch'))
    .required(t('required')),
});
