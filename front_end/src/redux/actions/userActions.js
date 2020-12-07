export const setUser = (email, isAdmin = false, userId) => ({
    type: 'USER_SET',
    email,
    isAdmin,
    userId,
});

export const logoutUser = () => ({
    type: 'USER_LOGOUT'
})