export const setUser = (email, isAdmin = false) => ({
    type: 'USER_SET',
    email,
    isAdmin
});

export const logoutUser = () => ({
    type: 'USER_LOGOUT'
})