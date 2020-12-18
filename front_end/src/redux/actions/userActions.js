export const setUser = (email, isAdmin, userId, isLoggedIn) => ({
    type: 'USER_SET',
    email,
    isAdmin,
    userId,
    isLoggedIn
});

export const logoutUser = () => ({
    type: 'USER_LOGOUT'
})