export const setUser = (email, isAdmin, userId) => ({
    type: 'USER_SET',
    email,
    isAdmin,
    userId,
});

export const logoutUser = () => ({
    type: 'USER_LOGOUT'
})