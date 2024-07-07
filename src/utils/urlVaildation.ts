/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-escape */
const URL_VAILDATION = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

export const urlVaildation = (url: string): boolean => URL_VAILDATION.test(url);
