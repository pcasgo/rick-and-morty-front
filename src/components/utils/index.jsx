  
const TOKEN_KEY = 'jwt';

export const login = (prueba) => {
    console.log('login: ', prueba);
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}